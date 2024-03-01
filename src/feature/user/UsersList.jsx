import useUsers from '../../hook/useUsers';
import { SortableTableViewer } from 'tailwind-admin';
import { Link, useNavigate } from 'react-router-dom';

const schema = ["Почта", "Фамилия", "Имя", "Отчество", "Телефон", "Роль"];
const contextMenu = [
    (id) => { return <Link to={`/home/edit_user/${id}`}>Редактировать</Link> },
    (id) => { return <Link to={`/home/delete_user/${id}`}>Удалить</Link> }
]

function UsersList({ isGlobal }) {
    const users = useUsers();
    const navigate = useNavigate();

    if (!users) {
        return;
    }

    const mapUser = (user) => {
        const res = [user.email, user.lastName, user.firstName, user.patronymic, user.phoneNumber, user.role]
        if (isGlobal) {
            return res.concat(user.organization);
        }
        return res;
    }

    const onItemClick = (id) => {
        navigate(`/home/profile/${id}`);
    }

    return (
        <SortableTableViewer
            columns={isGlobal ? [...schema, "Организация"] : schema}
            contextMenu={contextMenu}
            onItemClick={onItemClick}
            items={
                users.map((user) => {
                    return {
                        id: user.email,
                        data: mapUser(user)
                    }
                })} />
    )
}

export default UsersList;