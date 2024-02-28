import Card from "./ui/Card";
import successImage from "../res/success.svg";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Heading from "./ui/Heading";
import LinkButton from "./ui/LinkButton";

function Success() {
    const { feature } = useParams();

    return (
        <Card padding="m">
            <img src={successImage} alt="Success image." />
            <Heading variant="h3">
                {
                    feature === "user" && "Пользователь успешно зарегистрирован"
                }
                {
                    feature === "org" && "Организация успешно зарегистрирована"
                }
                {
                    feature === "file" && "Файлы успешно загружены"
                }
            </Heading>
            <LinkButton style="primary">
                <Link to={`/home/add_${feature}`}>
                    {
                        feature === "user" && "Зарегистрировать нового пользователя"
                    }
                    {
                        feature === "org" && "Зарегистрировать новую организацию"
                    }
                    {
                        feature === "file" && "Загрузить новые файлы"
                    }
                </Link>
            </LinkButton>
            <LinkButton style="secondary">
                <Link to={`/home`}>
                    Вернуться на главную страницу
                </Link>
            </LinkButton>
        </Card>
    )
}

export default Success;