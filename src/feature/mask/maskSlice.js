import { createSlice } from '@reduxjs/toolkit';
import api from '../../api/mock/maskApi';

export const fetchMask = path => {
    return {
        api: async () => api.getMask(path),
        action: setResult,
        message: {
            error: "Не удалось обработать снимок",
        }
    }
}

const maskSlice = createSlice({
    name: 'mask',
    initialState: {},
    reducers: {
        setResult: (state, action) => {
            return action.payload
        }
    },
})

export const { setResult } = maskSlice.actions;

export const selectResult = (state) => state.mask;

export default maskSlice.reducer;