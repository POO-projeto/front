import { AuthAxios } from "./auth-axios";
import { ServicePayloads } from "./types/payloads-services-types";

type ScholarshipServicePayloads = ServicePayloads["ScholarshipsPayloads"]

export const scholarshipService = {
    getScholarships: () => AuthAxios.get("/scholarship"),

    getUniqueScholarship: (payload: ScholarshipServicePayloads["GetUniqueScholarshipPayload"]) =>
        AuthAxios.get(`/scholarship/${payload.id}`)
}