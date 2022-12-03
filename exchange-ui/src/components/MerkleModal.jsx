import React from "react";
import Modal from "react-modal";
import { steps, stepStatusKind } from "../services/stepReducer";
import merkleTreeGen from "../utils/merkleTreeGen";
import { Button } from "./Button";

function MerkleModal({
  isMerkleModalOpen,
  closeModal,
  userDataWithSalt,
  merkleState,
  setMerkleState,
  root,
  stepDispatch,
}) {
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
      isOpen={isMerkleModalOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="User data modal"
      appElement={document.getElementById("modal-container") || undefined}
    >
      <section className="flex flex-col w-fit">
        <div className="flex justify-between items-center pb-1 gap-2">
          <h1 className="text-xl">Merkle tree generation</h1>
          <Button handleClick={closeModal}>x</Button>
        </div>
        <div className="flex justify-center">
          <Button
            handleClick={() => {
              // step 3 generate tree
              const merkleTree = merkleTreeGen(userDataWithSalt);
              // step 5 show the root

              // step 4 set state
              setMerkleState({
                ...merkleState,
                tree: merkleTree.tree,
                root: merkleTree.root,
                hashMap: merkleTree.hashMap,
                saltAndHashMap: merkleTree.saltAndHashMap,
              });
              // step 6 set to success
              stepDispatch({
                type: steps.stepStatuses,
                payload: { stepIndex: 2, stepStatus: stepStatusKind.SUCCESS },
              });
              stepDispatch({ type: steps.stepCount, payload: 3 });
            }}
          >
            Generate Merkle Tree
          </Button>
        </div>
        {/* show root of the tree */}
        <div className="flex flex-col gap-4">
          <h2 className="text-center">Merkle tree root</h2>
          <div className="flex flex-col items-start">
            <small>Balance</small>
            <p>{root.balance}</p>
          </div>
          <div className="flex flex-col items-start">
            <small>Hash</small>
            <p>{root.hash}</p>
          </div>
        </div>
      </section>
    </Modal>
  );
}

export default MerkleModal;
