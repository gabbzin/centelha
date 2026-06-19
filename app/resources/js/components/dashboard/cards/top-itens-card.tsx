import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface TopItensCardProps {
  itens: {
    name: string
    quantity: number
    percentage: number
  }[]
}
export function TopItensCard({ itens }: TopItensCardProps) {
  return (
    <Card className="w-full p-1">
      <CardHeader className="bg-surface border-b [.border-b]:pb-2 p-4">
        <CardTitle className="font-bold text-lg uppercase font-heading">
          Top itens em estoque
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ul className="space-y-4">
          {itens.map((item, index) => (
            <li key={index}>
              <div className="flex items-center justify-between">
                <h4 className="font-bold">{item.name}</h4>
                <p>{item.quantity} un</p>
              </div>
              <Progress value={item.percentage} />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
