import useUsers from '../../hook/useUsers';
import { SortableTableViewer } from 'tailwind-admin';
import { Link, useNavigate } from 'react-router-dom';

const schema = ["Почта", "Фамилия", "Имя", "Отчество", "Телефон", "Роль"];
const contextMenu = [
    (id) => <Link to={`/home/edit_user/${id}`}>Редактировать</Link>,
    (id) => <Link to={`/home/delete_user/${id}`}>Удалить</Link>
]

function UsersList({ isGlobal }) {
    const users = useUsers();
    const navigate = useNavigate();

    if (!users) {
        return;
    }

    const onItemClick = (id) => {
        navigate(`/home/profile/${id}`);
    }

    return (
        <SortableTableViewer
            columns={isGlobal ? [...schema, "Организация"] : schema}
            contextMenu={contextMenu}
            onItemClick={onItemClick}
            keys={isGlobal ? Object.keys(users[0]).slice(0, -1) : Object.keys(users[0]).slice(0, -2)}
            items={users}
            id="email" />
    )
}

export default UsersList;