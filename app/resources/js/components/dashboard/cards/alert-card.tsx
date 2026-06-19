import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TriangleAlertIconBack } from '../icons/triangle-alert-icon-back'

interface StatsCardProps {
  infos: {
    label: string
    rest: number
    alertLevel: 'warning' | 'critical'
  }[]
}
export function AlertCard({ infos }: StatsCardProps) {
  return (
    <Card className="w-full border border-[#FFDAD6] p-0">
      <CardHeader className="bg-[#FFDACC33] p-4 border-b border-[#FFDAD6] gap-0 [.border-b]:pb-4">
        <CardTitle className="flex items-center gap-2 uppercase font-heading font-bold text-lg">
          <TriangleAlertIconBack />
          Alertas de baixo estoque
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 p-4">
        {infos.map((info) => (
          <div
            key={info.label}
            className={cn(
              `flex items-center justify-between rounded-md p-3`,
              `${info.alertLevel === 'warning' ? 'bg-surface' : 'bg-[#FFDAD6]/20'}`,
            )}
          >
            <div>
              <h4 className="font-bold capitalize">{info.label}</h4>
              <p>Restam {info.rest} unidades</p>
            </div>

            <Badge
              variant={
                info.alertLevel === 'warning'
                  ? 'warning'
                  : 'destructive_warning'
              }
            >
              {info.alertLevel === 'warning' ? 'Atenção' : 'Crítico'}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
