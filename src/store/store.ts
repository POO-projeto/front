import { createStore, } from "easy-peasy";
import { StoreModel, storeModel } from "../model/storeModel";

export const store = createStore<StoreModel>(storeModel);
