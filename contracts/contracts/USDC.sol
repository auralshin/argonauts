// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract USDC is ERC20("USDC", "USDC") {
    function faucet(address _who, uint256 _amt) external {
        _mint(_who, _amt);
    }
}
