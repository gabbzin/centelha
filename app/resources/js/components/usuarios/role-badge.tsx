import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { UserRole } from './types'

const ROLE_STYLES: Record<UserRole, string> = {
  Administrador: 'bg-blue-50 text-blue-700 border-blue-200',
  Coordenador: 'bg-violet-50 text-violet-700 border-violet-200',
  'Agente de Saúde': 'bg-gray-100 text-gray-700 border-gray-200',
  Voluntário: 'bg-amber-50 text-amber-700 border-amber-200',
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
