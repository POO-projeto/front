import { ApiError } from "./api-error-response";

interface Scholarship {
    id: number
    name: string
}

export interface GetUniqueScholarshipPayload {
    id: number
}

export type GetScholarshipsResponse = Scholarship[] | ApiError;

export type GetUniqueScholarshipResponse = Scholarship | ApiError;