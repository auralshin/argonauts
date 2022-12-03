import React, { useEffect, useReducer, useState } from "react";
import { stepReducer, steps, stepStatusKind } from "../services/stepReducer";
import { GreenButton } from "./Button";
import OperationStatus from "./OperationStatus";
import UserDataModal from "./UserDataModal";
import users from "../configs/userData.json";
import exchangeDataGen from "../utils/exchangeDataGen";
import MerkleModal from "./MerkleModal";
import publishMerkleTree from "../utils/publishMerkleTree";
import { toast } from "react-toastify";

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

  const [merkleState, setMerkleState] = useState({
    isMerkleModalOpen: false,
    tree: null,
    root: { balance: "", hash: "" },
    hashMap: null,
    saltAndHashMap: null,
  });

  const [cidString, setCidString] = useState(null);

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
      handleClick: () => {
        // step 1 loading
        stepDispatch({
          type: steps.stepStatuses,
          payload: { stepIndex: 3, stepStatus: stepStatusKind.LOADING },
        });
        // step 2 publish to
        (async () => {
          const publishedData = await publishMerkleTree();
          // step 3 set state
          setCidString(publishedData.cidString);
          // step 4 success, stepCount and toast
          stepDispatch({
            type: steps.stepStatuses,
            payload: { stepIndex: 3, stepStatus: stepStatusKind.SUCCESS },
          });
          stepDispatch({ type: steps.stepCount, payload: 4 });
        })();
      },
      btnText: "Publish to IPFS",
    },
    {
      description: "Update contract with all details",
      handleClick: () => {},
      btnText: "Update CID",
    },
    {
      description: "Update Contract with hash -> salt mapping",
      handleClick: () => {},
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
    if (cidString) {
      toast("Published to IPFS! CID: ", cidString);
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
