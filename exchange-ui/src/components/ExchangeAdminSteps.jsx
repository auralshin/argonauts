import React, { useReducer, useState } from "react";
import { stepReducer, steps, stepStatusKind } from "../services/stepReducer";
import { GreenButton } from "./Button";
import OperationStatus from "./OperationStatus";
import UserDataModal from "./UserDataModal";

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

  const openUserDataModal = () => {
    stepDispatch({
      type: steps.stepStatuses,
      payload: { stepIndex: 0, stepStatus: stepStatusKind.LOADING },
    });
    setIsModalOpen(true);
  };

  const adminSteps = [
    {
      description: "Preview the data",
      handleClick: () => openUserDataModal(),
      btnText: "View data",
    },
    {
      description: "Append hashed salt values to the same data",
      handleClick: () => {},
      btnText: "Append salt",
    },
    {
      description: "Generate the merkle tree",
      handleClick: () => {},
      btnText: "Generate tree",
    },
    {
      description: "Publish merkle tree on IPFS",
      handleClick: () => {},
      btnText: "Publish to IPFS",
    },
    {
      description: "Update contract with IPFS CID",
      handleClick: () => {},
      btnText: "Update CID",
    },
    {
      description: "Update Contract with hash -> salt mapping",
      handleClick: () => {},
      btnText: "Update mapping",
    },
  ];

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
    </>
  );
}

export default ExchangeAdminSteps;
