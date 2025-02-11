import { AuthAxios } from "./auth-axios";
import { ServicePayloads } from "./types/payloads-services-types";

type ProjectsServicePayloads = ServicePayloads["ProjectsPayloads"];

export const projectsService = {
    getProjects: (payload: ProjectsServicePayloads["GetProjectsPayload"]) =>
        AuthAxios.get("/project", {
            params: {
                page: payload.page,
                per_page: payload.per_page,
                name: payload.name,
                description: payload.description,
                end_date: payload.end_date,
            },
        }),

    createProject: (
        payload: ProjectsServicePayloads["CreateProjectPayload"]
    ) => {
        if (payload.end_date) {
            return AuthAxios.post("/project", {
                name: payload.name,
                description: payload.description,
                start_date: payload.start_date,
                end_date: payload.end_date,
            });
        }

        return AuthAxios.post("/project", {
            name: payload.name,
            description: payload.description,
            start_date: payload.start_date,
        });
    },

    getUniqueProject: (
        payload: ProjectsServicePayloads["GetUniqueProjectPayload"]
    ) => AuthAxios.get(`/project/${payload.id}`),

    updateProject: (
        payload: ProjectsServicePayloads["UpdateProjectPayload"]
    ) => {
        if (payload.end_date) {
            return AuthAxios.patch(`/project/${payload.id}`, null, {
                params: {
                    name: payload.name,
                    description: payload.description,
                    end_date: payload.end_date,
                },
            });
        }
        return AuthAxios.patch(`/project/${payload.id}`, null, {
            params: {
                name: payload.name,
                description: payload.description,
            },
        });
    },

    deleteProject: (payload: ProjectsServicePayloads["DeleteProjectPayload"]) =>
        AuthAxios.delete(`/project/${payload.id}`),
};
