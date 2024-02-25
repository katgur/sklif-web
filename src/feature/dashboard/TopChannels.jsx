import Card from "../../component/ui/Card";
import Top from "../../component/ui/Top";
import TopHeader from "../../component/ui/Top/TopHeader";
import TopRow from "../../component/ui/Top/TopRow";
import Heading from "../../component/ui/Heading";

const data = [
    {
        Name: "Google",
        Views: "4200",
        Uniques: "3900",
        percent: 100,
    },
    {
        Name: "Github",
        Views: "1900",
        Uniques: "509",
        percent: 50,
    },
    {
        Name: "Producthunt",
        Views: "1500",
        Uniques: "986",
        percent: 23,
    },
    {
        Name: "Facebook",
        Views: "974",
        Uniques: "639",
        percent: 38,
    },
    {
        Name: "Twitter",
        Views: "179",
        Uniques: "57",
        percent: 67,
    },
]

function TopChannels() {
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