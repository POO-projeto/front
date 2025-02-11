import { AxiosResponse } from "axios";
import { AuthAxios } from "./auth-axios";
import { ServicePayloads } from "./types/payloads-services-types";
import { ServiceResponses } from "./types/response-services-types";

type DailyPayloads = ServicePayloads["DailyServicePayloads"];
type DailiesServiceResponses = ServiceResponses["DailiesServiceResponses"];
type APIResponse<T> = Promise<AxiosResponse<T>>;

export const dailyService = {
    getDailies: (
        payload: DailyPayloads["GetDailiesPayload"]
    )  =>
        AuthAxios.get("/daily", {
            params: {
                page: payload.page,
                per_page: payload.per_page,
                user_id: payload.user_id,
                date: payload.date,
            },
        }),

    createDaily: (
        payload: DailyPayloads["CreateDailyPayload"]
    ): APIResponse<DailiesServiceResponses["CreateDailyResponse"]> =>
        AuthAxios.post(`/daily`, {
            date: payload.date,
            items: payload.items,
            issue: payload.issue
        }),

    getUniqueDaily: (
        payload: DailyPayloads["GetUniqueDailyPayload"]
    ): APIResponse<DailiesServiceResponses["GetUniqueDailyResponse"]
    > => AuthAxios.get(`/daily/${payload.id}`),

    putDaily: (
        payload: DailyPayloads["PutDailyPayload"]
    ): APIResponse<DailiesServiceResponses["PutDailyResponse"]> => 
        AuthAxios.put(`/daily/${payload.id}`, {
            issue: payload.issue,
            items: payload.items
        }),

    updateDaily: (
        payload: DailyPayloads["UpdateDailyPayload"]
    ): APIResponse<DailiesServiceResponses["UpdateDailyResponse"]> =>
        AuthAxios.patch(`/daily/${payload.id}`, null, {
            params: {
                team_user_id: payload.team_user_id,
                date: payload.date,
                filter_by: payload.filter_by,
                order_by: payload.order_by,
                weeknum: payload.weeknum,
                monthnum: payload.monthnum,
                team_id: payload.team_id,
            },
        }),

    deleteDaily: (
        payload: DailyPayloads["DeleteDailyPayload"]
    ): APIResponse<DailiesServiceResponses["DeleteDailyResponse"]> =>
        AuthAxios.delete(`/daily/${payload.id}`),
};
