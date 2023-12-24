import useUser from '../../hook/useUser';
import DataViewer from '../../component/ui/DataViewer';

/*
    header: string,
    schema: [string],
    entity: [string],
*/
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
    const user = useUser();

    const defaultAvatar = "https://pasrc.princeton.edu/sites/g/files/toruqf431/files/styles/3x4_750w_1000h/public/2021-03/blank-profile-picture_0.jpg?itok=YcR6ckN3";
    return (user &&
        <div className="content__home-page-profile card">
            <div>
                <img src={(user && user.avatarURL) || defaultAvatar} className="avatar" alt="avatar" />
            </div>
            <DataViewer
                path={!searchable ? undefined : 'users'}
                name={`${user.lastName} ${user.firstName} ${user.patronymic}`}
                entity={user}
                schema={schema} />
        </div>
    )
}

export default ProfileViewer;