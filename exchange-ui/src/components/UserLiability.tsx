import React, { useEffect, useState } from "react";
import { retrieveFiles } from "../utils/publishMerkleTree";
import { Button, GreenButton, RedButton } from "./Button";
import UserBalanceTable from "./UserBalanceTable";
import userData from "../configs/userData.json";
import verifyUser from "../utils/verifyUser";

function UserLiability() {

  const [secret, setSecret] = useState<string | null>(null);
  const [retrievedMerkleData, setRetrievedMerkleData] = useState({tree: null, hashMap: null});
  useEffect(() => {
    // fetch the tree and hashmap from IPFS
    const cid = "bafybeid5mwci3fyzwtw37gppip3pz45iaq6zcdio6bocceqplycp3a5e3q";
    (async () => {
      const jsonData = await retrieveFiles(cid);

      setRetrievedMerkleData({tree: jsonData.tree, hashMap: jsonData.hashMap})

      

    })()
    
    // pick a random user
    // display details
  }, []);
  const randomUserNumber = 9;
    const randomUser = userData[randomUserNumber];



  const validateTree = () => {
    // validate tree received from IPFS
    verifyUser(retrievedMerkleData.tree, retrievedMerkleData.hashMap, userData, randomUserNumber, secret)
  };

  return (
    <section className="flex justify-center h-[100vh] w-[100vw] text-stone-900">
      <div className="flex flex-col gap-4 items-start border-stone-900 border-2 rounded-xl h-max mt-10 p-8">
        <h1 className="text-2xl font-bold">Proof of user liability</h1>
        <div className="flex flex-col gap-1 items-start">
          <h2 className="font-bold">User ID hash</h2>
          <p>
            <i>{randomUser.uuid}</i>
          </p>
        </div>
        <UserBalanceTable userBalances={[randomUser.balance]} />
        
        <input
          type="text"
          placeholder="Enter secret code"
          className="py-1 px-2 rounded-xl"
          onChange={(e) => setSecret(e.target.value)}
        />
        <Button handleClick={() => {
          validateTree()
        }}>Validate</Button>
        <div className="flex gap-5">
          <GreenButton handleClick={() => {}} isDisabled={false}>
            Confirm
          </GreenButton>
          <RedButton handleClick={() => {}} isDisabled={false}>
            Challenge
          </RedButton>
        </div>
      </div>
    </section>
  );
}

export default UserLiability;
