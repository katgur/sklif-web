import useUser from '../../hook/useUser';
import { DataViewer, LinkButton, Card, Stack } from 'tailwind-admin';
import { useParams } from 'react-router';
import { Link as RouteLink } from 'react-router-dom';
import useAuth from '../../hook/useAuth';

const schema = [
    {
        text: "Права доступа",
        tabs: [
            { name: "role", text: "Роль" },
            { name: "organization", text: "Организация" }
        ]
    },
    {
        text: "Контакты",
        tabs: [
            { name: "email", text: "Почта" },
            { name: "phoneNumber", text: "Телефон" },
        ]
    }
];

function ProfileViewer({ searchable }) {
    const { email } = useParams();
    const auth = useAuth();
    const user = useUser(email || auth && auth.email);

    if (!user) {
        return;
    }

    return (
        <Card padding="m">
            <Stack direction="horizontal">
                <Stack gap="sm">
                    <img width="200" height="200" src={user.avatarURL} alt="Фотография профиля." />
                    {
                        auth.authorities !== "DOCTOR" &&
                        <>
                            <LinkButton style="primary">
                                <RouteLink to={`/home/edit_user/${user.email}`}>Редактировать</RouteLink>
                            </LinkButton>
                            <LinkButton style="secondary">
                                <RouteLink to={`/home/delete_user/${user.email}`}>Удалить профиль</RouteLink>
                            </LinkButton>
                        </>
                    }
                </Stack>
                <DataViewer
                    path={searchable && 'users'}
                    title={`${user.lastName} ${user.firstName} ${user.patronymic}`}
                    entity={user}
                    schema={schema} />
            </Stack>
        </Card>
    )
}

export default ProfileViewer;