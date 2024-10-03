import { configureStore } from "@reduxjs/toolkit";
import ContactReducer, { fetchSensors } from "../slices/ContactSlice";
import ThemeReducer from "../slices/ThemeSlice";
import UiReducer from "../slices/UiSlice";

export const store = configureStore({
    reducer: {
        contacts: ContactReducer,         
        theme: ThemeReducer,
        ui: UiReducer
    }
});

store.dispatch(fetchSensors());
