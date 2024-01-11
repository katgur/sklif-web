import { createSlice } from '@reduxjs/toolkit';
import { Buffer } from 'buffer';

const authSlice = createSlice({
    name: 'auth', 
    initialState: {
        status: {
            message: undefined,
            code: undefined,
        },
        data: {
            email: 'mail@mail.com',
            authorities: 'ADMIN_GLOBAL',
            accessToken: ''
        },
    },
    reducers: {
        resetStatus: (state, action) => {
            state.status = {
                message: undefined,
                code: undefined,
            }
        },
        setData: (state, action) => {
            const id_token = action.payload.id_token;
            const access_token = action.payload.access_token;
            const data = JSON.parse(Buffer.from(id_token.split('.')[1], 'base64').toString());
            state.data = {
                email: data.sub,
                authorities: data.authorities,
                idToken: id_token,
                accessToken: access_token,
            }
        },
        setMessage: (state, action) => {
            state.status = action.payload;
        }
    },
})

export const { resetStatus, setData, setMessage } = authSlice.actions;

export const selectStatus = (state) => state.auth.status;
export const selectData = (state) => state.auth.data;

export default authSlice.reducer;