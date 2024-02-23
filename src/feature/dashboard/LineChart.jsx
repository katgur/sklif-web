import {
    Line,
    LineChart as UILineChart,
    ResponsiveContainer,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ReferenceLine,
    AreaChart,
    Area,
    Brush,
    ReferenceArea,
    DefaultTooltipContent,
} from 'recharts';
import Card from '../../component/ui/Card';

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const pageData = Array.from(months.keys()).map(i => {
    return {
        month: months[i],
        pv: Math.random() * 400,
        uv: Math.random() * 400,
    }
})

function LineChart() {
    return (
        <Card padding="m">
            <h2>
                Revenue
            </h2>
            <ResponsiveContainer width="100%" height={400}>
                <UILineChart
                    width={500}
                    height={400}
                    data={pageData}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </UILineChart>
            </ResponsiveContainer>
        </Card>
    )
}

export default LineChart