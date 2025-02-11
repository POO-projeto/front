import { AuthAxios } from "./auth-axios";

export const loginService = {
    login: () => AuthAxios.get("/auth/login"),

    loginCallback: () => AuthAxios.get("/auth/callback"),

    loginInfo: () => AuthAxios.get("/auth/info"),
}