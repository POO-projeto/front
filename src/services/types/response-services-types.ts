import {
    CreateDailyResponse,
    DeleteDailyResponse,
    GetDailiesResponse,
    GetUniqueDailyResponse,
    PutDailyResponse,
    UpdateDailyResponse,
} from "./dailies-service-types";

import {
    CreateItemResponse,
    DeleteItemResponse,
    GetItemsResponse,
    GetUniqueItemResponse,
    UpdateItemResponse,
} from "./items-service-types";
import { GetUserInfo } from "./login-service-types";

import { ProjectsServiceResponses } from "./projects-service-types";
import { GetUniqueScholarshipResponse } from "./scholarships-types";

import {
    CreateUserResponse,
    DeleteUserResponse,
    GetUniqueUserResponse,
    GetUsersResponse,
    UpdateUserResponse,
} from "./users-service-types";

export type ServiceResponses = {
    DailiesServiceResponses: {
        GetDailiesResponse: GetDailiesResponse;
        GetUniqueDailyResponse: GetUniqueDailyResponse;
        CreateDailyResponse: CreateDailyResponse;
        PutDailyResponse: PutDailyResponse;
        UpdateDailyResponse: UpdateDailyResponse;
        DeleteDailyResponse: DeleteDailyResponse;
    };

    ItemsServiceResponses: {
        GetItemsResponse: GetItemsResponse;
        CreateItemResponse: CreateItemResponse;
        GetUniqueItemResponse: GetUniqueItemResponse;
        UpdateItemResponse: UpdateItemResponse;
        DeleteItemResponse: DeleteItemResponse;
    };

    LoginServiceResponses: {
        GetUserInfo: GetUserInfo;
    };
    UsersServiceResponses: {
        GetUsersResponse: GetUsersResponse;
        CreateUserResponse: CreateUserResponse;
        GetUniqueUserResponse: GetUniqueUserResponse;
        UpdateUserResponse: UpdateUserResponse;
        DeleteUserResponse: DeleteUserResponse;
    };

    ScholarshipsServiceResponses: {
        GetUniqueScholarshipResponse: GetUniqueScholarshipResponse;
    };

    ProjectsServiceResponses: ProjectsServiceResponses;
};
