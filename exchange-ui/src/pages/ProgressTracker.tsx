import React from "react";
import Header from "../components/Header";
import { clientTypes } from "../configs/config";

const ProgressBar = ({ percentage }: { percentage: number }) => {
  const getBarColorClass = (percentage: number) => {
    if (percentage < 34) {
      return "bg-red-500";
    } else if (percentage < 66) {
      return "bg-amber-500";
    } else {
      return "bg-green-500";
    }
  };

  return (
    <div className="bg-stone-300 h-5 rounded-full">
      <div
        className={`${getBarColorClass(
          percentage
        )} h-full rounded-full flex items-center justify-end`}
        style={{ width: `${percentage}%` }}
      >
        <small className="px-2">{percentage}%</small>
      </div>
    </div>
  );
};

function ProgressTracker() {
  const percentage = 63;
  return (
    <>
      <Header clientType={clientTypes.public} />
      <div className="flex flex-col w-[65%] mx-auto mt-10 gap-4">
        <h1 className="text-center">Proof of liability progress:</h1>
        <div>
          <ProgressBar percentage={percentage} />
        </div>
      </div>
    </>
  );
}

export default ProgressTracker;
