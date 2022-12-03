import { BigNumber, Signer } from "ethers";
import { ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { keccak256, arrayify } from "ethers/lib/utils";

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
    const addresses = await Promise.all(accounts.map((s) => s.getAddress()));

    console.log(await accounts[0].getAddress());

    const protocolFactory = (await hre.ethers.getContractFactory(
        "ProofofReserve",
        accounts[0]
    )) as ProofofReserve__factory;
    const tokenFactory = (await hre.ethers.getContractFactory(
        "USDC",
        accounts[0]
    )) as USDC__factory;

    const auditors = addresses.slice(2, 4);
    const cwas = addresses.slice(4, 6);

    usdcInstance = await tokenFactory.deploy();

    contractInstance = await protocolFactory.deploy(
        usdcInstance.address,
        (
            await ethers.provider.getBlock("latest")
        ).number,
        auditors,
        cwas
    );

    console.log(auditors, cwas);

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

    console.log("cwa array", await contractInstance.numberOfAuditorsAndCWAs());

    // fill challenges
    await Promise.all(
        auditors.map((auditor) =>
            contractInstance
                .connect(ethers.provider.getSigner(auditor))
                .pushChallenge(
                    ethers.BigNumber.from(ethers.utils.randomBytes(32))
                )
        )
    );

    const currentEpoch = await contractInstance.currentEpoch();
    // fill signatures
    for (const cwa of cwas) {
        const challengesForCWA = await contractInstance.getAuditorsChallenge(
            currentEpoch
        );
        const signed = await Promise.all(
            challengesForCWA.map((challenge) =>
                ethers.provider
                    .getSigner(cwa)
                    .signMessage("i own this acc" + challenge.toString())
            )
        );
        console.log(signed);
        await contractInstance
            .connect(ethers.provider.getSigner(cwa))
            .submitSignature(signed);
    }

    // for (const auditor of auditors) {

    // }
};
export default func;
func.id = "nft_token_deploy";
func.tags = ["local"];
