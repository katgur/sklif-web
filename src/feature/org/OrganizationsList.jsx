import { SortableTableViewer } from 'tailwind-admin';
import { Link, useNavigate } from 'react-router-dom';
import useOrganizations from '../../hook/useOrganizations';
import { columns } from '../../util/columns';

const contextMenu = [
    (id) => { return <Link to={`/home/edit_org/${id}`}>Редактировать</Link> },
    (id) => { return <Link to={`/home/delete_org/${id}`}>Удалить</Link> }
]

function OrganizationsList() {
    const navigate = useNavigate();
    const organizations = useOrganizations();

    if (!organizations || organizations.length === 0) {
        return;
    }

    return (
        <SortableTableViewer
            columns={Object.keys(organizations[0]).map(key => columns[key])}
            contextMenu={contextMenu}
            onItemClick={(id) => navigate(`/home/organization/${id}`)}
            id="email"
            keys={Object.keys(organizations[0])}
            items={organizations} />
    )
}

export default OrganizationsList;