import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMask, getResults } from '../../api/mock/maskApi';

export const fecthMask = createAsyncThunk('mask/fetch', async (params, thunk) => {
    if (!thunk.getState().mask.maskRequested) {
        return getMask()
    } else {
        return getResults()
    }
})

const maskSlice = createSlice({
    name: 'mask',
    initialState: {
        status: {
            message: undefined,
            code: undefined,
        },
        result: {
            url: undefined,
            volume: undefined,
        },
        progress: false,
        maskRequested: false,
    },
    reducers: {
        resetStatus: (state, action) => {
            state.status = {
                message: undefined,
                code: undefined,
            }
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fecthMask.fulfilled, (state, action) => {
                state.progress = false;
                var response = action.payload;
                if (!response.status) {
                    state.status = {
                        message: "Запрос на обработку отправлен",
                        code: 3,
                    }
                    state.maskRequested = true;
                } else if (response.status === 'IN_PROGRESS') {
                    state.status = {
                        message: `Обработано ${response.percentage}% снимков`,
                        code: 1,
                    }
                } else if (response.status === 'READY') {
                    state.status = {
                        message: 'Обработка снимков завершена',
                        code: 3,
                    }
                    state.result = {
                        url: response.key,
                        volume: response.totalVolume,
                    }
                }
            })
            .addCase(fecthMask.pending, (state, action) => {
                state.progress = true;
            })
            .addCase(fecthMask.rejected, (state, action) => {
                state.status = {
                    message: `Не удалось получить данные обработки${action.payload.message}`,
                    code: action.payload.code,
                }
                state.progress = false;
            })
    }
})

export const { resetStatus } = maskSlice.actions;

export const selectStatus = (state) => state.mask.status;
export const selectResult = (state) => state.mask.result;
export const selectProgress = (state) => state.mask.progress;
export const selectMaskRequested = (state) => state.mask.maskRequested;

export default maskSlice.reducer;