import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import Card from '../../component/ui/Card';
import Heading from '../../component/ui/Heading';
import Stack from '../../component/ui/Stack';

const data = [
    {
        "name": "Desktop",
        "uv": 25,
    },
    {
        "name": "Mobile",
        "uv": 52,
    },
    {
        "name": "Tablet",
        "uv": 21,
    },
    {
        "name": "Unknown",
        "uv": 2,
    },
]

const colors = ["#80CAEE", "#6577F3", "#0FADCF", "#3C50E0"]

function VisitorsChart() {
    const args = {
        data
    }

    return (
        <Card padding="m">
            <Stack padding="xl" direction="vertical">
                <Heading variant="h3">
                    Visitors Analytics
                </Heading>
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie data={data} nameKey="name" dataKey="uv" innerRadius="50%" outerRadius="80%">
                            {data.map((_, index) => {
                                return (
                                    <Cell
                                        fill={colors[index % 4]}
                                        key={index}
                                    />
                                );
                            })}
                        </Pie>
                        <Tooltip />
                        <Legend
                            payload={
                                data.map(
                                    (item, index) => ({
                                        id: item.name,
                                        type: "circle",
                                        value: `${item.name}\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0${item.uv}%\u00A0\u00A0\u00A0\u00A0`,
                                        color: colors[index % colors.length]
                                    })
                                )
                            }
                        />
                    </PieChart>
                </ResponsiveContainer>
            </Stack>
        </Card>
    )
}

export default VisitorsChart