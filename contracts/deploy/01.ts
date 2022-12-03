import { Signer } from "ethers";
import { ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import {
    ProofofReserve,
    ProofofReserve__factory,
    USDC,
    USDC__factory,
} from "../typechain";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    let accounts: Signer[];
    let contractInstance: ProofofReserve;
    let usdcInstance: USDC;

    accounts = await hre.ethers.getSigners();

    console.log(await accounts[0].getAddress());

    const protocolFactory = (await hre.ethers.getContractFactory(
        "ProofofReserve",
        accounts[0]
    )) as ProofofReserve__factory;
    const tokenFactory = (await hre.ethers.getContractFactory(
        "USDC",
        accounts[0]
    )) as USDC__factory;

    const [startBlock, endBlock] = [1000, 1100];

    const auditors = ["0x58d1D3400cD08E22983cbC2C0AE9AaE13cc5efef"];
    const cwas = ["0x58d1D3400cD08E22983cbC2C0AE9AaE13cc5efef"];

    usdcInstance = await tokenFactory.deploy();

    contractInstance = await protocolFactory.deploy(
        usdcInstance.address,
        startBlock,
        endBlock,
        auditors,
        cwas
    );

    await contractInstance.deployed();
    await usdcInstance.deployed();
    console.log(
        `ProofOfReserve: ${contractInstance.address}\nUSDCInstance:${usdcInstance.address}`
    );

    // @dev testing env: funding auditor and cwas
    await Promise.all(
        [...auditors, ...cwas].map((to) =>
            accounts[0].sendTransaction({
                to,
                value: ethers.utils.parseEther("1"),
            })
        )
    );
    await Promise.all(
        [...cwas].map((who) =>
            usdcInstance.faucet(who, ethers.utils.parseEther("10"))
        )
    );
};
export default func;
func.id = "nft_token_deploy";
func.tags = ["local"];
