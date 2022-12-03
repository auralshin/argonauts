import React from "react";
import {
  useContract,
  useProvider,
  useAccount,
  usePrepareContractWrite,
  useSignMessage,
  useSigner,
  useContractWrite,
} from "wagmi";
import { CONTRACT_ADDRESS } from "../../constants/config";
import { ProofofReserve, USDC } from "../../typechain";
import ABI from "../../constants/POR.json";
import usdcABI from "../../constants/USDC.json";
import { useGlobalContext } from "../../context";
import { BigNumber, ethers } from "ethers";
import useEpoch from "../../hooks/useEpoch";
function Tab2() {
  const [challenges, setChallenges] = React.useState<string[]>([]);
  const [sigs, setSigs] = React.useState<string[]>([]);
  const [auditors, setAuditors] = React.useState<string[]>([]);

  const { address } = useAccount();

  const { currentEpoch } = useEpoch();

  const provider = useProvider();
  const signer = useSigner();
  const contract = useContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    signerOrProvider: provider,
  }) as ProofofReserve;

  const usdcContract = new ethers.Contract(
    "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    usdcABI,
    provider
  ) as USDC;

  const getAuditors = async () => {
    const auditors = await contract.getAuditors();
    setAuditors(auditors);
  };

  React.useEffect(() => {
    getAuditors();
    console.log(auditors);
  }, []);
  const getAuditorsChallenges = async () => {
    console.log(currentEpoch.data);
    const challenge = await contract.getAuditorsChallenge(
      currentEpoch.data as any
    );
    let temp: string[] = [];

    challenge.map((c) => {
      temp.push(c.toString());
    });
    return temp;
  };

  React.useEffect(() => {
    (async () => {
      const arr = await getAuditorsChallenges();
      console.log("get aud challenges", arr);
      setChallenges(arr);
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      const arr = await contract.getAuditors();
      console.log("get auds", arr);
      setAuditors(arr);
    })();
  }, []);

  const signMessage = async (index: number) => {
    console.log(index, "index");
    const plainText = "i own this acc" + challenges[index].toString();
    const messageToSign = ethers.utils.arrayify(
      ethers.utils.solidityKeccak256(["string"], [plainText])
    );
    const sign = await signer.data?.signMessage(messageToSign);
    console.log("signed", sign);
    setSigs([...sigs, sign as string]);
  };
  const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "submitSignature",
    args: [sigs],
  });

  const { write } = useContractWrite(config);
  const submitSigs = async () => {
    write?.();
  };
  return (
    <div>
      <div className="flex flex-col  justify-center items-center bg-gray-100 p-16 rounded-2xl shadow-2xl">
        {/* creat table with  */}
        <div className="flex flex-col justify-center items-center">
          {/* Table header */}
          <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
              {/* Header can be added */}
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 w-[70vw] overflow-x-auto">
                <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Auditors
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Challenges
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          <p>Sign</p>
                          <button onClick={() => {}}>Refresh</button>
                        </th>

                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {auditors.map((aud, index) => (
                        <tr>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex">
                              <div className="ml-3">
                                <p className="text-gray-600 truncate whitespace-no-wrap">
                                  {aud
                                    ?.toString()
                                    .split("")
                                    .slice(0, 10)
                                    .join("") + "..." ||
                                    "0x0000000000000000000000000000000000000000"
                                      .split("")
                                      .slice(0, 10)
                                      .join("") + "..."}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {challenges[index]
                                ?.toString()
                                .split("")
                                .slice(0, 10)
                                .join("") + "..." ||
                                "0x0000000000000000000000000000000000000000"
                                  .split("")
                                  .slice(0, 10)
                                  .join("") + "..."}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            {sigs[index] ? (
                              <p className="truncate w-[10vw]">{sigs[index]}</p>
                            ) : (
                              <button
                                onClick={() => signMessage(index)}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold w-[10vw] py-2 px-4 rounded-full"
                              >
                                Sign
                              </button>
                            )}
                          </td>

                          <td className="px-5 py-5 border-b w-[10vw] border-gray-200 bg-white text-sm text-right">
                            {/* OnClick open a side tab with refresh option */}

                            <button
                              onClick={() => {}}
                              type="button"
                              className="inline-block rounded-lg text-gray-500 hover:text-gray-700"
                            >
                              <svg
                                className="inline-block h-6 w-6 fill-current"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>

                    <tfoot>
                      <tr>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 font-semibold whitespace-no-wrap"></p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 font-semibold whitespace-no-wrap"></p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 font-semibold whitespace-no-wrap"></p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {sigs.length == auditors.length ? <p className="text-gray-900 whitespace-no-wrap">
                            <button
                              onClick={() => submitSigs()}
                              className={`bg-green-500 truncate hover:bg-green-700 text-white font-bold w-[10vw] py-2 px-4 rounded-full}`}
                            >
                              Submit Signature
                            </button>
                          </p> : null}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tab2;
