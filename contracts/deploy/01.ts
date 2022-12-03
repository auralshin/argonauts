import { Signer } from "ethers";
import { ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { ProofofReserve, ProofofReserve__factory } from "../typechain";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    let accounts: Signer[];
    let contractInstance: ProofofReserve;

    accounts = await hre.ethers.getSigners();

    console.log(await accounts[0].getAddress());

    const tokenFactory = (await hre.ethers.getContractFactory(
        "ProofofReserve",
        accounts[0]
    )) as ProofofReserve__factory;

    const [startBlock, endBlock] = [1000, 1100];

    const auditors = ["0x58d1D3400cD08E22983cbC2C0AE9AaE13cc5efef"];
    const cwas = ["0x58d1D3400cD08E22983cbC2C0AE9AaE13cc5efef"];

    contractInstance = await tokenFactory.deploy(
        ethers.Wallet.createRandom().address,
        startBlock,
        endBlock,
        auditors,
        cwas
    );

    await contractInstance.deployed();
    console.log(
        `The address the Contract WILL have once mined: ${contractInstance.address}`
    );
};
export default func;
func.id = "nft_token_deploy";
func.tags = ["local"];
