import { Card, Top, TopRow, TopHeader, Heading } from "tailwind-admin";
import useStats from '../../hook/useStats';

function TopChannels() {
    const data = useStats("channels");

    if (!data) {
        return;
    }


    return (
        <Card padding="m">
            <Heading variant="h3">
                Top Channels
            </Heading>
            <Top columns={["Name", "Views", "Uniques"]}>
                <TopHeader />
                {
                    data.map((item, index) => <TopRow key={index} data={item} />)
                }
            </Top>
        </Card>
    )
}

export default TopChannels;