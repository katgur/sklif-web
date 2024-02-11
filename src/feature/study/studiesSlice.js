import { createSlice } from '@reduxjs/toolkit';
import api from '../../api/mock/studyApi';

export const fetchStudies = () => {
    return dispatch => {
        api.getAll()
            .then(studies => {
                dispatch(setStudies(studies));
            })
            .catch(error => {
                dispatch(addError(`Не удалось получить список исследований${error.response ? `: ${error.response.data.error}` : ""}`))
            })
    }
}

export const fetchStudy = (key) => {
    return dispatch => {
        api.getById(key)
            .then(study => {
                dispatch(setCurrent(study));
            })
            .catch(error => {
                dispatch(addError(`Не удалось получить данные исследования${error.response ? `: ${error.response.data.error}` : ""}`))
            })
    }
}

export const fetchInfo = (key) => {
    return dispatch => {
        api.getById(key)
            .then(info => {
                dispatch(setInfo(info));
            })
            .catch(error => {
                dispatch(addError(`Не удалось получить данные исследования${error.response ? `: ${error.response.data.error}` : ""}`))
            })
    }
}

export const addComment = (comment) => {
    return dispatch => {
        api.postComment(comment)
            .then(() => {
                dispatch(setCommentAdded());
            })
            .catch(error => {
                dispatch(addError(`Не удалось добавить комментарий к исследованию${error.response ? `: ${error.response.data.error}` : ""}`))
            })
    }
}

const studiesSlice = createSlice({
    name: 'study',
    initialState: {
        list: [],
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
        setCurrent: (state, action) => {
            return {
                ...state,
                current: action.payload
            }
        },
        resetCurrent: (state, action) => {
            return {
                ...state,
                current: null
            }
        },
        setInfo: (state, action) => {
            return {
                ...state,
                info: action.payload
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

export const { resetCurrent, resetCommentAdded, setCurrent, setInfo, setStudies } = studiesSlice.actions;

export const selectAll = (state) => state.study.list;
export const selectInfo = (state) => state.study.info;
export const selectCurrent = (state) => state.study.current;
export const selectCommentAdded = (state) => state.study.commentAdded;

export default studiesSlice.reducer;