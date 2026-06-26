import { router } from '@inertiajs/react'
import { Plus, Users } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { toaster } from '@/components/toasters/toast-alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { PaginatedUsers, User, UserRole, UserStatus } from './types'
import { UserFormModal } from './user-form-modal'
import { UsersFilterBar } from './users-filter-bar'
import { UsersTable } from './users-table'
import { ViewUserModal } from './view-user-modal'

interface UsersSectionProps {
  users: PaginatedUsers
}

export function UsersSection({ users }: UsersSectionProps) {
  const [search, setSearch] = useState('')
  const [role, setRole] = useState<string>('all')

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [userToEdit, setUserToEdit] = useState<User | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [userToView, setUserToView] = useState<User | null>(null)

  const isFirstRender = useRef(true)

  const reload = useCallback((params: Record<string, string | number>) => {
    router.get(route('gestao-sistema.usuarios-beneficios'), params, {
      preserveState: true,
      preserveScroll: true,
      replace: true,
    })
  }, [])

  const buildParams = useCallback(
    (page: number) => {
      const params: Record<string, string | number> = { page }
      if (search.trim()) params.search = search.trim()
      if (role !== 'all') params.role = role
      return params
    },
    [search, role],
  )

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    const t = setTimeout(() => reload(buildParams(1)), 300)
    return () => clearTimeout(t)
  }, [search, role, buildParams, reload])

  const handlePageChange = useCallback(
    (page: number) => reload(buildParams(page)),
    [buildParams, reload],
  )

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
    router.delete(route('usuarios.deactivate', user.id), {
      preserveScroll: true,
    })
  }, [])

  const handleSubmit = useCallback(
    (data: {
      name: string
      email: string
      role: UserRole
      status: UserStatus
    }) => {
      if (userToEdit) {
        router.put(
          route('usuarios.update', userToEdit.id),
          {
            name: data.name,
            email: data.email,
            role: data.role,
            ativo: data.status === 'Ativo',
          },
          {
            preserveScroll: true,
            onSuccess: () => {
              setIsFormOpen(false)
              setUserToEdit(null)
            },
            onError: (errors) => {
              const first = Object.values(errors)[0] as string | undefined
              toaster.createError(
                'Erro',
                first ?? 'Não foi possível atualizar.',
              )
            },
          },
        )
      } else {
        router.post(
          route('usuarios.store'),
          {
            name: data.name,
            email: data.email,
            role: data.role,
          },
          {
            preserveScroll: true,
            onSuccess: () => {
              setIsFormOpen(false)
              setUserToEdit(null)
            },
            onError: (errors) => {
              const first = Object.values(errors)[0] as string | undefined
              toaster.createError(
                'Erro',
                first ?? 'Não foi possível cadastrar.',
              )
            },
          },
        )
      }
    },
    [userToEdit],
  )

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
            onRoleChange={setRole}
            onSearchChange={setSearch}
            role={role}
            search={search}
          />
        </header>

        <div className="mt-4">
          <UsersTable
            currentPage={users.current_page}
            endIndex={users.to ?? 0}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onPageChange={handlePageChange}
            onView={handleView}
            startIndex={users.from ?? 0}
            total={users.total}
            totalPages={users.last_page}
            users={users.data}
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
