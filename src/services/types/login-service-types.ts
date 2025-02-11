import { ApiError } from "./api-error-response";

export interface User {
    id: number;
    email: string;
    name: string;
    photo: string;
}

export type GetUserInfo = User | ApiError;
