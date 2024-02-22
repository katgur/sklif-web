import { useDispatch, useSelector } from "react-redux";
import { refresh, selectData } from "../feature/auth/authSlice";
import { useEffect } from "react";
import { useNavigate } from 'react-router';
import { setAccessToken } from '../api/client.js';

function useAuth() {
    const auth = useSelector(selectData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth) {
            setAccessToken(auth.accessToken);
            return;
        }
        const refreshToken = localStorage.getItem('srt');
        if (!refreshToken) {
            navigate("/login");
        }
        dispatch(refresh(refreshToken, navigate));
    }, [auth])

    return auth;
}

export default useAuth;