import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  ROLE_OPTIONS_FORM,
  STATUS_OPTIONS_FORM,
  type User,
  type UserRole,
  type UserStatus,
} from './types'

export type CreateUserPayload = {
  mode: 'create'
  name: string
  email: string
  data_nascimento: string
  role: UserRole
  admin_password: string
}

export type EditUserPayload = {
  mode: 'edit'
  name: string
  email: string
  role: UserRole
  status: UserStatus
}

export type UserFormPayload = CreateUserPayload | EditUserPayload

interface UserFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userToEdit?: User | null
  onSubmit: (data: UserFormPayload) => void
}

export function UserFormModal({
  open,
  onOpenChange,
  userToEdit,
  onSubmit,
}: UserFormModalProps) {
  const isEdit = !!userToEdit

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent
        className="max-w-lg gap-0 p-0 sm:max-w-lg"
        showCloseButton={false}
      >
        {isEdit && userToEdit ? (
          <EditUserForm onCancel={() => onOpenChange(false)} onSubmit={onSubmit} userToEdit={userToEdit} />
        ) : (
          <CreateUserForm onCancel={() => onOpenChange(false)} onSubmit={onSubmit} />
        )}
      </DialogContent>
    </Dialog>
  )
}

function CreateUserForm({
  onCancel,
  onSubmit,
}: {
  onCancel: () => void
  onSubmit: (data: CreateUserPayload) => void
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<UserRole>('Operador')
  const [dataNascimento, setDataNascimento] = useState('')
  const [adminPassword, setAdminPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!role) return
    onSubmit({
      mode: 'create',
      name,
      email,
      data_nascimento: dataNascimento,
      role,
      admin_password: adminPassword,
    })
  }

  return (
    <form className="flex max-h-[90vh] flex-col" onSubmit={handleSubmit}>
      <div className="overflow-y-auto px-8 py-6">
        <DialogTitle className="text-center text-2xl font-bold tracking-[-0.03em] uppercase">
          Novo usuário
        </DialogTitle>
        <DialogDescription className="sr-only">
          Preencha os campos abaixo para cadastrar um novo usuário.
        </DialogDescription>

        <div className="mt-6 space-y-4">
          <FormField label="Nome completo" required>
            <Input
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome do usuário"
              required
              value={name}
            />
          </FormField>

          <FormField label="E-mail" required>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@centelha.org"
              required
              type="email"
              value={email}
            />
          </FormField>

          <FormField label="Data de nascimento" required>
            <Input
              onChange={(e) => setDataNascimento(e.target.value)}
              required
              type="date"
              value={dataNascimento}
            />
          </FormField>

          <FormField label="Perfil" required>
            <Select
              onValueChange={(v) => setRole(v as UserRole)}
              value={role}
            >
              <SelectTrigger className="border-border w-full border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ROLE_OPTIONS_FORM.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          <p className="text-muted-foreground text-xs">
            Uma senha de acesso será enviada por e-mail para o usuário
            concluir o cadastro.
          </p>

          <FormField label="Senha do administrador" required>
            <Input
              autoComplete="current-password"
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="Digite sua senha, precisamos confirmar sua senha para poder adicionar o usuário"
              required
              type="password"
              value={adminPassword}
            />
          </FormField>

          <p className="text-destructive text-xs font-semibold tracking-wide uppercase">
            Todos os campos com * são obrigatórios
          </p>
        </div>
      </div>

      <div className="border-border flex items-center justify-end gap-3 rounded-b-xl border-t bg-background px-8 py-4">
        <Button
          className="px-5"
          onClick={onCancel}
          type="button"
          variant="outline"
        >
          Cancelar
        </Button>
        <Button className="px-5" type="submit" variant="default">
          Cadastrar
        </Button>
      </div>
    </form>
  )
}

function EditUserForm({
  onCancel,
  onSubmit,
  userToEdit,
}: {
  onCancel: () => void
  onSubmit: (data: EditUserPayload) => void
  userToEdit: User
}) {
  const [name, setName] = useState(userToEdit.name)
  const [email, setEmail] = useState(userToEdit.email)
  const [role, setRole] = useState<UserRole>(userToEdit.role)
  const [status, setStatus] = useState<UserStatus>(userToEdit.status)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ mode: 'edit', name, email, role, status })
  }

  return (
    <form className="flex max-h-[90vh] flex-col" onSubmit={handleSubmit}>
      <div className="overflow-y-auto px-8 py-6">
        <DialogTitle className="text-center text-2xl font-bold tracking-[-0.03em] uppercase">
          Editar usuário
        </DialogTitle>
        <DialogDescription className="sr-only">
          Atualize os dados do usuário.
        </DialogDescription>

        <div className="mt-6 space-y-4">
          <FormField label="Nome completo" required>
            <Input
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome do usuário"
              required
              value={name}
            />
          </FormField>

          <FormField label="E-mail" required>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@centelha.org"
              required
              type="email"
              value={email}
            />
          </FormField>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField label="Perfil" required>
              <Select
                onValueChange={(v) => setRole(v as UserRole)}
                value={role}
              >
                <SelectTrigger className="border-border w-full border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ROLE_OPTIONS_FORM.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField label="Status" required>
              <Select
                onValueChange={(v) => setStatus(v as UserStatus)}
                value={status}
              >
                <SelectTrigger className="border-border w-full border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS_FORM.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          </div>

          <p className="text-destructive text-xs font-semibold tracking-wide uppercase">
            Todos os campos com * são obrigatórios
          </p>
        </div>
      </div>

      <div className="border-border flex items-center justify-end gap-3 rounded-b-xl border-t bg-background px-8 py-4">
        <Button
          className="px-5"
          onClick={onCancel}
          type="button"
          variant="outline"
        >
          Cancelar
        </Button>
        <Button className="gap-2 px-5" type="submit" variant="default">
          Salvar Alterações
        </Button>
      </div>
    </form>
  )
}

interface FormFieldProps {
  label: string
  required?: boolean
  children: React.ReactNode
}

function FormField({ label, required, children }: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {children}
    </div>
  )
}
