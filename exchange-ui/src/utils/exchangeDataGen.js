import crypto from "crypto-browserify";
import { soliditySha3 } from "web3-utils";

function exchangeDataGen(userData) {
  const userDataWithSalt = [];
  const userDataWithUnHashedSalt = [];
  for (let i = 0; i < userData.length; i++) {
    const saltToUser = crypto.randomBytes(4).toString("hex");
    const saltInDB = soliditySha3({
      type: "string",
      value: saltToUser,
    });

    userDataWithSalt.push({
      uuid: userData[i].uuid,
      balance: userData[i].balance,
      salt: saltInDB,
    });
    userDataWithUnHashedSalt.push({
      uuid: userData[i].uuid,
      balance: userData[i].balance,
      salt: saltToUser,
    });
  }
  return { userDataWithSalt, userDataWithUnHashedSalt };
}

export default exchangeDataGen;
