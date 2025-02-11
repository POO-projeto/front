import { thunk, action, Thunk, Action, computed, Computed, } from "easy-peasy";
import { services } from "../services/services";
import { ServiceResponses } from "../services/types/response-services-types";

type LoginServiceResponses = ServiceResponses["LoginServiceResponses"];
type User = LoginServiceResponses["GetUserInfo"];

interface LoginModelState {
    user: User | null;
    token: string | null;
    error: string | null;
    loading: boolean
}

export interface LoginModel extends LoginModelState {
    isAuthenticated: Computed<LoginModel, boolean>;
    setUser: Action<LoginModel, User | null>;
    setToken: Action<LoginModel, string | null>;
    setError: Action<LoginModel, string | null>;
    logout: Thunk<LoginModel>;
    setLoading: Action<LoginModel, boolean>;
    setIsAuthenticated: Action<LoginModel, boolean>;

    loginCallback: Thunk<LoginModel, string>;
    login: Thunk<LoginModel, void>;
    fetchUserInfo: Thunk<LoginModel, void>;
}

function handleError(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }

    return "Ocorreu um erro desconhecido.";
  }

export const loginModel: LoginModel = {
    user: null,
    token: localStorage.getItem("jwt"),
    error: null,
    isAuthenticated: computed(state => !!state.token),
    loading: false,

    setUser: action((state, user) => {
        state.user = user;
    }),

    setToken: action((state, token) => {
        state.token = token;
    }),

    setError: action((state, error) => {
        state.error = error;
    }),

    setLoading: action((state, payload) => {
        state.loading = payload;
    }),

    setIsAuthenticated: action((state, payload) => {
        state.isAuthenticated = payload
    }),

    logout: thunk(async (actions) => {
        actions.setUser(null);
        actions.setToken(null);
        localStorage.removeItem("jwt");
        actions.setError(null);
        window.location.href = "/";
    }),

    login: thunk(async (actions) => {
        actions.setLoading(true);
        try {
            const response = await services.loginService.login();
            window.location.replace(response.data.authorization_url);
        } catch (error) {
            actions.setError(handleError(error));
        }
        actions.setLoading(false);
    }),

    loginCallback: thunk(async (actions, payload) => {
        actions.setLoading(true);
        try {
            actions.setToken(payload);
            localStorage.setItem("jwt", payload);
        } catch (error) {
            actions.setError(handleError(error));
        }
        actions.setLoading(false);
    }),

    fetchUserInfo: thunk(async (actions) => {
        actions.setLoading(true);
        try {
            const response = await services.loginService.loginInfo();
            actions.setUser(response.data);
        } catch (error) {
            actions.setError(handleError(error));
        }
        actions.setLoading(false);
    }),
};
