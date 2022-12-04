import React, { useEffect, useReducer, useState } from "react";
import { stepReducer, steps, stepStatusKind } from "../services/stepReducer";
import { GreenButton } from "./Button";
import OperationStatus from "./OperationStatus";
import UserDataModal from "./UserDataModal";
import users from "../configs/userData.json";
import exchangeDataGen from "../utils/exchangeDataGen";
import MerkleModal from "./MerkleModal";
import {publishMerkleTree, retrieveFiles} from "../utils/publishMerkleTree";
import { toast } from "react-toastify";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import proofOfLiabilityAbi from "../configs/abi/proofOfLiability.json";
import { liabilityAddress } from "../configs/config";

function ExchangeAdminSteps() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [{ stepStatuses, stepCount }, stepDispatch] = useReducer(stepReducer, {
    stepStatuses: [
      stepStatusKind.PENDING,
      stepStatusKind.PENDING,
      stepStatusKind.PENDING,
      stepStatusKind.PENDING,
      stepStatusKind.PENDING,
      stepStatusKind.PENDING,
    ],
    stepCount: 0,
  });

  const [userDataState, setUserDataState] = useState({
    init: users,
    userDataWithSalt: [],
    userDataWithUnHashedSalt: [],
  });

  console.log({userDataState})

  const [merkleState, setMerkleState] = useState({
    isMerkleModalOpen: false,
    tree: null,
    root: { balance: "", hash: "" },
    hashMap: null,
    saltAndHashMap: [],
  });

  const [cidString, setCidString] = useState(null);

  const cidMutationRecipe = usePrepareContractWrite({
    address: liabilityAddress,
    abi: proofOfLiabilityAbi,
    functionName: "initialize",
    args: [
      merkleState.root.balance,
      merkleState.saltAndHashMap.length,
      Math.round(merkleState.root.balance * 0.6),
      Math.round(merkleState.saltAndHashMap.length * 0.6),
      cidString,
    ],
  });

  console.log({ stepCount });
  const mappingMutationRecipe = usePrepareContractWrite({
    address: liabilityAddress,
    abi: proofOfLiabilityAbi,
    functionName: "loadSaltMaps",
    args: [merkleState.saltAndHashMap],
    enabled: stepCount > 5,
  });

  const cidMutation = useContractWrite({
    ...cidMutationRecipe.config,
    onSuccess: (data) => {
      toast("Updated CID!");
      stepDispatch({
        type: steps.stepStatuses,
        payload: { stepIndex: 4, stepStatus: stepStatusKind.SUCCESS },
      });
      stepDispatch({ type: steps.stepCount, payload: 5 });
    },
    onError: (data) => {
      toast("CID update failed!");
      stepDispatch({
        type: steps.stepStatuses,
        payload: { stepIndex: 4, stepStatus: stepStatusKind.ERROR },
      });
    },
  });

  const mappingMutation = useContractWrite({
    ...mappingMutationRecipe.config,
    onSuccess: (data) => {
      toast("Updated mapping!");
      stepDispatch({
        type: steps.stepStatuses,
        payload: { stepIndex: 5, stepStatus: stepStatusKind.SUCCESS },
      });
      stepDispatch({ type: steps.stepCount, payload: 6 });
    },
    onError: (data) => toast("Mapping update failed!"),
  });

  console.log({
    mappingConfig: mappingMutationRecipe.config,
    mappingWrite: mappingMutation.write,
  });

  const openUserDataModal = () => {
    // mark step 2 as sucess and put stepCount to 1
    stepDispatch({
      type: steps.stepStatuses,
      payload: { stepIndex: 0, stepStatus: stepStatusKind.LOADING },
    });
    setIsModalOpen(true);
  };

  const openMerkleModal = () => {
    setMerkleState({ ...merkleState, isMerkleModalOpen: true });
  };

  const closeMerkleModal = () => {
    setMerkleState({ ...merkleState, isMerkleModalOpen: false });
  };

  const adminSteps = [
    {
      description: "Preview the data",
      handleClick: () => openUserDataModal(),
      btnText: "View data",
    },
    {
      description: "Append hashed salt values to the data",
      handleClick: () => {
        stepDispatch({
          type: steps.stepStatuses,
          payload: { stepIndex: 1, stepStatus: stepStatusKind.LOADING },
        });
        // step 1 call exchangeDataGen
        const saltedUserData = exchangeDataGen(userDataState.init);

        // step 2 set State after getting result
        setUserDataState({
          ...userDataState,
          userDataWithSalt: saltedUserData.userDataWithSalt,
          userDataWithUnHashedSalt: saltedUserData.userDataWithUnHashedSalt,
        });
      },
      btnText: "Append salt",
    },
    {
      description: "Generate the merkle tree",
      handleClick: () => {
        // step 1 set loading
        stepDispatch({
          type: steps.stepStatuses,
          payload: { stepIndex: 2, stepStatus: stepStatusKind.LOADING },
        });
        // step 2 open modal
        openMerkleModal();
      },
      btnText: "Generate tree",
    },
    {
      description: "Publish merkle tree on IPFS",
      handleClick: async () => {
        // step 1 loading
        stepDispatch({
          type: steps.stepStatuses,
          payload: { stepIndex: 3, stepStatus: stepStatusKind.LOADING },
        });
        // step 2 publish to

        try {
          const publishedData = await publishMerkleTree(
            merkleState.tree,
            merkleState.hashMap
          );
          
          
          // step 3 set state
          setCidString(publishedData.cidString);
          // step 4 success, stepCount and toast
          stepDispatch({
            type: steps.stepStatuses,
            payload: { stepIndex: 3, stepStatus: stepStatusKind.SUCCESS },
          });
          stepDispatch({ type: steps.stepCount, payload: 4 });
        } catch (err) {
          toast("uploading to IPFS failed!");
        }
      },
      btnText: "Publish to IPFS",
    },
    {
      description: "Update contract with all details",
      handleClick: () => {
        // step 1 loading
        stepDispatch({
          type: steps.stepStatuses,
          payload: { stepIndex: 4, stepStatus: stepStatusKind.LOADING },
        });

        // step 3 call method
        cidMutation.write();
      },
      btnText: "Update CID",
    },
    {
      description: "Update Contract with hash -> salt mapping",
      handleClick: async () => {
        // step 1 loading
        stepDispatch({
          type: steps.stepStatuses,
          payload: { stepIndex: 5, stepStatus: stepStatusKind.LOADING },
        });

        // step 3 call method
        // console.log({
        //   mapConfig: mappingMutationRecipe.config,
        //   mappingWrite: mappingMutation.write,
        // });
        mappingMutation.write();
      },
      btnText: "Update mapping",
    },
  ];

  // change status to success for step 2
  useEffect(() => {
    if (stepStatuses[1] === stepStatusKind.LOADING) {
      stepDispatch({
        type: steps.stepStatuses,
        payload: { stepIndex: 1, stepStatus: stepStatusKind.SUCCESS },
      });
      stepDispatch({ type: steps.stepCount, payload: 2 });
    }
  }, [stepStatuses, userDataState]);

  useEffect(() => {
    if (cidString !== null) {
      toast("Published to IPFS!");
    }
  }, [cidString]);

  return (
    <>
      <div className="flex justify-center items-center h-[100vh]">
        <table>
          <tbody>
            {adminSteps.map(({ description, handleClick, btnText }, index) => (
              <tr
                className="flex justify-between gap-[15rem] p-3"
                key={description}
              >
                <th>{description}</th>
                <td>
                  <div className="flex gap-2 items-center">
                    <GreenButton
                      isDisabled={stepCount < index}
                      handleClick={handleClick}
                    >
                      {btnText}
                    </GreenButton>
                    {/* status: pending, loading, success, error */}
                    <OperationStatus status={stepStatuses[index]} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <UserDataModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        stepDispatch={stepDispatch}
      />
      <MerkleModal
        isMerkleModalOpen={merkleState.isMerkleModalOpen}
        closeModal={closeMerkleModal}
        userDataWithSalt={userDataState.userDataWithSalt}
        merkleState={merkleState}
        setMerkleState={setMerkleState}
        root={merkleState.root}
        stepDispatch={stepDispatch}
      />
    </>
  );
}

export default ExchangeAdminSteps;
