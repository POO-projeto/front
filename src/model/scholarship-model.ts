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

type ScholarshipServiceResponses = ServiceResponses["ScholarshipsServiceResponses"];
type Scholarship = ScholarshipServiceResponses["GetUniqueScholarshipResponse"];
type ScholarshipServicePayloads = ServicePayloads["ScholarshipsPayloads"];
type GetUniqueScholarshipPayload = ScholarshipServicePayloads["GetUniqueScholarshipPayload"];

interface ScholarshipsModelState {
    scholarships: Scholarship[];
    selectedScholarship: Scholarship | null;
    error: string | null;
    loading: boolean;
}

export interface ScholarshipsModel extends ScholarshipsModelState {
    setScholarships: Action<ScholarshipsModel, Scholarship[]>;
    setSelectedScholarship: Action<ScholarshipsModel, Scholarship | null>;
    setError: Action<ScholarshipsModel, string | null>;
    setLoading: Action<ScholarshipsModel, boolean>;

    getScholarships: Thunk<ScholarshipsModel, void>;
    getUniqueScholarship: Thunk<ScholarshipsModel, GetUniqueScholarshipPayload>;
}

export const scholarshipsModel: ScholarshipsModel = {
    scholarships: [],
    selectedScholarship: null,
    error: null,
    loading: false,

    setScholarships: action((state, scholarships) => {
        state.scholarships = scholarships;
    }),

    setSelectedScholarship: action((state, scholarship) => {
        state.selectedScholarship = scholarship;
    }),

    setError: action((state, error) => {
        state.error = error;
    }),

    setLoading: action((state, loading) => {
        state.loading = loading;
    }),

    getScholarships: thunk(async (actions) => {
        actions.setLoading(true);
        try {
            const response = await services.scholarshipService.getScholarships();
            actions.setScholarships(response.data);
        } catch (error) {
            actions.setError(handleError(error));
        }
        actions.setLoading(false);
    }),

    getUniqueScholarship: thunk(async (actions, payload) => {
        actions.setLoading(true);
        try {
            const response = await services.scholarshipService.getUniqueScholarship({ id: payload.id });
            actions.setSelectedScholarship(response.data);
        } catch (error) {
            actions.setError(handleError(error));
        }
        actions.setLoading(false);
    })
};
