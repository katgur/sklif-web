import { useNavigate, useSearchParams } from "react-router-dom"
import { Card, Form, Input, Box } from "tailwind-admin"
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
            <Card padding="m">
                <Form title="Авторизация" entity={{ login: "global.admin", password: "test" }} onSubmit={onSubmit}>
                    <Input field={{ name: "login", text: "Логин", type: "text", required: true }} />
                    <Input field={{ name: "password", text: "Пароль", type: "password", required: true }} />
                </Form>
            </Card>
        </Box>
    )
}

export default ServerLoginPage