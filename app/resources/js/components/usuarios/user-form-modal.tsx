import { Check } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
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

interface UserFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userToEdit?: User | null
  onSubmit: (data: {
    name: string
    email: string
    role: UserRole
    status: UserStatus
  }) => void
}

export function UserFormModal({
  open,
  onOpenChange,
  userToEdit,
  onSubmit,
}: UserFormModalProps) {
  const isEdit = !!userToEdit

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<UserRole>('Operador')
  const [status, setStatus] = useState<UserStatus>('Ativo')

  const reset = useCallback(() => {
    setName('')
    setEmail('')
    setRole('Operador')
    setStatus('Ativo')
  }, [])

  useEffect(() => {
    if (isEdit && userToEdit) {
      setName(userToEdit.name)
      setEmail(userToEdit.email)
      setRole(userToEdit.role)
      setStatus(userToEdit.status)
    } else if (open) {
      reset()
    }
  }, [isEdit, userToEdit, open, reset])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name, email, role, status })
  }

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent
        className="max-w-lg gap-0 p-0 sm:max-w-lg"
        showCloseButton={false}
      >
        <form className="flex max-h-[90vh] flex-col" onSubmit={handleSubmit}>
          <div className="overflow-y-auto px-8 py-6">
            <DialogTitle className="text-center text-2xl font-bold tracking-[-0.03em] uppercase">
              {isEdit ? 'Editar usuário' : 'Novo usuário'}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {isEdit
                ? 'Atualize os dados do usuário.'
                : 'Preencha os campos abaixo para cadastrar um novo usuário.'}
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

              <div
                className={`grid grid-cols-1 gap-4 ${isEdit ? 'md:grid-cols-2' : ''}`}
              >
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

                {isEdit && (
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
                )}
              </div>

              {!isEdit && (
                <p className="text-muted-foreground text-xs">
                  Uma senha de acesso será enviada por e-mail para o usuário
                  concluir o cadastro.
                </p>
              )}

              <p className="text-destructive text-xs font-semibold tracking-wide uppercase">
                Todos os campos com * são obrigatórios
              </p>
            </div>
          </div>

          <div className="border-border flex items-center justify-end gap-3 rounded-b-xl border-t bg-background px-8 py-4">
            <Button
              className="px-5"
              onClick={() => onOpenChange(false)}
              type="button"
              variant="outline"
            >
              Cancelar
            </Button>
            <Button className="gap-2 px-5" type="submit" variant="default">
              <Check className="size-4" />
              {isEdit ? 'Salvar Alterações' : 'Concluir Cadastro'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
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
