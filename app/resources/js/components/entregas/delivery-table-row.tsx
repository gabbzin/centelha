import { Badge } from '@/components/ui/badge'
import { formatDisplayDate } from './data'
import type { Delivery } from './types'

interface DeliveryTableRowProps {
  delivery: Delivery
  onClick?: () => void
}

const statusVariantMap: Record<
  Delivery['status'],
  'success_basic' | 'warning' | 'destructive_basic'
> = {
  Entregue: 'success_basic',
  Pendente: 'warning',
  Cancelado: 'destructive_basic',
}

export function DeliveryTableRow({ delivery, onClick }: DeliveryTableRowProps) {
  return (
    <tr
      className="border-border hover:bg-muted/40 cursor-pointer border-b transition-colors last:border-b-0"
      onClick={onClick}
    >
      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
        {delivery.code}
      </td>
      <td className="px-6 py-4 text-sm whitespace-nowrap">
        {formatDisplayDate(delivery.date)}
      </td>
      <td className="px-6 py-4 text-sm">{delivery.benefit}</td>
      <td className="px-6 py-4 text-sm whitespace-nowrap">
        {delivery.quantity} {delivery.quantity === 1 ? 'unidade' : 'unidades'}
      </td>
      <td className="px-6 py-4 text-sm">{delivery.location}</td>
      <td className="px-6 py-4">
        <Badge
          className="capitalize"
          variant={statusVariantMap[delivery.status]}
        >
          {delivery.status}
        </Badge>
      </td>
      <td className="px-6 py-4 text-sm">{delivery.deliveredBy}</td>
    </tr>
  )
}
