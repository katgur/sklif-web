import { createSlice } from '@reduxjs/toolkit';

const progressSlice = createSlice({
    name: 'progress',
    initialState: [],
    reducers: {
        setProgress: (state, action) => {
            return [
                ...state,
                action.payload,
            ]
        },
        resetProgress: (state, action) => {
            return state.filter(item => item !== action.payload);
        },
    },
})

export const { setProgress, resetProgress } = progressSlice.actions;

export const selectIsProgress = (state) => state.progress.length !== 0;

export default progressSlice.reducer;