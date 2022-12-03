import { BigNumber } from "ethers";
import { useContractRead } from "wagmi";
import { CONTRACT_ADDRESS } from "../constants/config";
import ABI from  "../constants/POR.json"
export default function useEpoch() {

    const currentEpoch = useContractRead({
        address: CONTRACT_ADDRESS,
        abi: ABI,
        functionName: "currentEpoch",
       staleTime: Infinity,   
       onSuccess(data){
           console.log("first")
       },
      });


    return {currentEpoch};
}