import { tableBorderClass } from "../configs/config";

function UserBalanceTable({userBalances}: any) {


  return (
    <table className="text-left">
      <thead>
        <tr>
          <th className={tableBorderClass}>Asset name</th>
          <th className={tableBorderClass}>Total balance</th>
        </tr>
      </thead>
      <tbody>
        {userBalances.map(( balance: any) => (
          <tr>
            <td className={tableBorderClass}>{"asset 1"}</td>
            <td className={tableBorderClass}>
              <i>{balance}</i>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserBalanceTable;
