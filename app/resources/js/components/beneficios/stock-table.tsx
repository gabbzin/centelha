import { Card, CardContent } from '@/components/ui/card'
import { StockTableRow } from './stock-table-row'
import { StockPagination } from './stock-pagination'
import type { Benefit } from './types'

interface StockTableProps {
  benefits: Benefit[]
  startIndex: number
  endIndex: number
  total: number
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onView: (benefit: Benefit) => void
  onEdit: (benefit: Benefit) => void
  onDelete: (benefit: Benefit) => void
}

export function StockTable({
  benefits,
  startIndex,
  endIndex,
  total,
  currentPage,
  totalPages,
  onPageChange,
  onView,
  onEdit,
  onDelete,
}: StockTableProps) {
  return (
    <Card className="rounded-2xl">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] table-auto">
            <thead>
              <tr className="bg-background/50 text-left text-sm text-foreground/75">
                <th className="px-6 py-3">CÓDIGO</th>
                <th className="px-6 py-3">BENEFÍCIO</th>
                <th className="px-6 py-3">CATEGORIA</th>
                <th className="px-6 py-3">EM ESTOQUE</th>
                <th className="px-6 py-3">AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              {benefits.map((benefit) => (
                <StockTableRow
                  key={benefit.code}
                  benefit={benefit}
                  onView={onView}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-border p-4">
          <p className="text-sm text-foreground/70">
            Mostrando {startIndex} a {endIndex} de {total} registros
          </p>
          <StockPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      </CardContent>
    </Card>
  )
}
