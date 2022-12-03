// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "./ProofOfReserve.sol";

contract ProofofTrust {
    ProofofReserve public immutable POR_DEPLOYMENT;
    address public immutable POL_DEPLOYMENT;

    constructor(
        address balanceToken,
        uint256 proposedEpochNumber,
        address[] memory auditors,
        address[] memory cwas
    ) {
        POR_DEPLOYMENT = new ProofofReserve(
            balanceToken,
            proposedEpochNumber,
            auditors,
            cwas
        );
        POL_DEPLOYMENT = address(0);
    }

    error PoRNotCompleteYet(uint256 currentEpoch);

    function getTotalReserves(uint256 _epoch) external view returns (uint256) {
        if (
            POR_DEPLOYMENT.stateCount(_epoch) <
            3 * POR_DEPLOYMENT.numberOfAuditorsAndCWAs()
        ) revert PoRNotCompleteYet(_epoch);

        return POR_DEPLOYMENT.totalReserve(_epoch);
    }
}
