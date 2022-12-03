import React, { useEffect, useState } from "react";
import {
  useContract,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useProvider,
} from "wagmi";
import ABI from "../../constants/POR.json";
import { BigNumber, ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../../constants/config";
import { ProofofReserve } from "../../typechain";
function Tab1() {
  const [nonce, setNonce] = useState<BigNumber>(ethers.BigNumber.from(1232));
  const [isNonce, setIsNonce] = useState<Boolean>(false)
  const provider = useProvider();
  const contract = useContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    signerOrProvider: provider,
  }) as ProofofReserve;
  const isNonceUsed = async() => {
    const bool = contract.nonceUsed(nonce)
    return bool
  }
  useEffect(() => {
    isNonceUsed()
  },[])

  // contract.data is the return value of the contract call
  // generate random number
  useEffect(() => {
    setNonce(nonce);
  }, [nonce]);
  const generateRandomNonce = () => {
    const randomNonce = ethers.BigNumber.from(ethers.utils.randomBytes(32));
    console.log(randomNonce);
    setNonce(randomNonce);
  };

  const { config, error } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "pushChallenge",
    args: [nonce],
  });
  const { write } = useContractWrite(config);

  return (
    <div>
      <div className="flex flex-col  justify-center items-center bg-gray-100 p-16 rounded-2xl shadow-2xl">
        <div>
          <div
            className={`grid grid-cols-6 bg-gray-200 p-2 w-[60vw] justify-between ${
              isNonce ? "outline outline-red-600" : "outline-none"
            } rounded-3xl`}
          >
            <div className="bg-gray-200 col-span-4 rounded-3xl text-black">
              <input
                placeholder={nonce.toString()}
                className="bg-gray-200 w-full text-ellipsis py-2 px-3 outline-none ring-0 rounded-3xl"
              ></input>
            </div>
            <button
              onClick={() => generateRandomNonce()}
              className={`bg-black col-span-2 text-white rounded-3xl p-2 `}
            >
              Generate Random Nonce
            </button>
          </div>
          {isNonce ? (
            <div className="text-xs pl-2 text-red-400">Nonce Already Used</div>
          ) : null}
        </div>

        <div>
          <button
            onClick={() => write?.()}
            className="bg-black w-[60vw] text-white p-2 rounded-3xl"
          >
            Push Challenge
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tab1;
