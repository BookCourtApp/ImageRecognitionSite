import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import recognitionService from "../service/recognitionService";

const initialState = {
    status: null,
    error: null,
    image: '',
    markups: [],
    currentIndex: null,
    selectedBooks: [],
    searchValue: '',
}

export const getMarkups = createAsyncThunk(
    'recognition/getMarkups',
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState().recognition;
            const photo = state.image;
            console.log('img', photo)
            const response = await recognitionService.getMarkups(photo);
            console.log(response)
            if (!response.status === 200) {
                throw new Error('Request failed with status ' + response.status);
            }
            const data = await response.data.result;
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);


export const RecognitionSlice = createSlice({
    name: 'recognition',
    initialState,
    reducers: {
        setImage(state, action) {
            state.image = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
        setCurrentIndex(state, action) {
            state.currentIndex = action.payload;
        },
        setSelectedTextIndex(state, action) {
            const {bookIndex, selectedTextIndex} = action.payload;
            state.markups[bookIndex].selectedTextIndex = selectedTextIndex;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMarkups.pending, (state) => {
                state.status = 'pending';
                state.error = null;
            })
            .addCase(getMarkups.fulfilled, (state, action) => {
                state.status = 'fulfilled';
                state.markups = action.payload;
            })
            .addCase(getMarkups.rejected, (state, action) => {
                console.log(action.payload)
                state.status = 'error';
            });
    }

})

export const {
    setImage,
    setStatus,
    setCurrentIndex,
    setSelectedTextIndex
} = RecognitionSlice.actions;
export default RecognitionSlice.reducer;