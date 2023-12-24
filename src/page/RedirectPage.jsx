import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getToken } from '../api/authApi';
import { clientUrl, protocol, serverUrl, clientId } from '../util/config';
import { setData } from '../feature/authSlice';
import { useDispatch } from 'react-redux';

const redirectToLoginScreen = () => {
    var codeChallenge = sessionStorage.getItem('codeChallenge');
    var link = `${protocol}://auth.platformed.ru/oauth2/authorize?` + 
    `response_type=code&` + 
    `client_id=${clientId}&` + 
    `scope=openid&` + 
    `redirect_uri=${protocol}://${clientUrl}/redirect&` + 
    `code_challenge=${codeChallenge}&` +
    `code_challenge_method=S256`;
    window.location.href = link;
}

const redirectToHomeScreen = async (code, navigate, dispatch) => {  
    const codeVerifier = sessionStorage.getItem('codeVerifier');
    const redirectUri = `${protocol}://${clientUrl}/redirect`
    await getToken(code, redirectUri, codeVerifier)
    .then((response) => {
        if (response.data.id_token) {
            localStorage.setItem('srt', response.data.refresh_token);
            dispatch(setData(response.data));
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
            redirectToLoginScreen();
        } else {
            redirectToHomeScreen(code, navigate, dispatch);
        }
    }, [searchParams, navigate, dispatch])

    return (
        <span>Redirect...</span>
    )
}

export default RedirectPage;