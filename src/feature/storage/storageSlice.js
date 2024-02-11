import { createSlice } from '@reduxjs/toolkit';
import api from '../../api/mock/storageApi';
import { addSuccess } from '../notification/notificationSlice';

export const fetchFiles = () => {
    return dispatch => {
        api.getFiles()
            .then(files => {
                dispatch(setFiles(files));
            })
            .catch(error => {
                dispatch(addError(`Не удалось получить список файлов${error.response ? `: ${error.response.data.error}` : ""}`))
            })
    }
}

export const uploadFiles = (path, files) => {
    return dispatch => {
        api.postFile(path, files)
            .then(keys => {
                addFiles(keys);
                dispatch(addSuccess(`Новые файлы (${keys.length}) загружены в хранилище`));
            })
            .catch(error => {
                dispatch(addError(`Не удалось загрузить файлы${error.response ? `: ${error.response.data.error}` : ""}`))
            })
    }
}

export const deleteFiles = (keys) => {
    return dispatch => {
        api.deleteFile(keys)
            .then(() => {
                dispatch(deleteFile(keys));
                dispatch(addSuccess("Файлы удалены из хранилища"));
            })
            .catch(error => {
                dispatch(addError(`Не удалось удалить файлы${error.response ? `: ${error.response.data.error}` : ""}`))
            })
    }
}

export const createDirectory = (path, name) => {
    return dispatch => {
        api.postDirectory(path, name)
            .then((key) => {
                dispatch(addFiles([key]));
                dispatch(addSuccess("Новая директория создана"));
            })
            .catch(error => {
                dispatch(addError(`Не удалось создать директорию${error.response ? `: ${error.response.data.error}` : ""}`))
            })
    }
}

export const deleteDirectory = (key) => {
    return dispatch => {
        api.deleteDirectory(key)
            .then(() => {
                dispatch(deleteFiles([key]));
                dispatch(addSuccess("Директория удалена"));
            })
            .catch(error => {
                dispatch(addError(`Не удалось удалить директорию${error.response ? `: ${error.response.data.error}` : ""}`))
            })
    }
}

const storageSlice = createSlice({
    name: 'storage',
    initialState: {
        list: [],
        current: "",
    },
    reducers: {
        setFiles: (state, action) => {
            return {
                ...state,
                list: action.payload
            }
        },
        addFiles: (state, action) => {
            return {
                ...state,
                list: [...state.list, ...action.payload]
            }
        },
        deleteFiles: (state, action) => {
            return {
                ...state,
                list: state.list.filter(item => action.payload.includes(item.key))
            }
        },
        setCurrent: (state, action) => {
            return {
                ...state,
                current: action.payload
            }
        }
    },
})

export const selectAll = (state) => state.storage.list;
export const selectCurrent = (state) => state.storage.current;

export const selectDirectories = (state) => state.storage.list.filter((d) => {
    var path = d.key.split('/');
    return path[path.length - 1] === "";
})

export const selectFiles = (state) => state.storage.list.filter((d) => {
    var path = d.key.split('/');
    return path[path.length - 1] !== "";
})

export const selectCurrentDirectories = (state) => state.storage.list.filter((d) => {
    var path = d.key.split('/');
    return path[path.length - 1] === ""
        && d.key.includes(state.storage.current)
        && d.key.replace(state.storage.current, "").split('/').length === 2;
})

export const selectCurrentFiles = (state) => state.storage.list.filter((d) => {
    var path = d.key.split('/');
    return path[path.length - 1] !== ""
        && d.key.includes(state.storage.current)
        && d.key.replace(state.storage.current, "").split('/').length === 1;
})


export const { addFiles, editFile, deleteFile, setFiles, setCurrent } = storageSlice.actions;

export default storageSlice.reducer;