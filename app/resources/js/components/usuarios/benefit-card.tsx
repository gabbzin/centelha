import { Pencil, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { BENEFIT_CATEGORY_STYLES } from './data'
import type { Benefit } from './types'

interface BenefitCardProps {
  benefit: Benefit
  onEdit: (benefit: Benefit) => void
  onDelete: (benefit: Benefit) => void
}

export function BenefitCard({ benefit, onEdit, onDelete }: BenefitCardProps) {
  const {
    icon: Icon,
    className,
    label,
  } = BENEFIT_CATEGORY_STYLES[benefit.category]

  return (
    <article className="border-border bg-card flex h-full flex-col rounded-2xl border p-5 shadow-sm transition-shadow hover:shadow-md">
      <Badge
        className={`w-fit gap-1.5 px-3 py-1 font-semibold ${className}`}
        variant="outline"
      >
        <Icon className="size-3.5" />
        {label}
      </Badge>

      <p className="text-foreground/80 mt-3 line-clamp-3 text-sm leading-relaxed">
        {benefit.description}
      </p>

      <div className="border-border mt-auto flex items-center justify-end gap-2 border-t pt-4">
        <button
          aria-label={`Editar ${benefit.name}`}
          className="bg-orange-50 text-orange-600 hover:bg-orange-100 flex size-8 items-center justify-center rounded-md transition-colors"
          onClick={() => onEdit(benefit)}
          type="button"
        >
          <Pencil className="size-4" />
        </button>
        <button
          aria-label={`Excluir ${benefit.name}`}
          className="bg-red-50 text-red-600 hover:bg-red-100 flex size-8 items-center justify-center rounded-md transition-colors"
          onClick={() => onDelete(benefit)}
          type="button"
        >
          <Trash2 className="size-4" />
        </button>
      </div>
    </article>
  )
}
