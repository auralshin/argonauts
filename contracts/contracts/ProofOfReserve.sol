// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ProofofReserve {
    error InvalidAuditor();
    error InvalidCWA();
    error InvalidNonce();
    error ArrayLengthMismatch();
    error InvalidState(State currentState, State stateRequiredForThisMethod);

    uint256 public currentEpoch;
    uint256 public immutable numberOfAuditorsAndCWAs;
    IERC20 public immutable balanceToken;

    mapping(address => bool) public cwas;
    address[] public cwasArray;
    mapping(address => bool) public auditors;
    address[] public auditorsArray;

    // epoch => cwa => balance
    mapping(uint256 => mapping(address => uint256)) public cwaBalances;

    enum State {
        NONCE_COLLECTION, // by auditor
        SIGNATURE_SUMISSION, // by cwa
        SIGNATURE_VERIFICATION, // by auditor
        EPOCH_VERIFIED
    }

    function getState(uint256 epoch) public view returns (State) {
        uint256 count = stateCount[epoch];
        if (count >= 3 * numberOfAuditorsAndCWAs) return State.EPOCH_VERIFIED;
        if (count >= 2 * numberOfAuditorsAndCWAs)
            return State.SIGNATURE_VERIFICATION;
        if (count >= numberOfAuditorsAndCWAs) return State.SIGNATURE_SUMISSION;
        return State.NONCE_COLLECTION;
    }

    constructor(
        address _balanceToken,
        address[] memory _auditors,
        address[] memory _cwas
    ) {
        currentEpoch = block.number;
        balanceToken = IERC20(_balanceToken);
        uint256 len = _auditors.length;
        if (len != _cwas.length) revert ArrayLengthMismatch();

        for (uint256 i; i < len; ) {
            auditors[_auditors[i]] = true;
            address cwa = _cwas[i];
            cwas[cwa] = true;
            cwaBalances[currentEpoch][cwa] = balanceToken.balanceOf(cwa);
            unchecked {
                ++i;
            }
        }

        auditorsArray = _auditors;
        cwasArray = _cwas;

        numberOfAuditorsAndCWAs = len;
    }

    mapping(uint256 => bool) public nonceUsed;

    // epoch => currentStateCount
    mapping(uint256 => uint256) public stateCount;

    // epoch => auditor => nonce
    mapping(uint256 => mapping(address => uint256)) public auditorNonces;

    // epoch => cwa => signatures
    mapping(uint256 => mapping(address => bytes32[])) public cwaSignatures;

    // epoch => auditor => cwa => vote
    mapping(uint256 => mapping(address => mapping(address => bool)))
        public votes;

    modifier onlyAuditor() {
        if (!auditors[msg.sender]) revert InvalidAuditor();
        _;
    }

    modifier onlyCWA() {
        if (!cwas[msg.sender]) revert InvalidCWA();
        _;
    }

    function updateEpoch() external {
        currentEpoch = block.number;
        uint256 len = numberOfAuditorsAndCWAs;
        for (uint256 i; i < len; ) {
            cwaBalances[currentEpoch][cwasArray[i]] = balanceToken.balanceOf(
                cwasArray[i]
            );
            unchecked {
                ++i;
            }
        }
    }

    function validateNonce(uint256 _nonce) external onlyAuditor {
        if (nonceUsed[_nonce]) revert InvalidNonce();

        nonceUsed[_nonce] = true;
        auditorNonces[currentEpoch][msg.sender] = _nonce;

        stateCount[currentEpoch]++;
    }

    // only submit signatures once?
    // verify signatures?
    function submitSignature(bytes32[] calldata _sigs) external onlyCWA {
        uint256 len = _sigs.length;
        if (len != numberOfAuditorsAndCWAs) revert ArrayLengthMismatch();
        for (uint256 i; i < len; ) {
            cwaSignatures[currentEpoch][msg.sender].push(_sigs[i]);
            unchecked {
                ++i;
            }
        }

        stateCount[currentEpoch]++;
    }

    function getAuditorNonces(uint256 _epoch, address[] calldata _auditors)
        external
        view
        returns (uint256[] memory)
    {
        uint256 len = _auditors.length;
        uint256[] memory nonces = new uint256[](len);
        for (uint256 i; i < len; ) {
            if (!auditors[_auditors[i]]) revert InvalidAuditor();
            nonces[i] = auditorNonces[_epoch][_auditors[i]];
            unchecked {
                ++i;
            }
        }
        return nonces;
    }

    function getSignaures(uint256 _epoch, address[] calldata _cwas)
        external
        view
        returns (bytes32[][] memory)
    {
        uint256 len = _cwas.length;
        if (len != numberOfAuditorsAndCWAs) revert ArrayLengthMismatch();

        bytes32[][] memory sigs = new bytes32[][](len);

        for (uint256 i; i < len; ) {
            bytes32[] memory auditorSigs = new bytes32[](len);

            for (uint256 j; j < len; ) {
                auditorSigs[j] = cwaSignatures[_epoch][_cwas[i]][j];
                unchecked {
                    ++j;
                }
            }

            sigs[i] = auditorSigs;

            unchecked {
                ++i;
            }
        }

        return sigs;
    }
}
