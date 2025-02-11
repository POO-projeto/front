import { AuthAxios } from "./auth-axios";
import { ServicePayloads } from "./types/payloads-services-types";

type UsersServicePayloads = ServicePayloads["UsersServicePayloads"];

export const usersService = {
    getUser: (payload: UsersServicePayloads["GetUserPayload"]) => AuthAxios.get("/user", {
        params: {
            ...payload
        }
    }),
    
    createUser: (payload: UsersServicePayloads["CreateUserPayload"]) => AuthAxios.post("/user", {
        ...payload
    }),

    getUniqueUser: (payload: UsersServicePayloads["GetUniqueUserPayload"]) => 
        AuthAxios.get(`/user/${payload.id}`),

    updateUser: (payload: UsersServicePayloads["UpdateUserPayload"]) => 
        AuthAxios.patch(`/user/${payload.id}`, null, {
            params: {
                email: payload.email,
                photo: payload.photo,
                name: payload.name,
                birthday: payload.birthday,
                github: payload.github,
                lattes: payload.lattes,
                telephone: payload.telephone,
                scholarship_id: payload.scholarship_id
            }
        }),
    
    deleteUser: (payload: UsersServicePayloads["DeleteUserPayload"]) => 
        AuthAxios.delete(`/user/${payload.id}`)
}