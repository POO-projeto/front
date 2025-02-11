import { ApiError } from "./api-error-response";

interface GetProjectsPayload {
    page: number;
    per_page: number;
    name: string;
    description: string;
    end_date: string;
}

interface CreateProjectPayload {
    name: string;
    description: string;
    start_date: string;
    end_date: string;
}

interface GetUniqueProjectPayload {
    id: number;
}

interface UpdateProjectPayload {
    id: number;
    name: string;
    description: string;
    end_date?: string;
}

interface DeleteProjectPayload {
    id: number;
}

export interface ProjectsServicePayloads {
    GetProjectsPayload: GetProjectsPayload;
    CreateProjectPayload: CreateProjectPayload;
    GetUniqueProjectPayload: GetUniqueProjectPayload;
    UpdateProjectPayload: UpdateProjectPayload;
    DeleteProjectPayload: DeleteProjectPayload;
}

export interface Project {
    id: number;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
}
interface Projects {
    page: number;
    total_items: number;
    next: number;
    prev: number;
    pages_quantity: number;
    per_page: number;
    data: Project[]
}

type GetProjectsResponse = Projects | ApiError;

type CreateProjectResponse = void | ApiError;

type GetUniqueProjectResponse = Project | ApiError;

type UpdateProjectResponse = void | ApiError;

type DeleteProjectResponse = void | ApiError;

export type ProjectsServiceResponses = {
    GetProjectsResponse: GetProjectsResponse;
    CreateProjectResponse: CreateProjectResponse;
    GetUniqueProjectResponse: GetUniqueProjectResponse;
    UpdateProjectResponse: UpdateProjectResponse;
    DeleteProjectResponse: DeleteProjectResponse;
};
