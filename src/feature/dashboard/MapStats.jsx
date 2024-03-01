import { Card, Heading, Map, Rating, Stack } from "tailwind-admin";
import useStats from '../../hook/useStats';

function MapStats() {
    const data = useStats("map");

    if (!data) {
        return;
    }


    return (
        <Card padding="m">
            <Stack gap="xl" direction="vertical">
                <Heading variant="h3">
                    Top Countries
                </Heading>
                <Map data={data} />
                <Rating data={data} limit={6} />
            </Stack>
        </Card>
    )
}

export default MapStats;