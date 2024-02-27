import { configureStore } from '@reduxjs/toolkit';
import authReducer from './feature/auth/authSlice';
import usersSliceReducer from './feature/user/usersSlice';
import orgSliceReducer from './feature/org/orgSlice';
import storageSliceReducer from './feature/storage/storageSlice';
import studySliceReducer from './feature/study/studiesSlice';
import maskSliceReducer from './feature/mask/maskSlice';
import notificationReducer from './feature/notification/notificationSlice';
import logger from 'redux-logger'
import { addSuccess } from './feature/notification/notificationSlice';
const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersSliceReducer,
        org: orgSliceReducer,
        storage: storageSliceReducer,
        study: studySliceReducer,
        mask: maskSliceReducer,
        notifications: notificationReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
})

const next = store.dispatch
store.dispatch = function dispatchAndLogSuccess(action) {
    const { api, message, reduxAction } = action;
    api()
        .then(data => {
            next(addSuccess(message));
            next(reduxAction(data));
        })
}

//  (api, action, message) => (...args) => dispatch => {
//     api(...args)
//         .then(data => {
//             dispatch(action(data));
//             dispatch(addSuccess(message));
//         })
//         .catch(error => {
//             dispatch(addError(`${message}: {${error.message}`))
//         })
// }

export default store;


