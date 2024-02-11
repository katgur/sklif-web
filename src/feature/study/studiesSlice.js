import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAll, getById, getInfo, postComment } from '../../api/mock/studyApi';

export const fetchStudies = createAsyncThunk('studies/fetch', async (params, thunk) => {
    return  await getAll();
})

export const fetchStudy = createAsyncThunk('study/fetch', async (params, thunk) => {
    return await getById(params);
})

export const fetchInfo = createAsyncThunk('info/fetch', async (params, thunk) => {
    return await getInfo(params);
})

export const addComment = createAsyncThunk('study/comment', async (params, thunk) =>{
    return await postComment(params);
})

const studiesSlice = createSlice({
    name: 'study',
    initialState: {
        list: undefined,
        current: undefined,
        status: {
            message: undefined,
            code: undefined,
        },
        progress: false,
        info: undefined,
        commentAdded: false,
    },
    reducers: {
        resetStatus: (state, action) => {
            state.status = {
                message: undefined,
                code: undefined,
            }
        },
        resetCurrent: (state, action) => {
            state.current = undefined;
        },
        resetCommentAdded: (state, action) => {
            state.commentAdded = false;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchStudies.fulfilled, (state, action) => {
                state.list = action.payload;
                state.progress = false;
            })
            .addCase(fetchStudies.pending, (state, action) => {
                state.progress = true;
            })
            .addCase(fetchStudies.rejected, (state, action) => {
                state.status = {
                    message: `Не удалось получить данные исследований${action.payload.message}`,
                    code: action.payload.code,
                }
                state.progress = false;
            })
            .addCase(fetchStudy.fulfilled, (state, action) => {
                state.current = action.payload;
                state.progress = false;
            })
            .addCase(fetchStudy.pending, (state, action) => {
                state.progress = true;
            })
            .addCase(fetchStudy.rejected, (state, action) => {
                console.log(action)
                state.status = {
                    message: `Не удалось получить данные исследования${action.payload.message}`,
                    code: action.payload.code,
                }
                state.progress = false;
            })
            .addCase(fetchInfo.fulfilled, (state, action) => {
                state.info = action.payload;
                state.progress = false;
            })
            .addCase(fetchInfo.pending, (state, action) => {
                state.progress = true;
            })
            .addCase(fetchInfo.rejected, (state, action) => {
                state.status = {
                    message: `Не удалось получить данные снимка${action.payload.message}`,
                    code: action.payload.code,
                }
                state.progress = false;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.progress = false;
                state.commentAdded = true;
                state.status = {
                    message: 'Комментарий добавлен',
                    code: 3,
                }
            })
            .addCase(addComment.pending, (state, action) => {
                state.progress = true;
            })
            .addCase(addComment.rejected, (state, action) => {
                console.log(action)
                state.progress = false;
                state.status = {
                    message: `Не удалось добавить комментарий${action.payload.message}`,
                    code: action.payload.code,
                }
            })
    }
})

export const { resetStatus, resetCurrent, resetCommentAdded } = studiesSlice.actions;

export const selectAll = (state) => state.study.list;
export const selectInfo = (state) => state.study.info;
export const selectStatus = (state) => state.study.status;
export const selectCurrent = (state) => state.study.current;
export const selectProgress = (state) => state.study.progress;
export const selectCommentAdded = (state) => state.study.commentAdded;

export default studiesSlice.reducer;