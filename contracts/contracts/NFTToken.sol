// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "hardhat/console.sol";

contract POT {
    uint32 public currentEpoch;

    address[] public coldWalletAddresses;
    address[] public auditors; // make mapping and add array in event

    // epoch => auditor => (encrypted) nonce
    mapping(uint32 => mapping(address => uint256)) auditorNonces;
    // epoch => auditor => exchange => (encrypted) nonce
    mapping(uint32 => mapping(address => uint256)) auditorToNonces;

    // epoch =>
    mapping(uint32 => mapping(address => uint256)) autoNonces;
}
