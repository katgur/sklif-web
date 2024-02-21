import { useDispatch, useSelector } from 'react-redux';
import { selectData, setData } from '../feature/auth/authSlice';
import GlobalAdmin from '../app/GlobalAdminApp.jsx';
import LocalAdmin from '../app/LocalAdminApp.jsx';
import api from '../api/mock/authApi';
import Client from '../app/Client.jsx';
import { useEffect } from 'react';
import { setAccessToken } from '../api/client.js';
import { useNavigate } from 'react-router';

function AuthorizedPage() {
    const data = useSelector(selectData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            setAccessToken(data.accessToken);
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
    }, [data])

    return (
        <>
            {data && data.authorities === "ADMIN_GLOBAL" && <GlobalAdmin />}
            {data && data.authorities === "ADMIN_LOCAL" && <LocalAdmin />}
            {data && data.authorities === "DOCTOR" && <Client accessToken={data.accessToken} />}
        </>
    )
}

export default AuthorizedPage;