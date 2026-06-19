import { Eye, Pencil, Trash2 } from 'lucide-react'
import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

type ActionVariant = 'view' | 'edit' | 'delete'
const VARIANT_STYLES: Record<ActionVariant, string> = {
  view: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
  edit: 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100',
  delete: 'bg-red-50 text-red-600 hover:bg-red-100',
}
const VARIANT_ICONS: Record<ActionVariant, typeof Eye> = {
  view: Eye,
  edit: Pencil,
  delete: Trash2,
}
interface StockActionButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant: ActionVariant
}
export function StockActionButton({
  variant,
  className,
  ...props
}: StockActionButtonProps) {
  const Icon = VARIANT_ICONS[variant]
  return (
    <button
      className={cn(
        'flex size-8 items-center justify-center rounded-md transition-colors',
        VARIANT_STYLES[variant],
        className,
      )}
      type="button"
      {...props}
    >
      <Icon className="size-4" />
    </button>
  )
}
