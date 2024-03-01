import { createSlice } from "@reduxjs/toolkit";
import api from '../../api/mock/searchApi';

export const search = (filter) => {
    return {
        api: async () => api.search(filter),
        action: set,
        message: {
            error: "Не удалось выполнить поиск",
        },
    }
}

const searchSlice = createSlice({
    name: "search",
    initialState: null,
    reducers: {
        set: (state, action) => {
            return action.payload;
        },
    },
})

const { set } = searchSlice.actions;

export const selectData = state => state.search;

export default searchSlice.reducer;