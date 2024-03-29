import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { Card, Heading, Stack } from 'tailwind-admin';
import useStats from '../../hook/useStats';

const colors = ["#80CAEE", "#6577F3", "#0FADCF", "#3C50E0"]

function VisitorsChart() {
    const data = useStats("visitors");

    if (!data) {
        return;
    }

    return (
        <Card width="full">
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