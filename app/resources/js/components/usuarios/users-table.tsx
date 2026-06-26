import { Card, CardContent } from '@/components/ui/card'
import type { User } from './types'
import { UsersPagination } from './users-pagination'
import { UsersTableRow } from './users-table-row'

interface UsersTableProps {
  users: User[]
  startIndex: number
  endIndex: number
  total: number
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onView: (user: User) => void
  onEdit: (user: User) => void
  onDelete: (user: User) => void
  onResendActivation?: (user: User) => void
}

export function UsersTable({
  users,
  startIndex,
  endIndex,
  total,
  currentPage,
  totalPages,
  onPageChange,
  onView,
  onEdit,
  onDelete,
  onResendActivation,
}: UsersTableProps) {
  return (
    <Card className="rounded-2xl">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] table-auto">
            <thead>
              <tr className="bg-muted/40 text-foreground/70 text-left text-xs font-semibold tracking-wide uppercase">
                <th className="px-6 py-3">Usuário</th>
                <th className="px-6 py-3">E-mail</th>
                <th className="px-6 py-3">Perfil</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Último acesso</th>
                <th className="px-6 py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td
                    className="text-foreground/60 px-6 py-12 text-center text-sm"
                    colSpan={6}
                  >
                    Nenhum usuário encontrado.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <UsersTableRow
                    key={user.id}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    onResendActivation={onResendActivation}
                    onView={onView}
                    user={user}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        {users.length > 0 && (
          <div className="border-border flex items-center justify-between border-t p-4">
            <p className="text-foreground/70 text-sm">
              Mostrando {startIndex} a {endIndex} de {total} usuários
            </p>
            <UsersPagination
              currentPage={currentPage}
              onPageChange={onPageChange}
              totalPages={totalPages}
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
