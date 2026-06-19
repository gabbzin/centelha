import { Card, CardContent } from '@/components/ui/card'
import { DeliveryPagination } from './delivery-pagination'
import { DeliveryTableRow } from './delivery-table-row'
import type { Delivery } from './types'

interface DeliveryTableProps {
  deliveries: Delivery[]
  startIndex: number
  endIndex: number
  total: number
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function DeliveryTable({
  deliveries,
  startIndex,
  endIndex,
  total,
  currentPage,
  totalPages,
  onPageChange,
}: DeliveryTableProps) {
  return (
    <Card className="rounded-xl border">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] table-auto">
            <thead>
              <tr className="bg-muted/50 text-foreground/75 text-left text-xs uppercase tracking-wide">
                <th className="px-6 py-3 font-semibold">Nº Entrega</th>
                <th className="px-6 py-3 font-semibold">Data</th>
                <th className="px-6 py-3 font-semibold">Benefício</th>
                <th className="px-6 py-3 font-semibold">Quantidade</th>
                <th className="px-6 py-3 font-semibold">Local de Retirada</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold">Entregue por</th>
              </tr>
            </thead>
            <tbody>
              {deliveries.map((delivery) => (
                <DeliveryTableRow key={delivery.code} delivery={delivery} />
              ))}
            </tbody>
          </table>
        </div>

        {total === 0 && (
          <div className="text-foreground/60 flex flex-col items-center justify-center py-12 text-sm">
            Nenhuma entrega encontrada.
          </div>
        )}

        <div className="border-border flex flex-col items-center justify-between gap-4 border-t p-4 sm:flex-row">
          <p className="text-foreground/70 text-sm">
            Mostrando {startIndex} a {endIndex} de {total} registros
          </p>
          <DeliveryPagination
            currentPage={currentPage}
            onPageChange={onPageChange}
            totalPages={totalPages}
          />
        </div>
      </CardContent>
    </Card>
  )
}
