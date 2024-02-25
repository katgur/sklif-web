import Card from "../../component/ui/Card";
import Top from "../../component/ui/Top";
import TopHeader from "../../component/ui/Top/TopHeader";
import TopRow from "../../component/ui/Top/TopRow";
import Heading from "../../component/ui/Heading";

const data = [
    {
        URL: "/",
        Views: "2500",
        Uniques: "2100",
        percent: 100,
    },
    {
        URL: "/blog/",
        Views: "376",
        Uniques: "139",
        percent: 83,
    },
    {
        URL: "/reserve/success",
        Views: "468",
        Uniques: "290",
        percent: 75,
    },
    {
        URL: "/product/product-details",
        Views: "298",
        Uniques: "176",
        percent: 64,
    },
    {
        URL: "/blog/digital-marketing",
        Views: "179",
        Uniques: "57",
        percent: 23,
    },
]

function TopContent() {
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