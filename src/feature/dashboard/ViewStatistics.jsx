import { Card, Statistics } from "tailwind-admin";
import useStats from '../../hook/useStats';

function ViewStatistics() {
    const data = useStats("views");

    if (!data) {
        return;
    }


    return (
        <Card padding="m">
            <Statistics data={data} />
        </Card>
    )
}

export default ViewStatistics;