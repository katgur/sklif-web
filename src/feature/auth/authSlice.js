import { createSlice } from '@reduxjs/toolkit';
import { Buffer } from 'buffer';
import api from '../../api/mock/authApi';
import { addError } from '../notification/notificationSlice';

export const login = (code, redirectUri, codeVerifier, navigate) => {
    return dispatch => {
        api.getToken(code, redirectUri, codeVerifier)
            .then(data => {
                navigate("/home");
                localStorage.setItem('srt', data.refresh_token);
                dispatch(setData(data));
            })
            .catch(error => {
                navigate("/login");
                dispatch(addError(`Не удалось выполнить авторизацию${error.message ? `: ${error.message}` : ""}`))
            })
    }
}

export const refresh = (refreshToken, navigate) => {
    return dispatch => {
        api.refreshToken(refreshToken)
            .then(data => {
                localStorage.setItem('srt', data.refresh_token);
                dispatch(setData(data));
            })
            .catch(error => {
                navigate("/login");
                dispatch(addError(`Не удалось выполнить авторизацию${error.message ? `: ${error.message}` : ""}`))
            })
    }
}

export const logout = () => {
    return dispatch => {
        localStorage.removeItem('srt');
        dispatch(resetData());
    }
}

const authSlice = createSlice({
    name: 'auth',
    initialState: null,
    reducers: {
        setData: (state, action) => {
            const idToken = action.payload.id_token;
            const accessToken = action.payload.access_token;
            const data = JSON.parse(atob(idToken.split('.')[1], 'base64'));
            return {
                email: data.email,
                authorities: data.authorities,
                idToken,
                accessToken,
            }
        },
        resetData: () => {
            return null
        },
    },
})

const { setData, resetData } = authSlice.actions;

export const selectData = (state) => state.auth;

export default authSlice.reducer;