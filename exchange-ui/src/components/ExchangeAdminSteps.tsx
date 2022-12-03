import React from "react";
import { GreenButton } from "./Button";
import OperationStatus from "./OperationStatus";

const adminSteps = [
  {
    description: "Preview the data",
    handleClick: () => {},
    btnText: "",
  },
  {
    description: "Append hashed salt values to the same data",
    handleClick: () => {},
    btnText: "",
  },
  {
    description: "Generate the merkle tree",
    handleClick: () => {},
    btnText: "",
  },
  {
    description: "Publish merkle tree on IPFS",
    handleClick: () => {},
    btnText: "",
  },
  {
    description: "Update contract with IPFS CID",
    handleClick: () => {},
    btnText: "",
  },
  {
    description: "Update Contract with hash -> salt mapping",
    handleClick: () => {},
    btnText: "",
  },
];

function ExchangeAdminSteps() {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <table>
        {adminSteps.map(({ description, handleClick }) => (
          <tr className="flex justify-between gap-[15rem] p-3">
            <th>{description}</th>
            <td>
              <div className="flex gap-2 items-center">
                <GreenButton isDisabled={false} handleClick={handleClick}>
                  Perform action
                </GreenButton>
                {/* status: pending, loading, success, error */}
                <OperationStatus status={"pending"} />
              </div>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default ExchangeAdminSteps;
