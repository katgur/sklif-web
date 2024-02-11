import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteDirectory, deleteFile, getFiles, postDirectory, postFile } from '../../api/mock/storageApi';

export const fetchFiles = createAsyncThunk('files/get', async (params, thunk) => {
    return await getFiles();
})

export const addFile = createAsyncThunk('file/add', async (params, thunk) => {
    return await postFile(params);
})

export const removeFile = createAsyncThunk('file/delete', async (params, thunk) => {
    return await deleteFile(params);
})

export const addDirectory = createAsyncThunk('file/dir', async (params, thunk) => {
    return await postDirectory(params);
})

export const removeDirectory = createAsyncThunk('dir/delete', async (params, thunk) => {
    return await deleteDirectory(params);
})

const storageSlice = createSlice({
    name: 'storage',
    initialState: {
        data: [],
        status: {
            message: undefined,
            code: undefined,
        },
        progress: false,
        current: "",
    },
    reducers: {
        resetStatus: (state, action) => {
            state.status = {
                message: undefined,
                code: undefined,
            }
        },
        setCurrent: (state, action) => {
            state.current = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchFiles.fulfilled, (state, action) => {
                state.data = action.payload;
                state.progress = false;
            })
            .addCase(fetchFiles.rejected, (state, action) => {
                console.log(action)
                state.status = {
                    message: `Не удалось получить список файлов${action.payload.message}`,
                    code: action.payload.code,
                }
                state.progress = false;
            })
            .addCase(addFile.fulfilled, (state, action) => {
                state.status = {
                    message: `Файл загружен`,
                    code: 3,
                }
                state.progress = false;
            })
            .addCase(addFile.rejected, (state, action) => {
                console.log(action)

                state.status = {
                    message: `Не удалось загрузить файл${action.payload.message}`,
                    code: action.payload.code,
                }
                state.progress = false;
            })
            .addCase(removeFile.fulfilled, (state, action) => {
                state.status = {
                    message: `Файл удален`,
                    code: 3,
                }
                state.progress = false;
            })
            .addCase(removeFile.rejected, (state, action) => {
                state.status = {
                    message: `Не удалось удалить файл${action.payload.message}`,
                    code: action.payload.code,
                }
                state.progress = false;
            })
            .addCase(addDirectory.fulfilled, (state, action) => {
                state.status = {
                    message: `Директория создана`,
                    code: 3,
                }
                state.progress = false;
            })
            .addCase(addDirectory.rejected, (state, action) => {
                state.status = {
                    message: `Не удалось создать новую директорию${action.payload.message}`,
                    code: action.payload.code,
                }
                state.progress = false;
            })
            .addCase(removeDirectory.fulfilled, (state, action) => {
                state.status = {
                    message: `Директория удалена`,
                    code: 3,
                }
                state.progress = false;
            })
            .addCase(removeDirectory.rejected, (state, action) => {
                state.status = {
                    message: `Не удалось удалить директорию${action.payload.message}`,
                    code: action.payload.code,
                }
                state.progress = false;
            })
            .addCase(addFile.pending, (state, action) => {
                state.progress = true;
            })
            .addCase(removeFile.pending, (state, action) => {
                state.progress = true;
            })
            .addCase(fetchFiles.pending, (state, action) => {
                state.progress = true;
            })
            .addCase(addDirectory.pending, (state, action) => {
                state.progress = true;
            })
            .addCase(removeDirectory.pending, (state, action) => {
                state.progress = true;
            })
    }
})

export const selectStatus = (state) => state.storage.status;
export const selectAll = (state) => state.storage.data;
export const selectProgress = (state) => state.storage.progress;
export const selectDirectories = (state) => state.storage.data.filter((d) => {
    var path = d.key.split('/');
    return path[path.length - 1] === "";
})
export const selectFiles = (state) => state.storage.data.filter((d) => {
    var path = d.key.split('/');
    return path[path.length - 1] !== "";
})
export const selectCurrentDirectories = (state) => state.storage.data.filter((d) => {
    var path = d.key.split('/');
    return path[path.length - 1] === ""
        && d.key.includes(state.storage.current)
        && d.key.replace(state.storage.current, "").split('/').length === 2;
})
export const selectCurrentFiles = (state) => state.storage.data.filter((d) => {
    var path = d.key.split('/');
    return path[path.length - 1] !== ""
        && d.key.includes(state.storage.current)
        && d.key.replace(state.storage.current, "").split('/').length === 1;
})
export const selectCurrent = (state) => state.storage.current;

export const { resetStatus, setCurrent } = storageSlice.actions;

export default storageSlice.reducer;