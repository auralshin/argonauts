import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { decode } from "../utils/jwt";

const deserializeUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const accessToken = get(req, "headers.authorization", "").replace(
		/^Bearer\s/,
		""
	);

	if (!accessToken) return next();

	const { decoded, expired } = decode(accessToken);

	if (decoded) {
		// @ts-ignore
		req.user = decoded;
		return next();
	}
	if (expired) {
		return res.status(401).send("Token expired");
	}
	return next();
};

export default deserializeUser;
