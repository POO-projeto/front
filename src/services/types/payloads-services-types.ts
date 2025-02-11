import {
    CreateDailyPayload,
    DeleteDailyPayload,
    GetDailiesPayload,
    GetUniqueDailyPayload,
    PutDailyPayload,
    UpdateDailyPayload,
} from "./dailies-service-types";

import {
    CreateItemPayload,
    DeleteItemPayload,
    GetItemsPayload,
    GetUniqueItemPayload,
    UpdateItemPayload,
} from "./items-service-types";

import {
    CreateUserPayload,
    DeleteUserPayload,
    GetUniqueUserPayload,
    GetUserPayload,
    UpdateUserPayload,
} from "./users-service-types";
import { GetUniqueScholarshipPayload } from "./scholarships-types";
import { ProjectsServicePayloads } from "./projects-service-types";

export type ServicePayloads = {
    DailyServicePayloads: {
        GetDailiesPayload: GetDailiesPayload;
        CreateDailyPayload: CreateDailyPayload;
        GetUniqueDailyPayload: GetUniqueDailyPayload;
        PutDailyPayload: PutDailyPayload;
        UpdateDailyPayload: UpdateDailyPayload;
        DeleteDailyPayload: DeleteDailyPayload;
    };

    ItemsServicePayloads: {
        GetItemsPayload: GetItemsPayload;
        CreateItemPayload: CreateItemPayload;
        GetUniqueItemPayload: GetUniqueItemPayload;
        UpdateItemPayload: UpdateItemPayload;
        DeleteItemPayload: DeleteItemPayload;
    };
    UsersServicePayloads: {
        GetUserPayload: GetUserPayload;
        CreateUserPayload: CreateUserPayload;
        UpdateUserPayload: UpdateUserPayload;
        GetUniqueUserPayload: GetUniqueUserPayload;
        DeleteUserPayload: DeleteUserPayload;
    };
    ScholarshipsPayloads: {
        GetUniqueScholarshipPayload: GetUniqueScholarshipPayload;
    };

    ProjectsPayloads: ProjectsServicePayloads;
};
