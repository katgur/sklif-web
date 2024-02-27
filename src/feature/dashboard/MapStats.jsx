import Card from "../../component/ui/Card";
import Heading from "../../component/ui/Heading";
import Map from "../../component/ui/Map";
import Rating from "../../component/ui/Rating";
import Stack from "../../component/ui/Stack";
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