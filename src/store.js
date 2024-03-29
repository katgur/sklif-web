import { configureStore } from '@reduxjs/toolkit';
import authReducer from './feature/auth/authSlice';
import usersSliceReducer from './feature/user/usersSlice';
import orgSliceReducer from './feature/org/orgSlice';
import storageSliceReducer from './feature/storage/storageSlice';
import studySliceReducer from './feature/study/studiesSlice';
import maskSliceReducer from './feature/mask/maskSlice';
import notificationReducer from './feature/notification/notificationSlice';
import progressReducer from './feature/progress/progressSlice';
import searchReducer from './feature/search/searchSlice';
import logger from 'redux-logger'

export default configureStore({
    reducer: {
        auth: authReducer,
        users: usersSliceReducer,
        org: orgSliceReducer,
        storage: storageSliceReducer,
        study: studySliceReducer,
        mask: maskSliceReducer,
        notifications: notificationReducer,
        progress: progressReducer,
        search: searchReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})