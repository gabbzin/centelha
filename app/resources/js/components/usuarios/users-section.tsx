import { Plus, Users } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { toaster } from '@/components/toasters/toast-alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { MOCK_USERS } from './data'
import type { User } from './types'
import { UserFormModal, type UserFormPayload } from './user-form-modal'
import { UsersFilterBar } from './users-filter-bar'
import { UsersTable } from './users-table'
import { ViewUserModal } from './view-user-modal'

const PER_PAGE = 5

export function UsersSection() {
  const [users, setUsers] = useState<User[]>(MOCK_USERS)
  const [search, setSearch] = useState('')
  const [role, setRole] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [userToEdit, setUserToEdit] = useState<User | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [userToView, setUserToView] = useState<User | null>(null)

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return users.filter((u) => {
      const matchesSearch =
        term === '' ||
        u.name.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term)
      const matchesRole = role === 'all' || u.role === role
      return matchesSearch && matchesRole
    })
  }, [users, search, role])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const safePage = Math.min(currentPage, totalPages)
  const start = (safePage - 1) * PER_PAGE
  const end = start + PER_PAGE
  const pageData = filtered.slice(start, end)

  const handleAdd = useCallback(() => {
    setUserToEdit(null)
    setIsFormOpen(true)
  }, [])

  const handleEdit = useCallback((user: User) => {
    setUserToEdit(user)
    setIsFormOpen(true)
  }, [])

  const handleView = useCallback((user: User) => {
    setUserToView(user)
    setIsViewOpen(true)
  }, [])

  const handleDelete = useCallback((user: User) => {
    setUsers((prev) => prev.filter((u) => u.id !== user.id))
    toaster.createSuccess('Sucesso', `Usuário ${user.name} excluído.`)
  }, [])

  const handleSubmit = useCallback(
    (data: UserFormPayload) => {
      if (data.mode === 'edit' && userToEdit) {
        setUsers((prev) =>
          prev.map((u) =>
            u.id === userToEdit.id
              ? {
                  ...u,
                  name: data.name,
                  email: data.email,
                  role: data.role,
                  status: data.status,
                }
              : u,
          ),
        )
        toaster.createSuccess('Sucesso', 'Usuário atualizado.')
      } else if (data.mode === 'create') {
        const newId = Math.max(...users.map((u) => u.id), 0) + 1
        const newUser: User = {
          id: newId,
          name: data.name,
          email: data.email,
          data_nascimento: data.data_nascimento,
          role: data.role,
          status: 'Ativo',
          last_access: null,
          created_at: new Date().toISOString(),
        }
        setUsers((prev) => [newUser, ...prev])
        toaster.createSuccess('Sucesso', 'Usuário cadastrado.')
      }
      setIsFormOpen(false)
      setUserToEdit(null)
    },
    [userToEdit, users],
  )

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value)
    setCurrentPage(1)
  }, [])

  const handleRoleChange = useCallback((value: string) => {
    setRole(value)
    setCurrentPage(1)
  }, [])

  return (
    <Card className="rounded-2xl border border-border shadow-sm">
      <CardContent className="p-6">
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-accent text-primary flex h-9 w-9 items-center justify-center rounded-lg">
              <Users className="size-4" />
            </div>
            <h3 className="text-heading text-lg font-semibold">
              Usuários Cadastrados
            </h3>
          </div>

          <UsersFilterBar
            onRoleChange={handleRoleChange}
            onSearchChange={handleSearchChange}
            role={role}
            search={search}
          />
        </header>

        <div className="mt-4">
          <UsersTable
            currentPage={safePage}
            endIndex={Math.min(end, filtered.length)}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onPageChange={setCurrentPage}
            onView={handleView}
            startIndex={filtered.length === 0 ? 0 : start + 1}
            total={filtered.length}
            totalPages={totalPages}
            users={pageData}
          />
        </div>

        <div className="mt-4 flex justify-end">
          <Button
            className="gap-2 rounded-md px-4"
            onClick={handleAdd}
            variant="primary"
          >
            <Plus className="size-4" />
            Novo usuário
          </Button>
        </div>
      </CardContent>

      <UserFormModal
        key={userToEdit ? `edit-${userToEdit.id}` : 'create'}
        onOpenChange={setIsFormOpen}
        onSubmit={handleSubmit}
        open={isFormOpen}
        userToEdit={userToEdit}
      />

      <ViewUserModal
        onOpenChange={setIsViewOpen}
        open={isViewOpen}
        user={userToView}
      />
    </Card>
  )
}
