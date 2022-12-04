import express, { ErrorRequestHandler } from "express";
import { Request, Response } from "express";
import cors from "cors";
import http from "http";
import deserializeUser from "./middleware/deserializeUser";
import {
	RPC_URL,
	NODE_ENV,
	PORT,
	PROOF_OF_LIABILITY_CONTRACT_ADDRESS,
	TRUSTED_ADMIN_PRIVATE_KEY,
} from "./env";
import { UserInfoRequest } from "./utils/UserInfoRequest";
import { abi } from "./config/abi.json";
import * as ethers from "ethers";
import { createAccessToken } from "./utils/jwt";

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(deserializeUser);

app.get("/", async (req: Request, res: Response) => {
	try {
		return res.json("Server is up \nand running...");
	} catch (e: any) {
		console.log(e);
	}
});

app.post("/user-state", async (req: UserInfoRequest, res: Response) => {
	try {
		const user = req.user;
		if (
			!user ||
			!user.hash ||
			user.hash == "" ||
			!user.salt ||
			user.salt == ""
		) {
			res.status(400).send(
				"Bad Request, the user hash and salt is not sent."
			);
		}

		const salt = user.salt;
		const hash = user.hash;
		const balance = ethers.BigNumber.from(req.body.balance);
		const stateEnum = parseInt(req.body.stateEnum);

		console.log({
			salt,
			hash,
			balance,
			stateEnum,
		});

		const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
		const wallet = new ethers.Wallet(TRUSTED_ADMIN_PRIVATE_KEY, provider);
		const contract = new ethers.Contract(
			PROOF_OF_LIABILITY_CONTRACT_ADDRESS,
			abi,
			wallet
		);

		const someData = await contract.getIpfsMerkleTreeCid();
		console.log({ someData });

		// const gasEstimation = await contract
		// 	.updateUserLeafStates(salt, hash, balance, stateEnum)
		// 	.gasLimit();
		// console.log(`gasEstimation ${gasEstimation}`);

		const tx = await contract.updateUserLeafStates(
			salt,
			hash,
			balance,
			stateEnum
		);

		console.log(`TX  ${tx}`);
		res.status(200).send({
			message: "Done!",
			txHash: tx.hash,
		});
	} catch (error: any) {
		res.status(500).send("Failed");
		console.error(error);
	}
});

app.post("/initialize-contract");

app.post("/get-jwt", async (req: Request, res: Response) => {
	try {
		const { hash, salt } = req.body;

		const jwt = createAccessToken({ data: { hash, salt } });

		res.status(200).send(jwt);
	} catch (error: any) {
		console.error(error);
	}
});

// TODO: ratelimit
app.use(express.static(__dirname, { index: "app.log" }));

const onError: ErrorRequestHandler = (err, _req, res, _next) => {
	console.error(err);
	res.status(500).send(
		NODE_ENV === "development" && err?.message
			? err?.message
			: "Unexpected Error occurred"
	);
};
app.use(onError);

server.listen(PORT, () => {
	console.log(`server listening on port: ${PORT}`);
});

export default server;
