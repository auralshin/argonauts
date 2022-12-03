import fs from "fs";
import crypto from "crypto";
import userData from "./userData.json";
import Web3 from "web3";

exchangeDataGen();

function exchangeDataGen() {
	const userDataWithSalt = [];
	const userDataWithUnHashedSalt = [];
	for (let i = 0; i < userData.length; i++) {
		const saltToUser = crypto.randomBytes(4).toString("hex");
		const saltInDB = Web3.utils.soliditySha3(saltToUser);
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
	const stringifiedData = JSON.stringify(userDataWithSalt);
	fs.writeFileSync("userDataWithSalt.json", stringifiedData);
	const stringifiedDataTwo = JSON.stringify(userDataWithUnHashedSalt);
	fs.writeFileSync("userDataWithUnHashedSalt.json", stringifiedDataTwo);
}
