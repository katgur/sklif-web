import { Bar, BarChart as UIBarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Card from '../../component/ui/Card';
import Stack from '../../component/ui/Stack';
import Heading from '../../component/ui/Heading';

const data = Array.from(Array(30).keys()).map(i => {
    return {
        name: i + 1,
        views: Math.random() * 400,
    }
})

function BarChart() {
    const args = {
        data,
        style: {
            fill: "#3C50E0",
        },
        barSize: 12,
    }
    return (
        <Card padding="m">
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