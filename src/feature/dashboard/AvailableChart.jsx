import { SinglePieChart, Stack, Card } from "tailwind-admin";
import useStats from '../../hook/useStats';

const colors = ["primary", "dark-yellow"];

function AvailableChart() {
    const data = useStats("available");

    if (!data) {
        return;
    }

    return (
        <Card width="full">
            <Stack direction="vertical" gap="m">
                {
                    data.map((item, i) => (
                        <SinglePieChart key={i} {...item} color={colors[i % colors.length]} />
                    ))
                }
            </Stack>
        </Card>
    )
}

export default AvailableChart;