import { Card, Heading, LinkButton, Stack } from "tailwind-admin";
import successImage from "../assets/success.svg";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function Success() {
    const { feature } = useParams();

    return (
        <Card padding="xl">
            <Stack gap="xl">
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
                <Stack width="full">
                    <LinkButton style="primary" width="full">
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
                    <LinkButton style="secondary" width="full">
                        <Link to={`/home`}>
                            Вернуться на главную страницу
                        </Link>
                    </LinkButton>
                </Stack>
            </Stack>
        </Card>
    )
}

export default Success;