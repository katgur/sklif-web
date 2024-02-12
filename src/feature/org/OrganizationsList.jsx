import SortableTableViewer from '../../component/ui/SortableTableViewer';
import { Link } from 'react-router-dom';
import useOrganizations from '../../hook/useOrganizations';

const schema = ["Название", "Почта", "Администратор", "Телефон", "Адрес"];
const contextMenu = [
    (id) => { return <Link to={`/home/edit_organization/${id}`}>Редактировать</Link> },
    (id) => { return <Link to={`/home/delete_organization/${id}`}>Удалить</Link> }
]

function OrganizationsList() {
    const organizations = useOrganizations();

    if (!organizations) {
        return;
    }

    return (
        <SortableTableViewer
            columns={schema}
            contextMenu={contextMenu}
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