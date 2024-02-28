import { Link } from 'react-router-dom';
import LinkButton from '../component/ui/LinkButton';
import Card from '../component/ui/Card';
import Stack from '../component/ui/Stack';
import generateCodes from '../util/pkce';
import Box from '../component/ui/Box';

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