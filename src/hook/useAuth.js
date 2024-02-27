import { useSelector } from "react-redux";
import { refresh, selectData } from "../feature/auth/authSlice";
import { useEffect } from "react";
import { useNavigate } from 'react-router';
import useApiDispatch from "./useApiDispatch.js";

function useAuth() {
    const auth = useSelector(selectData);
    const dispatch = useApiDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth) {
            return;
        }
        const refreshToken = localStorage.getItem('srt');
        if (!refreshToken) {
            navigate("/login");
        }
        dispatch(refresh(refreshToken));
    }, [auth])

    return auth;
}

export default useAuth;