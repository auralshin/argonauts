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

    console.log("before", (await ethers.provider.getBlock("latest")).number);
    await mineNBlocks(100);
    console.log("after", (await ethers.provider.getBlock("latest")).number);

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
    await usdcInstance.deployed();

    await Promise.all(
        [...cwas].map((who) =>
            usdcInstance.faucet(who, ethers.utils.parseEther("10"))
        )
    );

    await mineNBlocks(30);

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
            usdcInstance.faucet(
                who,
                ethers.utils.parseEther(
                    Math.floor(Math.random() * 7879).toString()
                )
            )
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
    console.log("currentEpoch", currentEpoch.toString());
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

    for (const auditor of auditors) {
        const sigs = await contractInstance.getSignauresForAuditor(
            currentEpoch,
            auditor
        );
        console.log({ sigs });

        const challenge = await contractInstance.getAuditorChallenge(
            auditor,
            currentEpoch
        );
        // verify sigs

        let totalBalance = ethers.BigNumber.from(0);
        for (const sig of sigs) {
            const signerAddress = ethers.utils.verifyMessage(
                "i own this acc" + challenge.toString(),
                sig
            );
            const sigVerified = signerAddress === cwas[sigs.indexOf(sig)];
            console.log("sig verified?", sigVerified);
            const currentBalance = await usdcInstance.balanceOf(
                cwas[sigs.indexOf(sig)],
                {
                    blockTag: currentEpoch.toNumber(),
                }
            );
            console.log("currentBalance", currentBalance.toString());
            totalBalance = totalBalance.add(currentBalance);
        }
        console.log(auditor, "totalBalance", totalBalance.toString());
        await contractInstance
            .connect(ethers.provider.getSigner(auditor))
            .submitTotalBalance(totalBalance);
    }
};

async function mineNBlocks(n: number) {
    for (let index = 0; index < n; index++) {
        await ethers.provider.send("evm_mine", []);
    }
}

function getBalancesAtCheckpoint(
    blockNumber: string,
    addresses: string[],
    usdcInstance: USDC
) {
    return Promise.all(
        addresses.map((address) =>
            usdcInstance.balanceOf(address, { blockTag: blockNumber })
        )
    );
}
export default func;
func.id = "nft_token_deploy";
func.tags = ["local"];
