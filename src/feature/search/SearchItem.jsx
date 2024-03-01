import { Card, Heading, SortableTableViewer } from 'tailwind-admin';

function SearchItem({ title, data }) {

    return (
        <>
            <Card padding="sm">
                <Heading variant="h3">
                    {title}
                </Heading>
            </Card>
            <SortableTableViewer columns={Object.keys(data[0])} items={data.map(d => ({ data: Object.keys(data[0]).map(key => d[key]) }))} />
        </>
    )
}

export default SearchItem;