import { cn } from '@/lib/utils';
import { BenefitCategoryBadge } from './category-badge';
import { LOW_STOCK_THRESHOLD } from './data';
import { DeleteActionPopover } from './delete-action-popover';
import { StockActionButton } from './stock-action-button';
import type { Benefit } from './types';

interface StockTableRowProps {
  benefit: Benefit;
  onView: (benefit: Benefit) => void;
  onEdit: (benefit: Benefit) => void;
  onDelete: (benefit: Benefit) => void;
}

export function StockTableRow({ benefit, onView, onEdit, onDelete }: StockTableRowProps) {
  const isLowStock = benefit.stock <= LOW_STOCK_THRESHOLD;

  return (
    <tr className="border-border border-t bg-white">
      <td className="text-foreground/80 px-6 py-4 text-sm font-medium">{benefit.code}</td>
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
          <DeleteActionPopover ariaLabel={`Excluir ${benefit.name}`} onDelete={() => onDelete(benefit)} />
        </div>
      </td>
    </tr>
  );
}
