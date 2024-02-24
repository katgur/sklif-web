import Card from "../../component/ui/Card";
import Heading from "../../component/ui/Heading";
import Map from "../../component/ui/Map";
import Rating from "../../component/ui/Rating";
import Stack from "../../component/ui/Stack";
import { codes } from "../../util/country";

const getData = () => {
    const res = {};
    for (const code of codes) {
        res[code] = (Math.random() * Math.random() * 100).toFixed(0);
    }
    return res;
}

const data = getData();

function MapStats() {
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