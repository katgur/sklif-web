import Card from "../../component/ui/Card";
import Top from "../../component/ui/Top";
import TopHeader from "../../component/ui/Top/TopHeader";
import TopRow from "../../component/ui/Top/TopRow";
import Heading from "../../component/ui/Heading";
import useStats from '../../hook/useStats';

function TopContent() {
    const data = useStats("content");

    if (!data) {
        return;
    }


    return (
        <Card padding="m">
            <Heading variant="h3">
                Top Content
            </Heading>
            <Top columns={["URL", "Views", "Uniques"]}>
                <TopHeader />
                {
                    data.map(item => <TopRow data={item} />)
                }
            </Top>
        </Card>
    )
}

export default TopContent;