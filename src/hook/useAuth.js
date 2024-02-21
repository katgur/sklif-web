import { useDispatch, useSelector } from "react-redux";
import { selectData } from "../feature/auth/authSlice";
import { useEffect } from "react";
import { useNavigate } from 'react-router';
import { setAccessToken } from '../api/client.js';
import api from '../api/mock/authApi.js';

function useAuth() {
    const auth = useSelector(selectData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth) {
            setAccessToken(auth.accessToken);
            return;
        }
        const refresh_token = localStorage.getItem('srt');
        if (!refresh_token) {
            navigate("/login");
        }
        api.refreshToken(refresh_token)
            .then(data => {
                dispatch(setData(data));
            })
            .catch(error => {
                navigate("/login");
            });
    }, [auth])

    return auth;
}

export default useAuth;