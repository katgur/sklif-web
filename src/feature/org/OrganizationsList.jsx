import SortableTableViewer from '../../component/ui/SortableTableViewer';
import { Link, useNavigate } from 'react-router-dom';
import useOrganizations from '../../hook/useOrganizations';

const schema = ["Название", "Почта", "Администратор", "Телефон", "Адрес"];
const contextMenu = [
    (id) => { return <Link to={`/home/edit_org/${id}`}>Редактировать</Link> },
    (id) => { return <Link to={`/home/delete_org/${id}`}>Удалить</Link> }
]

function OrganizationsList() {
    const navigate = useNavigate();
    const organizations = useOrganizations();

    if (!organizations) {
        return;
    }

    return (
        <SortableTableViewer
            columns={schema}
            contextMenu={contextMenu}
            onItemClick={(id) => navigate(`/home/organization/${id}`)}
            items={
                organizations.map((org) => {
                    return {
                        id: org.email,
                        data: [org.name, org.email, org.administratorFullName, org.phoneNumber, org.address]
                    }
                })} />
    )
}

export default OrganizationsList;