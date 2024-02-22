import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import Card from '../../component/ui/Card';

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
            <h2>
                Visitors Analytics
            </h2>
            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie data={data} nameKey="name" dataKey="uv" innerRadius={60} outerRadius={100}>
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
                                    value: `${item.name}\u00A0\u00A0\u00A0\u00A0${item.uv}%`,
                                    color: colors[index % colors.length]
                                })
                            )
                        }
                    />
                </PieChart>
            </ResponsiveContainer>
        </Card>
    )
}

export default VisitorsChart