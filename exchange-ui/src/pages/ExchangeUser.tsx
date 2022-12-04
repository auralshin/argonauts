import React from "react";
import Header from "../components/Header";
import UserLiability from "../components/UserLiability";
import { clientTypes } from "../configs/config";

function ExchangeUser() {
  return (
    <div className="text-center">
      <Header clientType={clientTypes.exchangeUser} />
      <UserLiability />
    </div>
  );
}

export default ExchangeUser;
