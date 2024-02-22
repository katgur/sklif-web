import { createSlice } from '@reduxjs/toolkit';
import api from '../../api/mock/studyApi';
import { addError, addSuccess } from '../../feature/notification/notificationSlice';

export const fetchStudies = () => {
    return dispatch => {
        api.getAll()
            .then(studies => {
                dispatch(setStudies(studies));
            })
            .catch(error => {
                dispatch(addError(`Не удалось получить список исследований${error.message ? `: ${error.message}` : ""}`))
            })
    }
}

export const addComment = (key, comment) => {
    return dispatch => {
        api.postComment(key, comment)
            .then(() => {
                dispatch(setCommentAdded());
                dispatch(addSuccess("Комментарий добавлен"))
            })
            .catch(error => {
                dispatch(addError(`Не удалось добавить комментарий к исследованию${error.message ? `: ${error.message}` : ""}`))
            })
    }
}

const studiesSlice = createSlice({
    name: 'study',
    initialState: {
        list: null,
        current: null,
        info: null,
        commentAdded: false,
    },
    reducers: {
        setStudies: (state, action) => {
            return {
                ...state,
                list: action.payload
            }
        },
        setCommentAdded: (state, action) => {
            return {
                ...state,
                commentAdded: true
            }
        },
        resetCommentAdded: (state, action) => {
            return {
                ...state,
                commentAdded: false
            }
        }
    },
})

export const { resetCommentAdded, setStudies, setCommentAdded } = studiesSlice.actions;

export const selectAll = (state) => state.study.list;
export const selectCommentAdded = (state) => state.study.commentAdded;

export default studiesSlice.reducer;