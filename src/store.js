import { Tuple, configureStore } from '@reduxjs/toolkit';
import authReducer from './feature/authSlice';
import usersSliceReducer from './feature/user/usersSlice';
import orgSliceReducer from './feature/org/orgSlice';
import storageSliceReducer from './feature/storage/storageSlice';
import studySliceReducer from './feature/study/studiesSlice';
import maskSliceReducer from './feature/study/maskSlice';
import notificationReducer from './feature/notification/notificationSlice';
import logger from 'redux-logger'
import { mapMiddleware } from './feature/middleware';

export default configureStore({
    reducer: {
        auth: authReducer,
        users: usersSliceReducer,
        org: orgSliceReducer,
        storage: storageSliceReducer,
        study: studySliceReducer,
        mask: maskSliceReducer,
        notifications: notificationReducer
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger, mapMiddleware]
})