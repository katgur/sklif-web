import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { clientUrl, protocol, clientId } from '../util/config';
import { login } from '../feature/auth/authSlice';
import useApiDispatch from '../hook/useApiDispatch';

function RedirectPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatch = useApiDispatch();
    const redirectUri = `${protocol}://${clientUrl}/redirect`;

    useEffect(() => {
        const code = searchParams.get('code');
        if (!code) {
            const codeChallenge = sessionStorage.getItem('codeChallenge');
            navigate(`/oauth2/authorize?` +
                `response_type=code&` +
                `client_id=${clientId}&` +
                `scope=openid&` +
                `redirect_uri=${redirectUri}&` +
                `code_challenge=${codeChallenge}&` +
                `code_challenge_method=S256`)
        } else {
            const codeVerifier = sessionStorage.getItem('codeVerifier');
            const isSuccess = dispatch(login(code, redirectUri, codeVerifier));
            if (isSuccess) {
                navigate("/home")
            }
        }
    }, [searchParams])

    return (
        <span>Redirect...</span>
    )
}

export default RedirectPage;