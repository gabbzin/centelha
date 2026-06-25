import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { UserStatus } from './types'

const STATUS_STYLES: Record<UserStatus, string> = {
  Ativo: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Inativo: 'bg-red-50 text-red-700 border-red-200',
  Pendente: 'bg-amber-50 text-amber-700 border-amber-200',
}

interface StatusBadgeProps {
  status: UserStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge
      className={cn('px-3 py-1 font-semibold', STATUS_STYLES[status])}
      variant="outline"
    >
      {status}
    </Badge>
  )
}
