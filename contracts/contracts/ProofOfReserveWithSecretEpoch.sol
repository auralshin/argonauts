// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

contract ProofOfReserveWithSecretEpoch {
    error InvalidAuditor();
    error InvalidCWA();
    error InvalidNonce();
    error InvalidRange();
    error ArrayLengthMismatch();
    error InvalidState(State currentState, State stateRequired);

    uint256 public currentEpoch;
    uint256 public immutable numberOfAuditorsAndCWAs;
    IERC20 public immutable balanceToken;

    mapping(uint256 => uint256) private epochToBlocknumber;

    mapping(address => bool) public cwas;
    address[] public cwasArray;
    mapping(address => bool) public auditors;
    address[] public auditorsArray;

    enum State {
        NONCE_COLLECTION, // by auditor
        SIGNATURE_SUMISSION, // by cwa
        SIGNATURE_VERIFICATION, // by auditor
        EPOCH_VERIFIED
    }

    function getCWAs() external view returns (address[] memory) {
        return cwasArray;
    }

    function getAuditors() external view returns (address[] memory) {
        return auditorsArray;
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
        uint256 proposedBlocknumber,
        address[] memory _auditors,
        address[] memory _cwas
    ) {
        currentEpoch = 1;
        epochToBlocknumber[currentEpoch] = proposedBlocknumber;
        balanceToken = IERC20(_balanceToken);
        uint256 len = _auditors.length;
        if (len != _cwas.length) revert ArrayLengthMismatch();

        auditorsArray = _auditors;
        cwasArray = _cwas;

        for (uint256 i; i < len; ) {
            auditors[_auditors[i]] = true;
            cwas[_cwas[i]] = true;
            unchecked {
                ++i;
            }
        }

        numberOfAuditorsAndCWAs = len;
    }

    // nonce => used
    mapping(uint256 => bool) public nonceUsed;

    // epoch => currentStateCount
    mapping(uint256 => uint256) public stateCount;

    // epoch => auditor => abi.encode(nonce)
    mapping(uint256 => mapping(address => bytes)) public auditorChallenge;

    // epoch => cwa => signature[]
    mapping(uint256 => mapping(address => bytes[])) public cwaSignatures;

    // epoch => auditor => totalBalance
    mapping(uint256 => mapping(address => uint256)) public totalBalances;

    modifier onlyAuditor() {
        if (!auditors[msg.sender]) revert InvalidAuditor();
        _;
    }

    modifier onlyCWA() {
        if (!cwas[msg.sender]) revert InvalidCWA();
        _;
    }

    function updateEpoch() external {
        // ! TODO
    }

    function pushChallenge(uint256 _nonce) external onlyAuditor {
        // ! restrict state

        if (nonceUsed[_nonce]) revert InvalidNonce();

        nonceUsed[_nonce] = true;
        auditorChallenge[currentEpoch][msg.sender] = abi.encode(_nonce);

        stateCount[currentEpoch]++;
    }

    // only submit signatures once?
    // verify signatures?
    function submitSignature(bytes[] calldata _sigs) external onlyCWA {
        // ! restrict state

        uint256 len = _sigs.length;
        if (len != numberOfAuditorsAndCWAs) revert ArrayLengthMismatch();
        for (uint256 i; i < len; ) {
            // epoch => cwa => signature[]
            cwaSignatures[currentEpoch][msg.sender].push(_sigs[i]);
            unchecked {
                ++i;
            }
        }

        stateCount[currentEpoch]++;
    }

    function submitTotalBalance(uint256 totalBalance) external onlyAuditor {
        // ! restrict state
        // epoch => auditor => totalBalance

        totalBalances[currentEpoch][msg.sender] = totalBalance;

        stateCount[currentEpoch]++;
    }

    function hasAuditorSubmittedBalance(address _auditor, uint256 _epoch)
        external
        view
        returns (bool)
    {
        return totalBalances[_epoch][_auditor] != 0;
    }

    function getTotalSubmittedBalances(uint256 _epoch)
        external
        view
        returns (uint256[] memory _balances)
    {
        uint256 len = numberOfAuditorsAndCWAs;
        _balances = new uint256[](len);

        for (uint256 i; i < len; ) {
            _balances[i] = totalBalances[_epoch][auditorsArray[i]];
        }
    }

    function getAuditorChallenge(address _auditor, uint256 _epoch)
        external
        view
        returns (uint256 nonce)
    {
        if (!auditors[_auditor]) revert InvalidAuditor();
        nonce = abi.decode(auditorChallenge[_epoch][_auditor], (uint256));
    }

    function getAuditorsChallenge(uint256 _epoch)
        external
        view
        returns (uint256[] memory nonces)
    {
        uint256 len = numberOfAuditorsAndCWAs;
        nonces = new uint256[](len);

        for (uint256 i; i < len; ) {
            address auditor = auditorsArray[i];
            (nonces[i]) = abi.decode(
                auditorChallenge[_epoch][auditor],
                (uint256)
            );
            unchecked {
                ++i;
            }
        }
    }

    function getSignauresForAuditor(uint256 _epoch, address _auditor)
        external
        view
        returns (bytes[] memory sigs)
    {
        uint256 len = numberOfAuditorsAndCWAs;

        for (uint256 i; i < len; ) {
            if (auditorsArray[i] == _auditor) {
                sigs = new bytes[](len);
                for (uint256 j; j < len; ) {
                    //epoch => cwa => signature
                    sigs[j] = (cwaSignatures[_epoch][cwasArray[j]][i]);

                    unchecked {
                        ++j;
                    }
                }
            }

            unchecked {
                ++i;
            }
        }
    }

    function getSignauresForCWA(uint256 _epoch, address _cwa)
        external
        view
        returns (bytes[] memory sigs)
    {
        uint256 len = numberOfAuditorsAndCWAs;
        sigs = new bytes[](len);
        for (uint256 i; i < len; ) {
            //epoch => cwa => signature
            sigs[i] = cwaSignatures[_epoch][_cwa][i];
            unchecked {
                ++i;
            }
        }
    }

    function getAllSignaures(uint256 _epoch)
        external
        view
        returns (bytes[][] memory)
    {
        uint256 len = cwasArray.length;

        bytes[][] memory sigs = new bytes[][](len);

        for (uint256 i; i < len; ) {
            bytes[] memory auditorSigs = new bytes[](len);

            for (uint256 j; j < len; ) {
                auditorSigs[j] = cwaSignatures[_epoch][cwasArray[i]][j];
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
