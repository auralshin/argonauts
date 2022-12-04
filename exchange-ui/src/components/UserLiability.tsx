import React, { useState } from "react";
import { GreenButton, RedButton } from "./Button";
import UserBalanceTable from "./UserBalanceTable";

function UserLiability() {
  const [secret, setSecret] = useState<string | null>(null);
  return (
    <section className="flex justify-center h-[100vh] w-[100vw] text-stone-900">
      <div className="flex flex-col gap-4 items-start border-stone-900 border-2 rounded-xl h-max mt-10 p-8">
        <h1 className="text-2xl font-bold">Proof of user liability</h1>
        <div className="flex flex-col gap-1 items-start">
          <h2 className="font-bold">User ID hash</h2>
          <p>
            <i>abcxyz</i>
          </p>
        </div>
        <UserBalanceTable />
        <input
          type="text"
          placeholder="Enter secret code"
          className="py-1 px-2 rounded-xl"
          onChange={(e) => setSecret(e.target.value)}
        />
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
