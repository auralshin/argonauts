// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract ProofOfLiability is AccessControl {
    bytes32 public constant EXCHANGE_ADMIN = keccak256("EXCHANGE_ADMIN");

    uint8 public constant UNVERIFIED_STATE = 0;
    uint8 public constant VERIFIED_STATE = 1;
    uint8 public constant BALANCE_DISPUTED_STATE = 2;

    mapping(string => bytes32) saltMaps;
    mapping(string => bool) leafValidated;
    mapping(string => uint8) leafStateMaps;

    uint256 public leafSaltMapsLoadedCount;

    string public merkleTreeCid;

    uint256 public totalFundLiabilities;
    uint256 public totalLeafNodes;

    uint256 public totalFundsToBeValidated;
    uint256 public totalLeafNodesToBeValidated;

    uint256 public fundsValidated;
    uint256 public leafNodeValidatedCount;

    bool public openToValidation;
    bool public proofOfLiabilityFinalized;

    struct UserSalts {
        string hashValue;
        bytes32 saltValue;
    }

    event LeafStateUpdated(string hash, uint8 stateUpdatedTo);

    constructor(
        address exchangeAdmin,
        uint256 _totalFundLiabilities,
        uint256 _totalLeafNodes,
        uint256 _totalFundsToBeValidated,
        uint256 _totalLeafNodesToBeValidated
    ) public {
        totalFundLiabilities = _totalFundLiabilities;
        totalFundsToBeValidated = _totalFundsToBeValidated;
        totalLeafNodes = _totalLeafNodes;
        totalLeafNodesToBeValidated = _totalLeafNodesToBeValidated;
        _grantRole(EXCHANGE_ADMIN, exchangeAdmin);
    }

    function loadSaltMaps(UserSalts[] memory userSalts)
        public
        onlyRole(EXCHANGE_ADMIN)
    {
        require(
            leafSaltMapsLoadedCount < totalLeafNodes,
            "Defined number of leaf nodes already created."
        );
        for (uint256 i = 0; i < userSalts.length; i++) {
            saltMaps[userSalts[i].hashValue] = userSalts[i].saltValue;
        }
    }

    function beginLeafValidation() public onlyRole(EXCHANGE_ADMIN) {
        require(
            leafSaltMapsLoadedCount == totalLeafNodes,
            "Defined number of leaf nodes not yet created."
        );

        openToValidation = true;
    }

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
        leafNodeValidatedCount++;
        fundsValidated += userBalance;
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
}
