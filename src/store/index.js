import { configureStore } from "@reduxjs/toolkit";
import ContactReducer, { fetchSensors } from "../slices/ContactSlice";
import GroupsReducer, { fetchGroups } from "../slices/GroupsSlice";
import ThemeReducer from "../slices/ThemeSlice";
import UiReducer from "../slices/UiSlice";

export const store = configureStore({
    reducer: {
        contacts: ContactReducer, 
        groups: GroupsReducer,
        theme: ThemeReducer,
        ui: UiReducer
    }
});

store.dispatch(fetchSensors());
store.dispatch(fetchGroups());
