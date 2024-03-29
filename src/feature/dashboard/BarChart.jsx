import { Bar, BarChart as UIBarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, Stack, Heading } from 'tailwind-admin';
import useStats from '../../hook/useStats';

function BarChart() {
    const data = useStats("visits");

    if (!data) {
        return;
    }

    const args = {
        data,
        style: {
            fill: "#3C50E0",
        },
        barSize: 12,
    }
    return (
        <Card width="full">
            <Stack gap="xl" direction="vertical">
                <Heading variant="h3">
                    Visitors Analytics
                </Heading>
                <ResponsiveContainer width="100%" height={264}>

                    <UIBarChart {...args}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <Bar dataKey="views" radius={[3, 3, 0, 0]} />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip />
                    </UIBarChart >

                </ResponsiveContainer>
            </Stack>
        </Card>
    )
}

export default BarChart