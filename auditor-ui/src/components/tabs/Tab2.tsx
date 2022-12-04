import React from "react";
import {
  useContract,
  useProvider,
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import { CONTRACT_ADDRESS } from "../../constants/config";
import { ProofofReserve, USDC } from "../../typechain/";
import ABI from "../../constants/POR.json";
import usdcABI from "../../constants/USDC.json";
import { useGlobalContext } from "../../context";
import { ethers } from "ethers";
import useEpoch from "../../hooks/useEpoch";
function Tab2() {
  const [cwaArray, setCwaArray] = React.useState<string[]>([]);
  const [sigs, setSigs] = React.useState<string[]>([]);
  const [validateStage, setValidateStage] = React.useState<number>(0);
  const [valid, setValid] = React.useState<boolean>(true);
  const [open, setOpen] = React.useState<boolean>(false);
  const [refresh, setRefresh] = React.useState<boolean>(false);
  const [balance, setBalance] = React.useState<string[]>([]);
  const [isValidAll, setIsValidAll] = React.useState<boolean>(false);
  const [totalBalance, setTotalBalance] = React.useState<number>(0);
  const [submitBalanaceDisabled, setBalanceDisabled] =
    React.useState<boolean>(true);
  const { address } = useAccount();


  const { currentEpoch } = useEpoch();

  const provider = useProvider();
  const contract = useContract({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    signerOrProvider: provider,
  }) as ProofofReserve;

  (window as any).contract = contract
  const fetchSigsAndCWA = async () => {
    if (!address) return;
    const [cwaArrayRes, sigsRes] = await Promise.all([
      contract.getCWAs(),
      contract.getSignauresForAuditor(currentEpoch.data as any, address),
    ]);

    setCwaArray(cwaArrayRes);
    setSigs(sigsRes);
    console.log(cwaArrayRes)
  };
  async function getBalancesAtCheckpoint(
    blockNumber: string,
    addresses: string[],
    usdcInstance: any
  ) {
    let balanceArray = [];
    for (let i = 0; i < addresses.length; i++) {
      let bal = await usdcInstance.balanceOf(addresses[i], {
        blockTag: blockNumber,
      });
      balanceArray.push(bal);
    }
    return balanceArray;
  }

  const hasSubmitted = async () => {
    if (!address) return;

    const submitted = await contract.hasAuditorSubmittedBalance(address, currentEpoch.data as any);
    console.log(submitted, "submitted");
    setBalanceDisabled(submitted);
  };
  const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "submitTotalBalance",
    args: [totalBalance],
  });

  const { write } = useContractWrite(config);

  const submitBalanaces = async () => {
    write?.();
  };
  const usdcContract = new ethers.Contract(
    "0xa122c863f32B7a3b0cA3779C2CF3e6aE2264c1A4",
    usdcABI,
    provider
  ) as USDC;

  const fetchAllBalances = async () => {
    if (!cwaArray) return;
    const balancesArray: string[] = [];
    let total = 0;
    for (const cwa of cwaArray) {
      console.log("cwa", cwa);
      const res = (await usdcContract.balanceOf(cwa)).div(
        ethers.BigNumber.from(10).pow(await usdcContract.decimals())
      );
      console.log("cwa-res", res);
      console.log(res);
      balancesArray.push(res.toString());
        console.log(balancesArray)
      total += Number(res.toString());
    }
    setTotalBalance(total);
    setBalance(balancesArray);
  };

  const validateSignature = async (
    signature: string,
    who: string,
    index: number
  ) => {
    const challenges = await contract.getAuditorsChallenge(currentEpoch.data as any);
    const challenge = challenges[index];
    console.log("challenge", challenge);
    const isValid =
      ethers.utils.verifyMessage(
        "i own this acc" + challenge.toString(),
        signature
      ) === who;
    console.log("isvalid", isValid);
    if (!isValid) {
      setValidateStage(0);
    }
    setValidateStage(2);
    return isValid;
  };

  const validateSignatureAll = async (signatures: string[], whos: string[]) => {
    setValidateStage(2);
    for (let i = 0; i < signatures.length; i++) {
      console.log(signatures[i], whos[i], i);
      const isValid = await validateSignature(signatures[i], whos[i], i);
      console.log(isValid, "isvalid All");
      if (!isValid) {
        setValidateStage(0);
      }
    }
    setValidateStage(2);
    setIsValidAll(true);
  };

  React.useEffect(() => {
    console.log(address, currentEpoch.data as any)
    if (address && currentEpoch.data && cwaArray.length === 0) {
      fetchSigsAndCWA();
      console.log(address, currentEpoch.data)
    }
  }, [cwaArray]);

  React.useEffect(() => {
    if (address && currentEpoch.data && cwaArray.length > 0) {
      fetchAllBalances();
      hasSubmitted();
    }
  }, [cwaArray]);
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
                          Cold Wallet Address
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Signature
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          <p>Validation</p>
                          <button
                            onClick={() => validateSignatureAll(sigs, cwaArray)}
                          >
                            Refresh
                          </button>
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                          Balances
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cwaArray.map((cwa, index) => (
                        <tr key={index}>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex">
                              <div className="ml-3">
                                <p className="text-gray-600 whitespace-no-wrap">
                                  {(
                                    cwa ||
                                    "0x0000000000000000000000000000000000000000"
                                  )
                                    .split("")
                                    .slice(0, 10)
                                    .join("") + "..."}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {(
                                sigs[index] ||
                                "0x0000000000000000000000000000000000000000"
                              )
                                .split("")
                                .slice(0, 10)
                                .join("") + "..."}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            {validateStage === 0 ? (
                              <button
                                onClick={() => {
                                  validateSignature(sigs[index], cwa, index);
                                  setValidateStage(1);
                                }}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold w-[10vw] py-2 px-4 rounded-full"
                              >
                                Valid
                              </button>
                            ) : (
                              <>
                                {validateStage === 1 ? (
                                  <button
                                    type="button"
                                    className="bg-orange-500 py-2 px-4 flex text-white w-[10vw] font-bold rounded-full ..."
                                    disabled
                                  >
                                    <svg
                                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                    >
                                      <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                      ></circle>
                                      <path
                                        className="opacity-100"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8v1a7 7 0 00-7 7h1z"
                                      ></path>
                                    </svg>
                                    <p>Validating...</p>
                                  </button>
                                ) : (
                                  <div>
                                    {/* dropdown */}
                                    <div className="relative flex inline-block py-2 px-2 text-center border-black border rounded-xl">
                                      {/* svg which changes according to select : green tick and red tick */}
                                      {valid ? (
                                        // svg color should change according to be green or red

                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-6 w-6"
                                          fill="#00FF00"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            fill="#00FF00"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                          />
                                        </svg>
                                      ) : (
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-6 w-6"
                                          fill="#FF0000"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                          />
                                        </svg>
                                      )}

                                      <select
                                        onChange={(e) => {
                                          if (e.target.value === "valid") {
                                            setValid(true);
                                          } else {
                                            setValid(false);
                                          }
                                        }}
                                        className="outline-none"
                                        id="valid"
                                        name="Valid"
                                      >
                                        <option value="valid">Valid</option>
                                        <option value="invalid">Invalid</option>
                                      </select>
                                    </div>
                                  </div>
                                )}{" "}
                              </>
                            )}
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                              <span
                                aria-hidden
                                className="absolute w-[8vw] inset-0 bg-green-200 opacity-50 rounded-full"
                              ></span>
                              <span className="relative">
                                ${balance[index]}
                              </span>
                            </span>
                          </td>
                          <td className="px-5 py-5 border-b w-[10vw] border-gray-200 bg-white text-sm text-right">
                            {/* OnClick open a side tab with refresh option */}
                            {!open ? (
                              <button
                                onClick={() => {
                                  setOpen(!open);
                                }}
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
                            ) : (
                              <div
                                className={`${
                                  open ? "block" : "hidden"
                                } inline-block rounded-lg shadow-lg`}
                              >
                                <div
                                  className="rounded-md bg-white shadow-xs"
                                  role="menu"
                                  aria-orientation="vertical"
                                  aria-labelledby="options-menu"
                                >
                                  <div className="">
                                    <button
                                      onClick={() => {
                                        setOpen(false);
                                      }}
                                      type="button"
                                      className="block w-full text-left px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                      role="menuitem"
                                    >
                                      Refresh
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    {isValidAll ? (
                      <tfoot>
                        <tr>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap"></p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap"></p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 font-semibold whitespace-no-wrap">
                            Total Reserves of Exchange
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 font-semibold whitespace-no-wrap">
                              {"$" + totalBalance}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            {submitBalanaceDisabled ? (
                              <p>Already Submitted</p>
                            ) : (
                              <p className="text-gray-900 whitespace-no-wrap">
                                <button
                                  onClick={() => {
                                    submitBalanaces();
                                  }}
                                  className={`bg-green-500 truncate hover:bg-green-700 text-white font-bold w-[10vw] py-2 px-4 rounded-full}`}
                                >
                                  Submit Reserve Proof
                                </button>
                              </p>
                            )}
                          </td>
                        </tr>
                      </tfoot>
                    ) : null}
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
