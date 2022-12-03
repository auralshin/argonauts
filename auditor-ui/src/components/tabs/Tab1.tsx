import React, { useEffect, useState } from "react";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import ABI from "../../constants/POR.json";
import { BigNumber, ethers } from "ethers";
function Tab1() {
  const [nonce, setNonce] = useState<BigNumber>(ethers.BigNumber.from(1232));

  const isNonceUsed = useContractRead({
    address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    abi: ABI,
    functionName: "nonceUsed",
    args: [nonce],
  });

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
    address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    abi: ABI,
    functionName: "pushChallenge",
    args: [nonce, 1001],
  });
  const { write } = useContractWrite(config);

  return (
    <div>
      <div className="flex flex-col  justify-center items-center bg-gray-100 p-16 rounded-2xl shadow-2xl">
        <div>
          <div
            className={`grid grid-cols-6 bg-gray-200 p-2 w-[60vw] justify-between ${
              isNonceUsed.data ? "outline outline-red-600" : "outline-none"
            } rounded-3xl`}
          >
            <div className="bg-gray-200 col-span-4 rounded-3xl text-black">
              <input
                value={nonce.toString()}
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
          {isNonceUsed.data ? (
            <div className="text-xs pl-2 text-red-400">Nonce Already Used</div>
          ) : null}
        </div>

        <div>
          <button
            onClick={() => write}
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
