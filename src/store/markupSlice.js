import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import markupService from "../service/markupSerivce";

const initialState = {
    isReady: false,
    status: null,
    error: null,
    image: '',
    markupType: 0,
    savedMarkups: [],
    currentBook: {
        //x1,y1,x2,y2,x3,y3,x4,y4
    },
    currentTexts: [
        // {text, x1,y1,x2,y2,x3,y3,x4,y4}
    ],
    currentCords: {
        //x1,y1,x2,y2,x3,y3,x4,y4
    }
};

export const postMarkups = createAsyncThunk(
    'markups/postMarkups',
    async function (_, thunkAPI) {
        try {
            const markups = thunkAPI.getState().markups;
            const {image, savedMarkups} = markups;
            const result = {image, markups: [...savedMarkups]}

            const response = await markupService.postMarkups(result);
            return await response.json();
        } catch (err) {
            return thunkAPI.rejectWithValue();
        }

    }
);

export const markSlice = createSlice({
    name: 'mark',
    initialState,
    reducers: {
        setImage(state, action) {
            state.image = action.payload;
        },
        setMarkupType(state, action) {
            state.markupType = action.payload;
            state.currentCords = {};
        },

        setCurrentCords(state, action) {
            state.currentCords = action.payload;
        },

        setCurrentBook(state, action) {
            state.currentBook = state.currentCords
            state.currentCords = {};
        },
        setCurrentTexts(state, action) {
            const newText = {...state.currentCords, text: action.payload}
            state.currentTexts.push(newText)

            state.currentCords = {};
        },
        saveCurrentMarkup(state, action) {
            const newMarkup = {
                ...state.currentBook,
                texts: state.currentTexts
            }
            state.savedMarkups.push(newMarkup)

            state.currentBook = {};
            state.currentTexts = [];
        },
        deleteMarkup(state, action) {
            const index = action.payload
            state.savedMarkups.splice(index, 1);
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(postMarkups.pending, (state) => {
                state.status = 'pending'
                state.error = null;
            })
            .addCase(postMarkups.fulfilled, (state, action) => {
                state = initialState;
                state.status = 'fulfilled';
            })
            .addCase(postMarkups.rejected, (state, action) => {
                state.status = 'error'
            });
    }
})


export const {
    setImage,
    setMarkupType,
    setCurrentCords,
    setCurrentBook,
    setCurrentTexts,
    saveCurrentMarkup,
    deleteMarkup

} = markSlice.actions;
export default markSlice.reducer;