import { dailyModel, DailyModel } from "./dailies-model";
import { LoginModel, loginModel } from "./login-model";
import { projectsModel, ProjectsModel } from "./projects-model";
import { scholarshipsModel, ScholarshipsModel } from "./scholarship-model";
import { usersModel, UsersModel } from "./users-model";

export interface StoreModel {
    login: LoginModel;
    users: UsersModel;
    scholarships: ScholarshipsModel
    dailies: DailyModel
    projects: ProjectsModel
}

export const storeModel: StoreModel = {
    login: loginModel,
    users: usersModel,
    scholarships: scholarshipsModel,
    dailies: dailyModel,
    projects: projectsModel,
};