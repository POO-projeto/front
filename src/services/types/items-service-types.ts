import { ApiError } from "./api-error-response";

export interface GetItemsPayload {
    description?: string;
    task_id?: number;
    daily_id?: number;
}

export interface CreateItemPayload {
    description: string;
    task_id: number;
    daily_id: number;
}

export interface GetUniqueItemPayload {
    id: number;
}

export interface UpdateItemPayload {
    description?: string;
    task_id?: number;
    daily_id?: number;
    id: number;
}

export interface DeleteItemPayload {
    id: number;
}

interface Item {
    id: number
    description: string
    task_id: number
    daily_id: number
}

export type GetItemsResponse = Item[] | ApiError;

export type CreateItemResponse = void | ApiError;

export type GetUniqueItemResponse = Item | ApiError;

export type UpdateItemResponse = void | ApiError;

export type DeleteItemResponse = void | ApiError;