import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";
import { clientTypes, routes } from "../configs/config";

function Header({ clientType }: { clientType: string }) {
  return (
    <div className="bg-black flex justify-between items-center p-5 rounded-3xl mt-2 mx-2 ">
      <Link to={routes.main} className="text-stone-200 text-lg font-normal">
        Proof of Trust | {clientType}
      </Link>
      <div>
        {clientType === clientTypes.exchangeAdmin ? <ConnectButton /> : null}
      </div>
    </div>
  );
}

export default Header;
