import { Link } from 'react-router-dom';
import { LinkButton, Card, Stack, Box } from 'tailwind-admin';
import generateCodes from '../util/pkce';

function LoginPage() {
    generateCodes();

    return (
        <Box>
            <Card padding="m">
                <Stack direction="vertical" gap="m">
                    <p>Нажмите кнопку Вход, чтобы авторизоваться</p>
                    <LinkButton style="primary">
                        <Link to="/redirect">
                            Вход
                        </Link>
                    </LinkButton>
                </Stack>
            </Card>
        </Box>
    )
}

export default LoginPage;