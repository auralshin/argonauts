import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useContractRead } from "wagmi";
import ABI from "../../constants/POR.json";
import { CONTRACT_ADDRESS } from "../../constants/config";
import { useGlobalContext } from "../../context";
import { BigNumber } from "ethers";
import useEpoch from "../../hooks/useEpoch";
function Header() {
  const { currentEpoch } = useEpoch();
  // current Epoch and current Stage
 
  const stageMap = [
    "NONCE_COLLECTION", // by auditor
    "SIGNATURE_SUMISSION", // by cwa
    "SIGNATURE_VERIFICATION", // by auditor
    "EPOCH_VERIFIED",
  ];

  const getStage = (stage = '0') => {
    return stageMap[parseInt(stage)] || "UNKNOWN";
  }

  const currentStage = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "getState",
    args: [currentEpoch.data],
    staleTime: 400_000,
    onSuccess(data) {
      console.log('Success', data)
    },
  });

  return (
    <div className="bg-black flex justify-between items-center p-5 rounded-3xl mt-2 mx-2 ">
      <div className="font-bold text-lg text-blue-500">
        Proof of Trust | Exchange
      </div>
      <div className="flex justify-center items-center gap-x-4  rounded-lg ">
        <div className="rounded-2xl p-2">
          {currentEpoch.isSuccess ? (
            <div className="flex items-center gap-x-4">
              <div className="text-black bg-white p-2 rounded-2xl shadow-inner shadow-slate-800 font-normal">
                <p>
                  <> Current Epoch: {currentEpoch.data?.toString()} </>
                </p>
              </div>
              <div className="bg-white text-black p-2 rounded-2xl shadow-inner shadow-slate-800 font-normal">
                 <> Current Stage: {getStage(currentStage.data?.toString())} </> 
              </div>
            </div>
          ) : null}
        </div>
        <ConnectButton />
      </div>
    </div>
  );
}

export default Header;
