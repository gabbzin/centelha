import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { UserRole } from './types'

const ROLE_STYLES: Record<UserRole, string> = {
  Administrador: 'bg-blue-50 text-blue-700 border-blue-200',
  Operador: 'bg-amber-50 text-amber-700 border-amber-200',
}

interface RoleBadgeProps {
  role: UserRole
}

export function RoleBadge({ role }: RoleBadgeProps) {
  return (
    <Badge
      className={cn('px-3 py-1 font-semibold', ROLE_STYLES[role])}
      variant="outline"
    >
      {role}
    </Badge>
  )
}
