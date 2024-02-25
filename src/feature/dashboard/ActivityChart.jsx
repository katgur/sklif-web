import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import Card from '../../component/ui/Card';
import Stack from '../../component/ui/Stack';
import Heading from '../../component/ui/Heading';

const data = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map(i => {
    return {
        name: i,
        media: Math.random() * 400,
        photos: Math.random() * 400,
        docs: Math.random() * 400,
    }
})

function ActivityChart() {
    return (
        <Card padding="m">
            <Stack gap="m" direction="vertical">
                <Heading variant="h3">
                    Activity Chart
                </Heading>
                <ResponsiveContainer width="100%" height={264}>
                    <BarChart data={data} barSize={8}>
                        <Legend iconType="circle" align="left" verticalAlign="top" wrapperStyle={{paddingBottom: "24px"}} />
                        <CartesianGrid strokeDasharray="5 5" vertical={false} />
                        <Bar dataKey="media" radius={[3, 3, 0, 0]} fill="#3C50E0" />
                        <Bar dataKey="photos" radius={[3, 3, 0, 0]} fill="#10B981" />
                        <Bar dataKey="docs" radius={[3, 3, 0, 0]} fill="#F0950C" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip />
                    </BarChart >
                </ResponsiveContainer>
            </Stack>
        </Card>
    )
}

export default ActivityChart;