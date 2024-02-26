import SinglePieChart from "../../component/ui/SinglePieChart";
import Stack from '../../component/ui/Stack';
import Card from '../../component/ui/Card';
import useStats from '../../hook/useStats';

const colors = ["primary", "dark-yellow"];

function AvailableChart() {
    const data = useStats("available");

    if (!data) {
        return;
    }

    return (
        <Card padding="m">
            <Stack direction="vertical" gap="m">
                {
                    data.map((item, i) => (
                        <SinglePieChart {...item} color={colors[i % colors.length]}>

                        </SinglePieChart>
                    ))
                }
            </Stack>
        </Card>
    )
}

export default AvailableChart;