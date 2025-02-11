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

type DailiesServiceResponses = ServiceResponses["DailiesServiceResponses"];
type Daily = DailiesServiceResponses["GetUniqueDailyResponse"];
type DailyServicePayloads = ServicePayloads["DailyServicePayloads"];
type GetUniqueDailyPayload = DailyServicePayloads["GetUniqueDailyPayload"];
type GetDailiesPayload = DailyServicePayloads["GetDailiesPayload"];
type CreateDailyPayload = DailyServicePayloads["CreateDailyPayload"];
type PutDailyPayload = DailyServicePayloads["PutDailyPayload"];
type UpdateDailyPayload = DailyServicePayloads["UpdateDailyPayload"];
type DeleteDailyPayload = DailyServicePayloads["DeleteDailyPayload"];

interface DailyModelState {
    dailies: Daily[] | null;
    count: number;
    selectedDaily: Daily | null;
    error: string | null;
    loading: boolean;
}

export interface DailyModel extends DailyModelState {
    setDailies: Action<DailyModel, Daily[]>;
    setCount: Action<DailyModel, number>;
    setSelectedDaily: Action<DailyModel, Daily | null>;
    setError: Action<DailyModel, string | null>;
    setLoading: Action<DailyModel, boolean>;

    getDailies: Thunk<DailyModel, GetDailiesPayload>;
    getUniqueDaily: Thunk<DailyModel, GetUniqueDailyPayload>;
    createDaily: Thunk<DailyModel, CreateDailyPayload>;
    putDaily: Thunk<DailyModel, PutDailyPayload>;
    updateDaily: Thunk<DailyModel, UpdateDailyPayload>;
    deleteDaily: Thunk<DailyModel, DeleteDailyPayload>;
}

export const dailyModel: DailyModel = {
    dailies: null,
    count: 0,
    selectedDaily: null,
    error: null,
    loading: false,

    setDailies: action((state, dailies) => {
        state.dailies = dailies;
    }),

    setCount: action((state, count) => {
        state.count = count;
    }),

    setSelectedDaily: action((state, daily) => {
        state.selectedDaily = daily;
    }),

    setError: action((state, error) => {
        state.error = error;
    }),

    setLoading: action((state, loading) => {
        state.loading = loading;
    }),

    getDailies: thunk(async (actions, payload) => {
        actions.setLoading(true);
        try {
            const response = await services.dailyService.getDailies({
                page: payload.page,
                per_page: payload.per_page,
                user_id: payload.user_id,
                date: payload.date
            });
            actions.setCount(response.data.total_items);
            actions.setDailies(response.data.data);
        } catch (error) {
            actions.setError(handleError(error));
        }
        actions.setLoading(false);
    }),

    getUniqueDaily: thunk(async (actions, payload) => {
        actions.setLoading(true);
        try {
            const response = await services.dailyService.getUniqueDaily(payload);
            actions.setSelectedDaily(response.data);
        } catch (error) {
            actions.setError(handleError(error));
        }
        actions.setLoading(false);
    }),

    createDaily: thunk(async (actions, payload) => {
        actions.setLoading(true);
        try {
            await services.dailyService.createDaily(payload);
        } catch (error) {
            actions.setError(handleError(error));
        }
        actions.setLoading(false);
    }),

    putDaily: thunk(async (actions, payload) => {
        actions.setLoading(true);
        try {
            await services.dailyService.putDaily({
                id: payload.id,
                items: payload.items,
                issue: payload.issue
            });
        } catch (error) {
            actions.setError(handleError(error));
        }
        actions.setLoading(false);
    }),

    updateDaily: thunk(async (actions, payload) => {
        actions.setLoading(true);
        try {
            await services.dailyService.updateDaily(payload);
        } catch (error) {
            actions.setError(handleError(error));
        }
        actions.setLoading(false);
    }),

    deleteDaily: thunk(async (actions, payload) => {
        actions.setLoading(true);
        try {
            await services.dailyService.deleteDaily(payload);
        } catch (error) {
            actions.setError(handleError(error));
        }
        actions.setLoading(false);
    })
};
