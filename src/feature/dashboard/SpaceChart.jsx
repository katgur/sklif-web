import { Pie, PieChart, ResponsiveContainer, Cell, Label } from 'recharts';
import { Card, Stack, Article, LabelButton } from 'tailwind-admin';
import useStats from '../../hook/useStats';

function SpaceChart() {
    const data = useStats("space");

    if (!data) {
        return;
    }


    return (
        <Card>
            <Stack direction="horizontal" gap="m">
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
                <LabelButton>
                    Clean
                </LabelButton>
            </Stack>
        </Card>
    )
}

export default SpaceChart;