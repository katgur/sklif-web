import { Card, Top, TopHeader, TopRow, Heading } from "tailwind-admin";
import useStats from '../../hook/useStats';

function TopContent() {
    const data = useStats("content");

    if (!data) {
        return;
    }


    return (
        <Card width="full">
            <Heading variant="h3">
                Top Content
            </Heading>
            <Top columns={["URL", "Views", "Uniques"]}>
                <TopHeader />
                {
                    data.map((item, index) => <TopRow key={index} data={item} />)
                }
            </Top>
        </Card>
    )
}

export default TopContent;