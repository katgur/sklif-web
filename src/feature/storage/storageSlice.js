import { createSlice } from '@reduxjs/toolkit';
import api from '../../api/mock/storageApi';

export const fetchFiles = () => {
    return {
        api: api.getFiles,
        action: setFiles,
        message: {
            error: "Не удалось получить список файлов",
        },
    }
}

export const uploadFiles = (path, files) => {
    return {
        api: async () => await api.postFile(path, files),
        action: addFiles,
        message: {
            success: "Новые файлы загружены в хранилище",
            error: "Не удалось загрузить файлы",
        },
    }
}

export const deleteFiles = keys => {
    return {
        api: async () => await api.deleteFile(keys),
        action: removeFiles,
        message: {
            success: "Файлы удалены из хранилища",
            error: "Не удалось удалить файлы",
        },
    }
}

export const createDirectory = (path, name) => {
    return {
        api: async () => await api.postDirectory(path, name),
        action: addFile,
        message: {
            success: "Новая директория создана",
            error: "Не удалось создать директорию",
        },
    }
}

export const createDirectoryAndLoadFiles = (path, newDirectoryName, files) => {
    return {
        api: async () => {
            const dir = await api.postDirectory(path, newDirectoryName);
            const newFiles = await api.postFile(dir.key, files);
            return [dir, ...newFiles];
        },
        action: addFiles,
        message: {
            success: "Новые файлы загружены в хранилище",
            error: "Не удалось загрузить файлы",
        },
    }
}

export const deleteDirectory = key => {
    return {
        api: async () => await api.deleteDirectory(key),
        action: removeFile,
        message: {
            success: "Директория удалена",
            error: "Не удалось удалить директорию",
        },
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
        addFile: (state, action) => {
            return {
                ...state,
                list: [...state.list, action.payload]
            }
        },
        addFiles: (state, action) => {
            return {
                ...state,
                list: [...state.list, ...action.payload]
            }
        },
        removeFile: (state, action) => {
            return {
                ...state,
                list: state.list.filter(item => item.key !== action.payload.key)
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

export const { addFiles, removeFiles, addFile, setFiles, removeFile, setCurrent } = storageSlice.actions;

export default storageSlice.reducer;