import React, { useEffect, useState } from "react";
import { retrieveFiles } from "../utils/publishMerkleTree";
import { Button, GreenButton, RedButton } from "./Button";
import UserBalanceTable from "./UserBalanceTable";
import userData from "../configs/userData.json";
import verifyUser, { userDataToLeaf } from "../utils/verifyUser";
import { toast } from "react-toastify";
import axios from "axios";

function UserLiability() {
  const [secret, setSecret] = useState<string | null>(null);
  const [retrievedMerkleData, setRetrievedMerkleData] = useState({
    tree: null,
    hashMap: null,
  });
  useEffect(() => {
    // fetch the tree and hashmap from IPFS
    const cid = "bafybeibzxh4ypef2dujcskkmj53chpvthldx7vodptt3ja2a6uoxgjti3u";
    (async () => {
      const jsonData = await retrieveFiles(cid);

      setRetrievedMerkleData({
        tree: jsonData.tree,
        hashMap: jsonData.hashMap,
      });
    })();

    // pick a random user
    // display details
  }, []);
  const randomUserNumber = 9;
  const randomUser = userData[randomUserNumber];
  const [{proofResults, sisterNodes}, setValidationData] = useState<{proofResults: boolean, sisterNodes: any[]}>({proofResults: false, sisterNodes: []});

  const validateTree = () => {
    // validate tree received from IPFS
    const isTreeValidated = verifyUser(
      retrievedMerkleData.tree,
      retrievedMerkleData.hashMap,
      userData,
      randomUserNumber,
      secret
    );

    console.log({isTreeValidated})
    isTreeValidated.proofResults
      ? toast("User salt validated in the tree")
      : toast("User salt validation failed!");
    
    return isTreeValidated;
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
        <Button
          handleClick={() => {
            const res = validateTree();
            console.log(res.sisterNodes);
            setValidationData({proofResults: res.proofResults, sisterNodes: res.sisterNodes});
          }}
        >
          Validate
        </Button>
        <div className="flex gap-5">
          <GreenButton handleClick={async () => {

            // get hash from tree and salt from user
            const hash = userDataToLeaf(randomUser,secret ).hash;
            const {data} =  await axios.post("http://localhost:1357/get-jwt", {
              hash,
              salt: secret
            });
            const res = await axios.post("http://localhost:1357/user-state", {
              balance: randomUser.balance,
              stateEnum: 1
            },{headers: {"Authorization": "Bearer" + data}});

            toast("State Confirmed!")
            
            // post call to user-state 
          }} isDisabled={false}>
            Confirm
          </GreenButton>
          <RedButton handleClick={() => {}} isDisabled={false}>
            Challenge
          </RedButton>
        </div>
        {
          proofResults? <div>
          <h3 className="font-bold">Displaying all the sister nodes & branches validated</h3>
          <ul className="font-mono">
            {
              // sisterNodes.map((c) => console.log())
              sisterNodes.map((v, i) => <li key={i}> {v.hash} - {v.balance}</li>)
            }
            {/* <li> {retrievedMerkleData?.tree?[1]?.hash?} - {}</li> */}
          </ul>
        </div> : null
        }
        
      </div>
    </section>
  );
}

export default UserLiability;
