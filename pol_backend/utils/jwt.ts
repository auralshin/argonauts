import jwt from "jsonwebtoken";
import { JWT_ACCESS_TOKEN_TTL, JWT_PRIVATE_KEY } from "../env";

export function sign(object: Object, options?: jwt.SignOptions | undefined) {
	return jwt.sign(object, JWT_PRIVATE_KEY, options);
}

export function decode(token: string) {
	try {
		const decoded = jwt.verify(token, JWT_PRIVATE_KEY);

		return { valid: true, expired: false, decoded };
	} catch (error: any) {
		return {
			valid: false,
			expired: error.message === "jwt expired",
			decoded: null,
		};
	}
}

export const createAccessToken = ({ data }: { data: any }) => {
	const accessToken = sign({ ...data }, { expiresIn: JWT_ACCESS_TOKEN_TTL });

	return accessToken;
};
