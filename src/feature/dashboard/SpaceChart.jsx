import { Pie, PieChart, ResponsiveContainer, Cell, Label } from 'recharts';
import Card from '../../component/ui/Card';
import Stack from '../../component/ui/Stack';
import Article from '../../component/ui/Article';

const data = [
    {
        "name": "Used",
        "uv": 85,
    },
    {
        "name": "Available",
        "uv": 15,
    },
]

function SpaceChart() {
    return (
        <Card padding="m">
            <Stack gap="m" align="center">
                <ResponsiveContainer width={132} height={132}>
                    <PieChart style={{ fontSize: "18px" }}>
                        <Pie data={data} nameKey="name" dataKey="uv" innerRadius="70%" outerRadius="100%" startAngle={90} endAngle={-270}>
                            <Cell fill="#3C50E0" />
                            <Cell fill="#E2E8F0" />
                            <Label value="85%" position="center" />
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <Article title="Available Storage">
                    150 GB / 250 GB
                </Article>
                <button className="label">
                    Clean
                </button>
            </Stack>
        </Card>
    )
}

export default SpaceChart;