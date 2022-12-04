import { Request } from "express";

interface UserDetails {
	hash: string;
	salt: string;
}

export interface UserInfoRequest extends Request {
	user?: UserDetails;
}
