import React from "react";
import Header from "../components/Header";
import { clientTypes } from "../configs/config";

function ExchangeAdmin() {
  return (
    <div className="text-center">
      <Header clientType={clientTypes.exchangeAdmin} />
    </div>
  );
}

export default ExchangeAdmin;
