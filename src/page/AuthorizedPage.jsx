import { useDispatch, useSelector } from 'react-redux';
import { selectData, setData } from '../feature/authSlice';
import GlobalAdmin from '../app/GlobalAdminApp.jsx';
import LocalAdmin from '../app/LocalAdminApp.jsx';
import { clientUrl, protocol } from '../util/config';
import { refreshToken } from '../api/authApi';
import Client from '../app/Client.jsx';
import { useEffect } from 'react';

function AuthorizedPage() {
    const data = useSelector(selectData);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     var getNewToken = async (refresh_token) => {
    //         return await refreshToken(refresh_token);
    //     }

    //     if (!data) {
    //         var refresh_token = localStorage.getItem('srt');
    //         if (!refresh_token) {
    //             window.location.href = `${protocol}://${clientUrl}/login`;
    //         }
    //         getNewToken(refresh_token)
    //             .then(response => {
    //                 dispatch(setData(response.data));
    //             })
    //             .catch(error => {
    //                 window.location.href = `${protocol}://${clientUrl}/login`;
    //             });
    //     }
    // }, [data, dispatch])

    return (
        <>
            <LocalAdmin />
            {/* {data && data.authorities.includes("ADMIN_GLOBAL") && <GlobalAdmin />} */}
            {/* {data && data.authorities.includes("ADMIN_LOCAL") && <LocalAdmin />} */}
            {/* {data && data.authorities.includes("DOCTOR") && <Client accessToken={data.accessToken} />} */}
        </>
    )
}

export default AuthorizedPage;