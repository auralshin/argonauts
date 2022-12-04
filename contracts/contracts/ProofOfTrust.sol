// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "./ProofOfReserve.sol";
import "./ProofOfLiability.sol";

contract ProofofTrust {
    ProofofReserve public immutable POR_DEPLOYMENT;
    ProofOfLiability public immutable POL_DEPLOYMENT;

    constructor(
        address balanceToken,
        uint256 proposedEpochNumber,
        address[] memory auditors,
        address[] memory cwas,
        address[] memory cAdmin
    ) {
        POR_DEPLOYMENT = new ProofofReserve(
            balanceToken,
            proposedEpochNumber,
            auditors,
            cwas
        );
        POL_DEPLOYMENT = new ProofOfLiability(cAdmin);
    }

    error PoRNotCompleteYet(uint256 currentEpoch);

    function getTotalReserves(uint256 _epoch) public view returns (uint256) {
        if (
            POR_DEPLOYMENT.stateCount(_epoch) <
            3 * POR_DEPLOYMENT.numberOfAuditorsAndCWAs()
        ) revert PoRNotCompleteYet(_epoch);

        return POR_DEPLOYMENT.totalReserve(_epoch);
    }

    function getTotalLiabilities() public view returns (uint256) {
        return POL_DEPLOYMENT.getFinalizedLiabilities();
    }

    function proofOfTrustStatus(uint256 _epoch) external view returns (bool) {
        if (getTotalReserves(_epoch) >= getTotalLiabilities()) {
            return true;
        } else {
            return false;
        }
    }
}
