import { action, Action, thunk, Thunk } from "easy-peasy";
import { ServiceResponses } from "../services/types/response-services-types";
import { ServicePayloads } from "../services/types/payloads-services-types";
import { services } from "../services/services";

type ProjectsServiceResponses = ServiceResponses["ProjectsServiceResponses"]
type Project = ProjectsServiceResponses["GetUniqueProjectResponse"]
type ProjectsPayloads = ServicePayloads["ProjectsPayloads"]
type GetProjectsPayload = ProjectsPayloads["GetProjectsPayload"]
type CreateProjectsPayload = ProjectsPayloads["CreateProjectPayload"]
type GetUniqueProjectPayload = ProjectsPayloads["GetUniqueProjectPayload"]
type UpdateProjectPayload = ProjectsPayloads["UpdateProjectPayload"]
type DeleteProjectPayload = ProjectsPayloads["DeleteProjectPayload"]

interface ProjectsModelState {
    countProjects: number
    projects: Project[] | null;
    selectedProject: Project | null;
    error: string | null;
    loading: boolean;
}

export interface ProjectsModel extends ProjectsModelState {
    setProjects: Action<ProjectsModel, Project[]>;
    setCountProjects: Action<ProjectsModel, number>;
    setSelectedProject: Action<ProjectsModel, Project | null>;
    setError: Action<ProjectsModel, string | null>;
    setLoading: Action<ProjectsModel, boolean>;

    getProjects: Thunk<ProjectsModel, GetProjectsPayload>;
    createProject: Thunk<ProjectsModel, CreateProjectsPayload>;
    getUniqueProject: Thunk<ProjectsModel, GetUniqueProjectPayload>;
    updateProject: Thunk<ProjectsModel, UpdateProjectPayload>;
    deleteProject: Thunk<ProjectsModel, DeleteProjectPayload>;
}

function handleError(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }

    return "Ocorreu um erro desconhecido.";
  }

export const projectsModel: ProjectsModel = {
    projects: [],
    countProjects: 0,
    selectedProject: null,
    error: null,
    loading: false,

    setProjects: action((state, projects) => {
        state.projects = projects;
    }),
    
    setCountProjects: action((state, projects) => {
        state.countProjects = projects;
    }),

    setSelectedProject: action((state, project) => {
        state.selectedProject = project;
    }),

    setError: action((state, error) => {
        state.error = error;
    }),

    setLoading: action((state, loading) => {
        state.loading = loading;
    }),

    getProjects: thunk(async (actions, payload) => {
        actions.setLoading(true);
        try {
            const response = await services.projectsService.getProjects({
                page: payload.page,
                per_page: payload.per_page,
                name: payload.name,
                description: payload.description,
                end_date: payload.end_date,
            });
            actions.setCountProjects(response.data.total_items)
            actions.setProjects(response.data.data);
        } catch (error) {
            actions.setError(handleError(error));
        }
        actions.setLoading(false);
    }),

    createProject: thunk(async (actions, payload) => {
        actions.setLoading(true);
        try {
            await services.projectsService.createProject({
                name: payload.name,
                description: payload.description,
                start_date: payload.start_date,
                end_date: payload.end_date,
            });
            
        } catch (error) {
            actions.setError(handleError(error));
        }
        actions.setLoading(false);
    }),
    
    getUniqueProject: thunk(async (actions, payload) => {
        actions.setLoading(true);
        try {
            const response = await services.projectsService.getUniqueProject({...payload});
            actions.setSelectedProject(response.data);
        } catch (error) {
            actions.setError(handleError(error));
        }
        actions.setLoading(false);
    }),

    updateProject: thunk(async (actions, payload) => {
        try {
            await services.projectsService.updateProject({
                id: payload.id,
                name: payload.name,
                description: payload.description,
                end_date: payload.end_date
            });
        } catch (error) {
            actions.setError(handleError(error));
        }
    }),

    deleteProject: thunk(async (actions, payload) => {
        try {
            await services.projectsService.deleteProject({...payload});
        } catch (error) {
            actions.setError(handleError(error));
        }
    })
};