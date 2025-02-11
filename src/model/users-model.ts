import { action, Action, Thunk, thunk } from "easy-peasy";
import { ServiceResponses } from "../services/types/response-services-types";
import { ServicePayloads } from "../services/types/payloads-services-types";
import { services } from "../services/services";

function handleError(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }
    return "Ocorreu um erro desconhecido.";
}

const usersService = services.usersService;

type UsersServiceResponses = ServiceResponses["UsersServiceResponses"];
type User = UsersServiceResponses["GetUniqueUserResponse"];
type UsersServicePayloads = ServicePayloads["UsersServicePayloads"];
type GetUserPayload = UsersServicePayloads["GetUserPayload"]
type CreateUserPayload = UsersServicePayloads["CreateUserPayload"]
type UpdateUserPayload = UsersServicePayloads["UpdateUserPayload"]
type DeleteUserPayload = UsersServicePayloads["DeleteUserPayload"]
type GetUniqueUserPayload = UsersServicePayloads["GetUniqueUserPayload"]

interface UsersModelState {
    users: User[];
    count: number
    selectedUser: User | null;
    error: string | null;
    loading: boolean;
}

export interface UsersModel extends UsersModelState {
    setUsers: Action<UsersModel, User[]>;
    setCount: Action<UsersModel, number>;
    setSelectedUser: Action<UsersModel, User | null>;
    setError: Action<UsersModel, string | null>;
    setLoading: Action<UsersModel, boolean>;

    getUsers: Thunk<UsersModel, GetUserPayload>;
    createUser: Thunk<UsersModel, CreateUserPayload>;
    getUniqueUser: Thunk<UsersModel, GetUniqueUserPayload>;
    updateUser: Thunk<UsersModel, UpdateUserPayload>;
    deleteUser: Thunk<UsersModel, DeleteUserPayload>;
}

export const usersModel: UsersModel = {
    users: [],
    count: 0,
    selectedUser: null,
    error: null,
    loading: false,

    setUsers: action((state, users) => {
        state.users = users;
    }),
    
    setCount: action((state, count) => {
        state.count = count;
    }),

    setSelectedUser: action((state, user) => {
        state.selectedUser = user;
    }),

    setError: action((state, error) => {
        state.error = error;
    }),

    setLoading: action((state, loading) => {
        state.loading = loading;
    }),

    getUsers: thunk(async (actions, payload) => {
        actions.setLoading(true);
        try {
            const response = await usersService.getUser({
                page: payload.page,
                per_page: payload.per_page,
                name: payload.name,
                email: payload.email,
                photo: payload.photo,
                birthday: payload.birthday,
                github: payload.github,
                lattes: payload.lattes,
                telephone: payload.telephone,
                scholarship_id: payload.scholarship_id,
            });
            actions.setCount(response.data.total_items);
            actions.setUsers(response.data.data);
        } catch (error) {
            actions.setError(handleError(error));
        }
        actions.setLoading(false);
    }),

    createUser: thunk(async (actions, payload) => {
        try {
            await usersService.createUser(payload);
        } catch (error) {
            actions.setError(handleError(error));
        }
    }),

    getUniqueUser: thunk(async (actions, payload) => {
        actions.setLoading(true);
        try {
            const response = await usersService.getUniqueUser(payload);
            actions.setSelectedUser(response.data);
        } catch (error) {
            actions.setError(handleError(error));
        }
        actions.setLoading(false);
    }),

    updateUser: thunk(async (actions, payload) => {
        try {
            await usersService.updateUser(payload);
        } catch (error) {
            actions.setError(handleError(error));
        }
    }),

    deleteUser: thunk(async (actions, payload) => {
        try {
            await usersService.deleteUser(payload);
        } catch (error) {
            actions.setError(handleError(error));
        }
    })
};
