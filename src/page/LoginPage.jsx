import { Link } from 'react-router-dom';
import generateCodes from '../util/pkce';

function LoginPage() {
    generateCodes();

    return (
        <div className="content__login-page card">
            <span className="text-font">Нажмите кнопку Вход, чтобы авторизоваться</span>
            <Link to="/redirect">
                <div className="filled-button">
                    Вход
                </div>
            </Link>
        </div>
    )
}

export default LoginPage;