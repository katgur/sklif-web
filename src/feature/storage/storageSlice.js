import { createSlice } from '@reduxjs/toolkit';
import api from '../../api/mock/storageApi';
import { addSuccess, addError } from '../notification/notificationSlice';

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
            .then(files => {
                addFiles(files);
                dispatch(addSuccess(`Новые файлы (${files.length}) загружены в хранилище`));
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
                dispatch(removeFiles(keys));
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
            .then((file) => {
                dispatch(addFiles([file]));
                dispatch(addSuccess("Новая директория создана"));
            })
            .catch(error => {
                dispatch(addError(`Не удалось создать директорию${error.response ? `: ${error.response.data.error}` : ""}`))
            })
    }
}

export const createDirectoryAndLoadFiles = (path, newDirectoryName, files) => {
    return dispatch => {
        api.postDirectory(path, newDirectoryName)
            .then((file) => {
                dispatch(addFiles([file]));
                dispatch(addSuccess("Новая директория создана"));
                return api.postFile(file.key, files);
            })
            .then((keys) => {
                addFiles(keys);
                dispatch(addSuccess(`Новые файлы (${keys.length}) загружены в хранилище`));
            })
            .catch(error => {
                dispatch(addError(`Не удалось загрузить файлы${error.response ? `: ${error.response.data.error}` : ""}`))
            })
    }
}

export const deleteDirectory = (key) => {
    return dispatch => {
        api.deleteDirectory(key)
            .then(() => {
                dispatch(removeFiles([key]));
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
        removeFiles: (state, action) => {
            const set = new Set(action.payload);
            return {
                ...state,
                list: state.list.filter(item => !set.has(item.key))
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


export const { addFiles, editFile, removeFiles, setFiles, setCurrent } = storageSlice.actions;

export default storageSlice.reducer;