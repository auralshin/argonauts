// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ProofofReserve {
    error InvalidAuditor();
    error InvalidCWA();
    error InvalidNonce();
    error InvalidRange();
    error ArrayLengthMismatch();
    error InvalidState(State currentState, State stateRequired);

    uint256 public currentEpoch;
    uint256 public immutable numberOfAuditorsAndCWAs;
    IERC20 public immutable balanceToken;

    mapping(address => bool) public cwas;
    address[] public cwasArray;
    mapping(address => bool) public auditors;
    address[] public auditorsArray;

    // epoch => abi.encode[startBlockNumber, endBlockNumber]
    mapping(uint256 => bytes) public epochRange;

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
        uint256 startBlockNumber,
        uint256 endBlockNumber,
        address[] memory _auditors,
        address[] memory _cwas
    ) {
        currentEpoch = 1;
        epochRange[currentEpoch] = abi.encode(startBlockNumber, endBlockNumber);
        balanceToken = IERC20(_balanceToken);
        uint256 len = _auditors.length;
        if (len != _cwas.length) revert ArrayLengthMismatch();

        auditorsArray = _auditors;
        cwasArray = _cwas;

        numberOfAuditorsAndCWAs = len;
    }

    // nonce => used
    mapping(uint256 => bool) public nonceUsed;

    // epoch => currentStateCount
    mapping(uint256 => uint256) public stateCount;

    // epoch => auditor => abi.encode(nonce, blocknumber)
    mapping(uint256 => mapping(address => bytes)) public auditorChallenge;

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
        // ! TODO
    }

    function pushChallenge(uint256 _nonce, uint256 _blockNumber)
        external
        onlyAuditor
    {
        // ! restrict state

        if (nonceUsed[_nonce]) revert InvalidNonce();

        (uint256 start, uint256 end) = abi.decode(
            epochRange[currentEpoch],
            (uint256, uint256)
        );
        if (_blockNumber < start || _blockNumber > end) revert InvalidRange();

        nonceUsed[_nonce] = true;
        auditorChallenge[currentEpoch][msg.sender] = abi.encode(
            _nonce,
            _blockNumber
        );

        stateCount[currentEpoch]++;
    }

    // only submit signatures once?
    // verify signatures?
    function submitSignature(bytes32[] calldata _sigs) external onlyCWA {
        // ! restrict state

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

    function verify(bool[] calldata _votes) external onlyAuditor {
        uint256 len = numberOfAuditorsAndCWAs;
        if (_votes.length != len) revert ArrayLengthMismatch();
        for (uint256 i; i < len; ) {
            // votes[currentEpoch][]

            unchecked {
                ++i;
            }
        }
    }

    function getAuditorChallenge(address _auditor, uint256 _epoch)
        external
        view
        returns (uint256 nonce, uint256 blockNumber)
    {
        if (!auditors[_auditor]) revert InvalidAuditor();
        (nonce, blockNumber) = abi.decode(
            auditorChallenge[_epoch][_auditor],
            (uint256, uint256)
        );
    }

    function getAuditorsChallenge(uint256 _epoch)
        external
        view
        returns (uint256[] memory nonces, uint256[] memory blocks)
    {
        uint256 len = numberOfAuditorsAndCWAs;
        nonces = new uint256[](len);
        blocks = new uint256[](len);

        for (uint256 i; i < len; ) {
            address auditor = auditorsArray[i];
            (nonces[i], blocks[i]) = abi.decode(
                auditorChallenge[_epoch][auditor],
                (uint256, uint256)
            );
            unchecked {
                ++i;
            }
        }
    }

    function getSignaures(uint256 _epoch)
        external
        view
        returns (bytes32[][] memory)
    {
        uint256 len = cwasArray.length;
        if (len != numberOfAuditorsAndCWAs) revert ArrayLengthMismatch();

        bytes32[][] memory sigs = new bytes32[][](len);

        for (uint256 i; i < len; ) {
            bytes32[] memory auditorSigs = new bytes32[](len);

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
