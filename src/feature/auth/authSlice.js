import { createSlice } from '@reduxjs/toolkit';
import { Buffer } from 'buffer';

const authSlice = createSlice({
    name: 'auth', 
    initialState: {
        data: null
    },
    reducers: {
        setData: (state, action) => {
            const id_token = action.payload.id_token;
            const access_token = action.payload.access_token;
            const data = JSON.parse(Buffer.from(id_token.split('.')[1], 'base64').toString());
            state.data = {
                email: data.email,
                authorities: data.authorities,
                idToken: id_token,
                accessToken: access_token,
            }
        }
    },
})

export const { setData } = authSlice.actions;

export const selectData = (state) => state.auth.data;

export default authSlice.reducer;