import { ApiError } from "./api-error-response";

export interface GetDailiesPayload {
    page: number;
    per_page: number;
    user_id?: number;
    date?: Date;
}

export interface CreateDailyPayload {
    date: string;
    items: string[];
    issue: string;
}

export interface GetUniqueDailyPayload {
    id: number;
}

export interface PutDailyPayload {
    id: number;
    items: {
        id: number;
        description: string;
    }[];
    issue: string;
}

export interface UpdateDailyPayload {
    team_user_id?: number;
    date?: Date;
    filter_by?: string;
    order_by?: string;
    weeknum?: number;
    monthnum?: number;
    team_id?: number;
    id: number;
}

export interface DeleteDailyPayload {
    id: number;
}

interface UserProfile {
    id: number;
    email: string;
    photo: string;
    name: string;
    birthday: string;
    github: string;
    lattes: string;
    telephone: string;
}

interface Team {
    id: number;
    name: string;
}

interface User {
    id: number;
    type_id: number;
    user: UserProfile;
    team: Team;
}

interface Item {
    id: number;
    description: string;
    task_id: number;
    daily_id: number;
}

interface Daily {
    id: number;
    user: User;
    date: string;
    items: Item[];
    issue: string;
}

interface Dailies {
    page: number;
    total_items: number;
    next: number;
    prev: number;
    pages_quantity: number;
    per_page: number;
    data: Daily[];
}

export type GetDailiesResponse = Dailies | ApiError;

export type GetUniqueDailyResponse = Daily | ApiError;

export type CreateDailyResponse = void | ApiError;

export type PutDailyResponse = void | ApiError;

export type UpdateDailyResponse = void | ApiError;

export type DeleteDailyResponse = void | ApiError;
