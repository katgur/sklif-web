import Card from "../../component/ui/Card";
import Statistics from "../../component/ui/Statistics";

const data = [
    {
        value: "18.6K",
        name: "Unique Visitors",
        change: "18"
    },
    {
        value: "55.9K",
        name: "Total Pageviews",
        change: "25"
    },
    {
        value: "18.6K",
        name: "Unique Visitors",
        change: "18"
    },
    {
        value: "54%",
        name: "Bounce Rate",
        change: "-7"
    },
    {
        value: "2m 56s",
        name: "Visit Duration",
        change: "12"
    }
]

function ViewStatistics() {
    return (
        <Card padding="m">
            <Statistics data={data} />
        </Card>
    )
}

export default ViewStatistics;