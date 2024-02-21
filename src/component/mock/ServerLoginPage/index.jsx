import { useNavigate, useSearchParams } from "react-router-dom"
import Card from "../../ui/Card"
import Form from "../../ui/Form"
import Input from "../../ui/Form/Input"
import { _code as code } from "../../../api/mock/authApi"

const user = {
    login: "test",
    password: "test",
};

function ServerLoginPage() {
    const [params] = useSearchParams();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        if (data.login !== user.login || data.password !== user.password) {
            return;
        }
        const redirectUri = params.get("redirect_uri");
        navigate(`/${redirectUri.split("/").slice(-1)[0]}?code=${code}`);
    }

    return (
        <Card padding="m">
            <Form title="Авторизация" entity={user} onSubmit={onSubmit}>
                <Input field={{ name: "login", text: "Логин", type: "text", required: true }} />
                <Input field={{ name: "password", text: "Пароль", type: "password", required: true }} />
            </Form>
        </Card>
    )
}

export default ServerLoginPage