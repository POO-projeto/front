import { AuthAxios } from "./auth-axios";
import { ServicePayloads } from "./types/payloads-services-types";

type ItemsServicePayloads = ServicePayloads["ItemsServicePayloads"]

export const itemsService = {
    getItems: (payload: ItemsServicePayloads["GetItemsPayload"]) =>
        AuthAxios.get("/item", {
            params: {
                description: payload.description,
                task_id: payload.task_id,
                daily_id: payload.daily_id
            }
        }),
    
    createItem: (payload: ItemsServicePayloads["CreateItemPayload"]) =>
        AuthAxios.post("/item", {
            description: payload.description,
            task_id: payload.task_id,
            daily_id: payload.daily_id
        }),

    getUniqueItem: (payload: ItemsServicePayloads["GetUniqueItemPayload"]) =>
        AuthAxios.get(`/item/${payload.id}`),

    updateItem: (payload: ItemsServicePayloads["UpdateItemPayload"]) =>
        AuthAxios.patch(`/item/${payload.id}`, {
            description: payload.description,
            task_id: payload.task_id,
            daily_id: payload.daily_id
        }),

    deleteItem: (payload: ItemsServicePayloads["DeleteItemPayload"]) =>
        AuthAxios.delete(`/item/${payload.id}`),
}