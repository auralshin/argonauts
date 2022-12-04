// @ts-nocheck
import React from "react";
import ExchangeAdminSteps from "../components/ExchangeAdminSteps";
import Header from "../components/Header";
import { clientTypes } from "../configs/config";

function ExchangeAdmin() {
  return (
    <div>
      <Header clientType={clientTypes.exchangeAdmin} />
      <ExchangeAdminSteps />
    </div>
  );
}

export default ExchangeAdmin;
