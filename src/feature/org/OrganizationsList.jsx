import SortableTableViewer from '../../component/ui/SortableTableViewer';
import { Link, Outlet } from 'react-router-dom';
import useOrganizations from '../../hook/useOrganizations';
import SearchBar from '../../component/SearchBar';

const schema = ["Почта", "Название", "Имя администратора", "Телефон", "Адрес"];
const contextMenu = [
    (id) => { return <Link to={`/home/edit_organization/${id}`}>Редактировать</Link> },
    (id) => { return <Link to={`/home/organizations/delete/${id}`}>Удалить</Link> }
]

function OrganizationsList() {
    const organizations = useOrganizations(true);

    return (
        <>
            <div className="card">
                <SearchBar path='organizations' />
            </div>
            <div className="content__home-page-table">
                {
                    organizations &&
                    <SortableTableViewer
                        columns={schema}
                        contextMenu={contextMenu}
                        onItemClick={() => {}}
                        items={
                            organizations.map((org) => {
                                return {
                                    id: org.email,
                                    data: [org.email, org.organizationName, org.administratorFullName, org.phoneNumber, org.address]
                                }
                            })} />
                }
                {
                    !organizations && <span className="text-font">Пусто</span>
                }
                <Outlet />
            </div>
        </>
    )
}

export default OrganizationsList;