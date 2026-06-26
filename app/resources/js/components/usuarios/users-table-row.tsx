import { Eye, Mail, Pencil, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatLastAccess, getInitials } from './data'
import { RoleBadge } from './role-badge'
import { StatusBadge } from './status-badge'
import type { User } from './types'

interface UsersTableRowProps {
  user: User
  onView: (user: User) => void
  onEdit: (user: User) => void
  onDelete: (user: User) => void
  onResendActivation?: (user: User) => void
}

export function UsersTableRow({
  user,
  onView,
  onEdit,
  onDelete,
  onResendActivation,
}: UsersTableRowProps) {
  return (
    <tr className="border-border hover:bg-muted/30 border-t transition-colors">
      <td className="px-6 py-4 text-sm">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full',
              'bg-blue-100 text-blue-700 font-semibold text-sm',
            )}
          >
            {getInitials(user.name)}
          </div>
          <div className="flex flex-col">
            <span className="text-foreground font-semibold">{user.name}</span>
            <span className="text-foreground/60 text-xs">ID: {user.id}</span>
          </div>
        </div>
      </td>
      <td className="text-foreground/80 px-6 py-4 text-sm">{user.email}</td>
      <td className="px-6 py-4 text-sm">
        <RoleBadge role={user.role} />
      </td>
      <td className="px-6 py-4 text-sm">
        <StatusBadge status={user.status} />
      </td>
      <td className="text-foreground/80 px-6 py-4 text-sm">
        {formatLastAccess(user.last_access)}
      </td>
      <td className="px-6 py-4 text-sm">
        <div className="flex items-center gap-2">
          <button
            aria-label={`Visualizar ${user.name}`}
            className="bg-blue-50 text-blue-600 hover:bg-blue-100 flex size-8 items-center justify-center rounded-md transition-colors"
            onClick={() => onView(user)}
            type="button"
          >
            <Eye className="size-4" />
          </button>
          <button
            aria-label={`Editar ${user.name}`}
            className="bg-orange-50 text-orange-600 hover:bg-orange-100 flex size-8 items-center justify-center rounded-md transition-colors"
            onClick={() => onEdit(user)}
            type="button"
          >
            <Pencil className="size-4" />
          </button>
          {user.status === 'Pendente' && onResendActivation && (
            <button
              aria-label={`Reenviar ativação para ${user.name}`}
              className="bg-amber-50 text-amber-600 hover:bg-amber-100 flex size-8 items-center justify-center rounded-md transition-colors"
              onClick={() => onResendActivation(user)}
              type="button"
            >
              <Mail className="size-4" />
            </button>
          )}
          <button
            aria-label={`Desativar ${user.name}`}
            className="bg-red-50 text-red-600 hover:bg-red-100 flex size-8 items-center justify-center rounded-md transition-colors"
            onClick={() => onDelete(user)}
            type="button"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      </td>
    </tr>
  )
}
