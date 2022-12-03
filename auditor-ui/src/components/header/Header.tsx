import React, { useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useContract, useContractRead, useProvider } from "wagmi";
import ABI from "../../constants/POR.json";
import { CONTRACT_ADDRESS } from "../../constants/config";
import { useGlobalContext } from "../../context";
import { BigNumber } from "ethers";
import useEpoch from "../../hooks/useEpoch";
import { ProofofReserve } from "../../typechain";
function Header() {
  const { currentEpoch } = useEpoch();

  const [totalReserve, setTotalReserve] = React.useState<BigNumber | null>(null);
  // current Epoch and current Stage

  const stageMap = [
    "NONCE_COLLECTION", // by auditor
    "SIGNATURE_SUMISSION", // by cwa
    "SIGNATURE_VERIFICATION", // by auditor
    "EPOCH_VERIFIED",
  ];

  const getStage = (stage = "0") => {
    return stageMap[parseInt(stage)] || "UNKNOWN";
  };

  const currentStage = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "getState",
    args: [currentEpoch.data],
    staleTime: 2_000,
    onSuccess(data) {
      console.log("Success", data);
    },
  });

  // const currentTotalReserves = useContractRead({
  //   address: CONTRACT_ADDRESS,
  //   abi: ABI,
  //   functionName: "totalReserve",
  //   args: [currentEpoch],
  //   staleTime: 2_000,
  // });

  // console.log('hi', currentTotalReserves.data)


  const provider = useProvider();
  const contract = useContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    signerOrProvider: provider,
  }) as ProofofReserve;

  useEffect(() => {
    
    const run = async () => {
      console.log(currentEpoch.data)
      if(!currentEpoch.data) return
      const totalReserve = await contract.totalReserve(currentEpoch.data as unknown as number)
      console.log('hello', totalReserve)
      setTotalReserve(totalReserve)
    }
    run()
  }, [totalReserve])

  return (
    <div className="bg-black flex justify-between items-center p-5 rounded-3xl mt-2 mx-2 ">
      <div className="font-bold text-lg text-green-500">
        Proof of Trust | Auditor
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
                <> Stage: {getStage(currentStage.data?.toString())} </>
              </div>
              <div className="bg-white text-black p-2 rounded-2xl shadow-inner shadow-slate-800 font-normal">
                <>
                  {" "}
                  {parseInt(currentStage.data?.toString() || "0") === 3
                    ? "Proof Of Reserve Complete; Value:" +
                    totalReserve?.toString()
                    : "PoR Pending"}
                </>
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
