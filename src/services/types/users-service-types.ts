import { ApiError } from "./api-error-response";

export interface GetUserPayload {
    page?: number;
    per_page?: number;
    email?: string;
    photo?: string;
    name?: string;
    birthday?: string;
    github?: string;
    lattes?: string;
    telephone?: string;
    scholarship_id?: number;
}

export interface CreateUserPayload {
    email: string;
    photo: string;
    name: string;
}

export interface GetUniqueUserPayload {
    id: number;
}

export interface UpdateUserPayload {
    email?: string;
    photo?: string;
    name?: string;
    birthday?: string;
    github?: string;
    lattes?: string;
    telephone?: string;
    scholarship_id?: number;
    id: number;
}

export interface DeleteUserPayload {
    id: number;
}

export interface User {
    id: number;
    email: string;
    photo: string;
    name: string;
    birthday: string;
    github: string;
    lattes: string;
    telephone: string;
    scholarship: {
        id: number,
        name: string
    }
}

interface Users {
    page: number;
    total_items: number;
    next: number;
    prev: number;
    pages_quantity: number;
    per_page: number;
    data: User[];
}

export type GetUsersResponse = Users | ApiError;

export type CreateUserResponse = void | ApiError;

export type GetUniqueUserResponse = User | ApiError;

export type UpdateUserResponse = void | ApiError;

export type DeleteUserResponse = void | ApiError;
