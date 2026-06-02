import type { Benefit } from './types'
import { BenefitCategoryBadge } from './category-badge'
import { StockActionButton } from './stock-action-button'
import { LOW_STOCK_THRESHOLD } from './data'
import { cn } from '@/lib/utils'

interface StockTableRowProps {
  benefit: Benefit
  onView: (benefit: Benefit) => void
  onEdit: (benefit: Benefit) => void
  onDelete: (benefit: Benefit) => void
}

export function StockTableRow({ benefit, onView, onEdit, onDelete }: StockTableRowProps) {
  const isLowStock = benefit.stock <= LOW_STOCK_THRESHOLD

  return (
    <tr className="border-t border-border bg-white">
      <td className="px-6 py-4 text-sm font-medium text-foreground/80">{benefit.code}</td>
      <td className="px-6 py-4 text-sm font-semibold uppercase">{benefit.name}</td>
      <td className="px-6 py-4 text-sm">
        <BenefitCategoryBadge category={benefit.category} />
      </td>
      <td className={cn('px-6 py-4 text-sm font-semibold', isLowStock ? 'text-destructive' : 'text-primary')}>
        {benefit.stock}
      </td>
      <td className="px-6 py-4 text-sm">
        <div className="flex items-center gap-2">
          <StockActionButton variant="view" aria-label={`Ver ${benefit.name}`} onClick={() => onView(benefit)} />
          <StockActionButton variant="edit" aria-label={`Editar ${benefit.name}`} onClick={() => onEdit(benefit)} />
          <StockActionButton variant="delete" aria-label={`Excluir ${benefit.name}`} onClick={() => onDelete(benefit)} />
        </div>
      </td>
    </tr>
  )
}
