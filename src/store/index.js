import {configureStore} from "@reduxjs/toolkit";
import markupsReducer from './markupSlice'
import recognitionReducer from './recognitionSlice'
export const store = configureStore({
    reducer: {
        markups: markupsReducer,
        recognition:recognitionReducer
    },
});