import { createSlice } from '@reduxjs/toolkit';
import api from '../../api/mock/maskApi';
import { addError } from '../notification/notificationSlice';

export const fetchMask = (path) => {
    return dispatch => api.getMask(path)
        .then(mask => {
            dispatch(setResult(mask));
        })
        .catch(error => {
            dispatch(addError(`Не удалось обработать снимок${error.response ? `: ${error.response.data.error}` : ""}`))
        })
}

const maskSlice = createSlice({
    name: 'mask',
    initialState: {},
    reducers: {
        setResult: (state, action) => {
            return action.payload
        }
    },
})

export const { setResult } = maskSlice.actions;

export const selectResult = (state) => state.mask;

export default maskSlice.reducer;