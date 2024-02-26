import Card from "../../component/ui/Card";
import Top from "../../component/ui/Top";
import TopHeader from "../../component/ui/Top/TopHeader";
import TopRow from "../../component/ui/Top/TopRow";
import Heading from "../../component/ui/Heading";
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
                    data.map(item => <TopRow data={item} />)
                }
            </Top>
        </Card>
    )
}

export default TopChannels;