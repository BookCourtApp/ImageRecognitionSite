import {configureStore} from "@reduxjs/toolkit";
import markupsReducer from './markupSlice'
export const store = configureStore({
    reducer: {
        markups: markupsReducer
    },
});