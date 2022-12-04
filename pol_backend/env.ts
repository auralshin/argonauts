import dotenv from "dotenv";
dotenv.config();

export const JWT_ACCESS_TOKEN_TTL = process.env.JWT_ACCESS_TOKEN_TTL || "1h";
export const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY || "secret";
export const PORT = process.env.PORT || 3000;

export const NODE_ENV = process.env.NODE_ENV || "development";
export const RPC_URL = process.env.RPC_URL || "";

export const TRUSTED_ADMIN_PRIVATE_KEY =
	process.env.TRUSTED_ADMIN_PRIVATE_KEY || "0x";

export const TRUSTED_ADMIN_PUBLIC_ADDRESS =
	process.env.TRUSTED_ADMIN_PUBLIC_ADDRESS || "0x";

export const PROOF_OF_LIABILITY_CONTRACT_ADDRESS =
	process.env.PROOF_OF_LIABILITY_CONTRACT_ADDRESS || "0x";
