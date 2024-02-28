import { createSlice } from '@reduxjs/toolkit';
import api from '../../api/mock/authApi';

export const login = (code, redirectUri, codeVerifier) => {
    return {
        api: async () => {
            const data = await api.getToken(code, redirectUri, codeVerifier);
            sessionStorage.setItem('srt', data.refresh_token);
            return data;
        },
        action: setData,
        message: {
            error: "Не удалось выполнить авторизацию",
        },
    }
}

export const refresh = refreshToken => {
    return {
        api: async () => {
            const data = await api.refreshToken(refreshToken);
            sessionStorage.setItem('srt', data.refresh_token);
            return data;
        },
        action: setData,
        message: {
            error: "Не удалось выполнить авторизацию",
        },
    }
}

export const logout = () => {
    return {
        api: () => {
            sessionStorage.removeItem('srt');
        },
        action: resetData,
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