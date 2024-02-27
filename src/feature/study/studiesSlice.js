import { createSlice } from '@reduxjs/toolkit';
import api from '../../api/mock/studyApi';

export const fetchStudies = () => {
    return {
        api: api.getAll,
        action: setStudies,
        message: {
            error: "Не удалось получить список исследований",
        },
    }
}

export const addComment = (key, comment) => {
    return {
        api: async () => {
            await api.postComment(key, comment);
            const newStudy = await api.getById(key);
            return newStudy;
        },
        action: editStudy,
        message: {
            success: "Комментарий добавлен",
            error: "Не удалось добавить комментарий к исследованию",
        },
    }
}

const studiesSlice = createSlice({
    name: 'study',
    initialState: {
        list: null,
        current: null,
        info: null,
    },
    reducers: {
        setStudies: (state, action) => {
            return {
                ...state,
                list: action.payload
            }
        },
        editStudy: (state, action) => {
            return {
                ...state,
                list: state.list.filter(item => item.key !== item.payload.key).concat(item.payload),
            }
        },
    },
})

export const { setStudies } = studiesSlice.actions;

export const selectAll = (state) => state.study.list;

export default studiesSlice.reducer;