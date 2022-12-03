import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { routes } from "../configs/config";

function Main() {
  const navigate = useNavigate();
  return (
    <div className="h-[100vh] flex justify-center items-center">
      <div className="flex gap-[10rem]">
        <Button handleClick={() => navigate(routes.exchangeAdmin)}>
          Exchange admin client
        </Button>
        <Button handleClick={() => navigate(routes.exchangeUser)}>
          Exchange user client
        </Button>
      </div>
    </div>
  );
}

export default Main;
