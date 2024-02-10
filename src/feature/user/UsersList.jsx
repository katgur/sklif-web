import useUsers from '../../hook/useUsers';
import SortableTableViewer from '../../component/ui/SortableTableViewer';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const schema = ["Почта", "Фамилия", "Имя", "Отчество", "Телефон", "Роль"];
const contextMenu = [
    (id) => { return <Link to={`/home/edit_user/${id}`}>Редактировать</Link> },
    (id) => { return <Link to={`/home/users/delete/${id}`}>Удалить</Link> }
]

function UsersList({ isGlobal }) {
    const users = useUsers();

    var mapUser = (user) => {
        var res = [user.email, user.lastName, user.firstName, user.patronymic, user.phoneNumber, user.role]
        if (isGlobal) {
            res = res.concat(user.organization);
        }
        return res;
    }

    const navigate = useNavigate();
    var onItemClick = (id) => {
        navigate(`/home/profile/${id}`);
    }

    return (
        <div className="content__home-page-table">
            {
                users &&
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
            }
            {
                !users && <span className="text-font">Пусто</span>
            }
            <Outlet />
        </div>
    )
}

export default UsersList;