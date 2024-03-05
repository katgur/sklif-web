import { useNavigate, useSearchParams } from "react-router-dom"
import { Card, Form, Input, Box, Stack, Heading, Article } from "tailwind-admin"
import loginImage from '../../../assets/login.svg';
import logoImage from '../../../assets/logo-light.svg';
import { _code as code } from "../../../api/mock/authApi"

function ServerLoginPage() {
    const [params] = useSearchParams();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        if (data.login !== "doctor" && data.login !== "admin" && data.login !== "global.admin") {
            return;
        }
        const redirectUri = params.get("redirect_uri");
        sessionStorage.setItem("login", data.login);
        navigate(`/${redirectUri.split("/").slice(-1)[0]}?code=${code}`);
    }

    return (
        <Box>
            <Stack direction="horizaontal" align="stretch" gap={0}>
                <Card padding="xl">
                    <Stack gap="xl">
                        <img src={logoImage} width="150" height="28" alt="Tailwind Admin logo." />
                        <Article align="center">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit suspendisse.
                        </Article>
                        <img src={loginImage} width="350" height="350" alt="Login page." />
                    </Stack>
                </Card>
                <Card padding="xl">
                    <Heading variant="h2">
                        Войдите в профиль
                    </Heading>
                    <Form entity={{ login: "global.admin", password: "test" }} onSubmit={onSubmit}>
                        <Input field={{ name: "login", text: "Логин", type: "text", required: true }} />
                        <Input field={{ name: "password", text: "Пароль", type: "password", required: true }} />
                    </Form>
                </Card>
            </Stack>
        </Box>
    )
}

export default ServerLoginPage