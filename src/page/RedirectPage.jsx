import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../api/mock/authApi';
import { clientUrl, protocol, serverUrl, clientId } from '../util/config';
import { setData } from '../feature/auth/authSlice';
import { useDispatch } from 'react-redux';

const redirectToLoginScreen = (navigate) => {
    var codeChallenge = sessionStorage.getItem('codeChallenge');
    navigate(`/oauth2/authorize?` +
        `response_type=code&` +
        `client_id=${clientId}&` +
        `scope=openid&` +
        `redirect_uri=${protocol}://${clientUrl}/redirect&` +
        `code_challenge=${codeChallenge}&` +
        `code_challenge_method=S256`)
}

const redirectToHomeScreen = async (code, navigate, dispatch) => {
    const codeVerifier = sessionStorage.getItem('codeVerifier');
    const redirectUri = `${protocol}://${clientUrl}/redirect`
    api.getToken(code, redirectUri, codeVerifier)
        .then((data) => {
            if (data.id_token) {
                localStorage.setItem('srt', data.refresh_token);
                dispatch(setData(data));
                navigate('/home');
            }
        })
}

function RedirectPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const code = searchParams.get('code');
        if (!code) {
            redirectToLoginScreen(navigate);
        } else {
            redirectToHomeScreen(code, navigate, dispatch);
        }
    }, [searchParams, navigate, dispatch])

    return (
        <span>Redirect...</span>
    )
}

export default RedirectPage;