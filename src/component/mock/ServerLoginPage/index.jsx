import { useNavigate, useSearchParams } from "react-router-dom"
import Card from "../../ui/Card"
import Form from "../../ui/Form"
import Input from "../../ui/Form/Input"
import { _code as code, setClientLogin } from "../../../api/mock/authApi"

function ServerLoginPage() {
    const [params] = useSearchParams();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        if (data.login !== "doctor" && data.login !== "admin" && data.login !== "global.admin") {
            return;
        }
        const redirectUri = params.get("redirect_uri");
        const clientId = params.get("cliend_id");
        setClientLogin(data.login);
        navigate(`/${redirectUri.split("/").slice(-1)[0]}?code=${code}`);
    }

    return (
        <Card padding="m">
            <Form title="Авторизация" entity={{ login: "global.admin", password: "test" }} onSubmit={onSubmit}>
                <Input field={{ name: "login", text: "Логин", type: "text", required: true }} />
                <Input field={{ name: "password", text: "Пароль", type: "password", required: true }} />
            </Form>
        </Card>
    )
}

export default ServerLoginPage