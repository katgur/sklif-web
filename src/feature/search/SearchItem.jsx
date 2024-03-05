import { Heading, SortableTableViewer } from 'tailwind-admin';
import { columns } from '../../util/columns';

function SearchItem({ title, data }) {

    if (!data || data.length === 0) {
        return;
    }

    return (
        <>
            <Heading variant="h3">
                {title}
            </Heading>
            <SortableTableViewer keys={Object.keys(data[0])} columns={Object.keys(data[0]).map(key => columns[key])} items={data} />
        </>
    )
}

export default SearchItem;