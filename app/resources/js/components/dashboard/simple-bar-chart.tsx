import { Bar, BarChart, Tooltip, XAxis } from 'recharts'

interface ChartProps {
  data: {
    name: string
    anterior: number
    atual: number
  }[]
}
const SimpleBarChart = ({ data }: ChartProps) => {
  return (
    <BarChart
      data={data}
      margin={{
        top: 20,
        right: 0,
        left: 0,
        bottom: 5,
      }}
      responsive
      style={{
        width: '100%',
        maxWidth: '600px',
        maxHeight: '70vh',
        aspectRatio: 1.618,
      }}
    >
      <XAxis dataKey="name" />
      <Tooltip />
      <Bar dataKey="atual" fill="var(--chart-3)" radius={[10, 10, 0, 0]} />
      <Bar dataKey="anterior" fill="var(--chart-5)" radius={[10, 10, 0, 0]} />
    </BarChart>
  )
}
export default SimpleBarChart
