// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract ProofOfLiability is AccessControl {
    bytes32 public constant EXCHANGE_ADMIN = keccak256("EXCHANGE_ADMIN");

    uint8 public constant UNVERIFIED_STATE = 0;
    uint8 public constant VERIFIED_STATE = 1;
    uint8 public constant BALANCE_DISPUTED_STATE = 2;

    mapping(string => bytes32) public saltMaps;
    mapping(string => bool) leafValidated;
    mapping(string => uint8) leafStateMaps;

    bool public isContractInitialized;

    uint256 public leafSaltMapsLoadedCount;

    string public merkleTreeCid;

    uint256 public totalFundLiabilities;
    uint256 public totalLeafNodes;

    uint256 public totalFundsToBeValidated;
    uint256 public totalLeafNodesToBeValidated;

    uint256 public fundsValidated;
    uint256 public leafNodeValidatedCount;
    uint256 public leafNodeDisputedCount;
    uint256 public leafNodeStateChangedCount;

    bool public openToValidation;
    bool public proofOfLiabilityFinalized;

    struct UserSalts {
        string hashValue;
        bytes32 saltValue;
    }

    event LeafStateUpdated(string hash, uint8 stateUpdatedTo);

    constructor(address[] memory exchangeAdmins) public {
        isContractInitialized = false;

        for (uint256 i = 0; i < exchangeAdmins.length; i++) {
            _grantRole(EXCHANGE_ADMIN, exchangeAdmins[i]);
        }
    }

    function initialize(
        uint256 _totalFundLiabilities,
        uint256 _totalLeafNodes,
        uint256 _totalFundsToBeValidated,
        uint256 _totalLeafNodesToBeValidated,
        string memory _merkleTreeCid
    ) public onlyRole(EXCHANGE_ADMIN) {
        require(!isContractInitialized, "Already initialized.");
        require(
            _totalFundsToBeValidated <= _totalFundLiabilities,
            "Validation requirements cannot be greater than total liabilities"
        );
        require(
            _totalLeafNodesToBeValidated <= _totalLeafNodes,
            "Validation requirements cannot be greater than total liabilities"
        );

        totalFundLiabilities = _totalFundLiabilities;
        totalFundsToBeValidated = _totalFundsToBeValidated;
        totalLeafNodes = _totalLeafNodes;
        totalLeafNodesToBeValidated = _totalLeafNodesToBeValidated;

        merkleTreeCid = _merkleTreeCid;
        isContractInitialized = true;
    }

    function loadSaltMaps(UserSalts[] memory userSalts)
        public
        onlyRole(EXCHANGE_ADMIN)
    {
        require(
            leafSaltMapsLoadedCount + userSalts.length <= totalLeafNodes,
            "Defined number of leaf nodes already created."
        );

        for (uint256 i = 0; i < userSalts.length; i++) {
            require(
                isNotAlreadyCreated(userSalts[i].hashValue),
                "Already exists."
            );
        }

        for (uint256 i = 0; i < userSalts.length; i++) {
            saltMaps[userSalts[i].hashValue] = userSalts[i].saltValue;
            leafSaltMapsLoadedCount++;
        }

        if (leafSaltMapsLoadedCount == totalLeafNodes) {
            openToValidation = true;
        }
    }

    // function beginLeafValidation() public onlyRole(EXCHANGE_ADMIN) {
    //     require(
    //         leafSaltMapsLoadedCount == totalLeafNodes,
    //         "Defined number of leaf nodes not yet created."
    //     );

    //     openToValidation = true;
    // }

    function updateUserLeafStates(
        string memory salt,
        string memory hash,
        uint256 userBalance,
        uint8 stateEnum
    ) public {
        require(
            !proofOfLiabilityFinalized,
            "Proof of Liabilities is already finalized."
        );

        require(openToValidation, "Currently not open to leaf validations.");

        require(isValidEnum(stateEnum), "Invalid stateEnum is being passed.");

        require(isUser(hash, salt), "Could not validate the user");

        require(
            isLeafYetToBeValidated(hash),
            "Leaf node has already been validated."
        );

        leafValidated[hash] = true;
        leafStateMaps[hash] = stateEnum;
        leafNodeStateChangedCount++;
        if (stateEnum == VERIFIED_STATE) {
            leafNodeValidatedCount++;
            fundsValidated += userBalance;
        } else {
            leafNodeDisputedCount++;
        }
    }

    function getIpfsMerkleTreeCid() public view returns (string memory) {
        return merkleTreeCid;
    }

    function getFundsValidationState()
        public
        view
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        return (fundsValidated, totalFundsToBeValidated, totalFundLiabilities);
    }

    function getLeafValidationState()
        public
        view
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        return (
            leafNodeValidatedCount,
            totalLeafNodesToBeValidated,
            totalLeafNodes
        );
    }

    function getLeafStateChangesData()
        public
        view
        returns (
            uint256,
            uint256,
            uint256
        )
    {
        return (
            leafNodeValidatedCount,
            leafNodeDisputedCount,
            leafNodeStateChangedCount
        );
    }

    function getProofOfLiabilityFinalized() public view returns (bool) {
        return proofOfLiabilityFinalized;
    }

    function finalizeProofOfLiabilities() public onlyRole(EXCHANGE_ADMIN) {
        require(
            !proofOfLiabilityFinalized,
            "Proof of Liabilities is already finalized."
        );

        require(
            isPoLReadyForFinalization(),
            "Insufficient funds and leaf nodes validated."
        );

        proofOfLiabilityFinalized = true;
    }

    function getFinalizedLiabilities() public view returns (uint256) {
        if (proofOfLiabilityFinalized) {
            return totalFundLiabilities;
        } else {
            return type(uint256).max;
        }
    }

    function isUser(string memory hash, string memory salt)
        internal
        view
        returns (bool valid)
    {
        bytes32 hashOfSalt = keccak256(abi.encodePacked(salt));
        if (saltMaps[hash] == hashOfSalt) {
            return true;
        } else {
            return false;
        }
    }

    function isLeafYetToBeValidated(string memory hash)
        internal
        view
        returns (bool)
    {
        return !leafValidated[hash];
    }

    function isValidEnum(uint8 enumVal) internal pure returns (bool validEnum) {
        if (enumVal == VERIFIED_STATE || enumVal == BALANCE_DISPUTED_STATE) {
            return true;
        } else {
            return false;
        }
    }

    function isPoLReadyForFinalization() internal view returns (bool) {
        if (
            fundsValidated >= totalFundsToBeValidated ||
            leafNodeValidatedCount >= totalLeafNodesToBeValidated
        ) {
            return true;
        } else {
            return false;
        }
    }

    function isNotAlreadyCreated(string memory hash)
        internal
        view
        returns (bool)
    {
        if (saltMaps[hash] == bytes32(0)) {
            return true;
        } else {
            return false;
        }
    }
}
