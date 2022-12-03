import { tableBorderClass } from "../configs/config";

function UserBalanceTable() {
  const userBalances = [
    { assetName: "BTC", totalBalance: "0.012" },
    { assetName: "ETH", totalBalance: "1.517" },
  ];

  return (
    <table className="text-left">
      <thead>
        <tr>
          <th className={tableBorderClass}>Asset name</th>
          <th className={tableBorderClass}>Total balance</th>
        </tr>
      </thead>
      <tbody>
        {userBalances.map(({ assetName, totalBalance }) => (
          <tr>
            <td className={tableBorderClass}>{assetName}</td>
            <td className={tableBorderClass}>
              <i>{totalBalance}</i>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserBalanceTable;
