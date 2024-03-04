import useUsers from '../../hook/useUsers';
import { SortableTableViewer } from 'tailwind-admin';
import { Link, useNavigate } from 'react-router-dom';
import { columns } from '../../util/columns';

const contextMenu = [
    (id) => <Link to={`/home/edit_user/${id}`}>Редактировать</Link>,
    (id) => <Link to={`/home/delete_user/${id}`}>Удалить</Link>
]

function UsersList() {
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
            columns={Object.keys(users[0]).map(key => columns[key])}
            contextMenu={contextMenu}
            onItemClick={onItemClick}
            keys={Object.keys(users[0])}
            items={users}
            id="email" />
    )
}

export default UsersList;