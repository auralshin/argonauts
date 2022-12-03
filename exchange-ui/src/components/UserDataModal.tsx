import React from "react";
import Modal from "react-modal";
import { tableBorderClass } from "../configs/config";
import users from "../configs/userData.json";
import { steps, stepStatusKind } from "../services/stepReducer";
import { Button } from "./Button";

function UserDataModal({
  isModalOpen,
  setIsModalOpen,
  stepDispatch,
}: {
  isModalOpen: boolean;
  setIsModalOpen: Function;
  stepDispatch: Function;
}) {
  const closeModal = () => {
    stepDispatch({ type: steps.stepCount, payload: 1 });
    stepDispatch({
      type: steps.stepStatuses,
      payload: { stepIndex: 0, stepStatus: stepStatusKind.SUCCESS },
    });
    setIsModalOpen(false);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <Modal
      isOpen={isModalOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="User data modal"
      appElement={document.getElementById("modal-container") || undefined}
    >
      <section className="flex flex-col w-fit">
        <div className="flex justify-between items-center pb-1">
          <h1 className="text-xl">User data</h1>
          <Button handleClick={closeModal}>x</Button>
        </div>
        <table>
          <thead>
            <tr>
              <th className={tableBorderClass}>uid</th>
              <th className={tableBorderClass}>Balance</th>
            </tr>
          </thead>
          <tbody>
            {users.slice(0, 4).map((user) => (
              <tr key={user.uuid}>
                <td className={tableBorderClass}>{user.uuid}</td>
                <td className={tableBorderClass}>{user.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </Modal>
  );
}

export default UserDataModal;
