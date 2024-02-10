import { createSlice } from '@reduxjs/toolkit'

export const MESSAGE_TYPE_SUCCESS = "success"
export const MESSAGE_TYPE_ERROR = "error"
export const MESSAGE_TYPE_NOTIFY = "notify"

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: [],
    reducers: {
        add: (state, action) => {
            return [...state, action.payload];
        },
        remove: (state, action) => {
            return state.filter(notification => notification.id !== action.payload);
        }
    }
})

const { add, remove } = notificationSlice.actions

export const getNotifications = state => state.notifications

const addNotification = (type, content) => {
    return dispatch => {
        const id = Date.now();
        dispatch(add({ id, type, content }));
        setTimeout(() => {
            dispatch(remove(id));
        }, 5 * 1000)
    }
}

export const addError = (content) => {
    return addNotification(MESSAGE_TYPE_ERROR, content);
}

export const addSuccess = (content) => {
    return addNotification(MESSAGE_TYPE_SUCCESS, content);
}

export const addNotify = (content) => {
    return addNotification(MESSAGE_TYPE_NOTIFY, content);
}

export const removeNotification = (id) => {
    return dispatch => dispatch(remove(id));
}

export default notificationSlice.reducer