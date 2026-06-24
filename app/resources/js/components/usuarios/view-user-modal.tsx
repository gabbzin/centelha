import { Mail, ShieldCheck, User as UserIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { formatLastAccess, getInitials } from './data'
import { RoleBadge } from './role-badge'
import { StatusBadge } from './status-badge'
import type { User } from './types'

interface ViewUserModalProps {
  user: User | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ViewUserModal({
  user,
  open,
  onOpenChange,
}: ViewUserModalProps) {
  if (!user) return null

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="max-w-lg gap-0 p-0 sm:max-w-lg">
        <div className="px-8 py-6">
          <DialogTitle className="text-center text-2xl font-bold tracking-[-0.03em] uppercase">
            Detalhes do Usuário
          </DialogTitle>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  'flex h-14 w-14 items-center justify-center rounded-full text-base font-semibold',
                  'bg-blue-100 text-blue-700',
                )}
              >
                {getInitials(user.name)}
              </div>
              <div>
                <p className="text-lg font-semibold">{user.name}</p>
                <p className="text-foreground/60 text-xs">ID: {user.id}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <RoleBadge role={user.role} />
              <StatusBadge status={user.status} />
            </div>

            <Card className="rounded-xl">
              <CardContent className="space-y-3 p-4">
                <div className="flex items-center gap-3">
                  <div className="bg-accent text-primary flex size-8 items-center justify-center rounded-lg">
                    <Mail className="size-4" />
                  </div>
                  <div>
                    <p className="text-foreground/60 text-xs">E-mail</p>
                    <p className="text-sm font-semibold">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-accent text-primary flex size-8 items-center justify-center rounded-lg">
                    <ShieldCheck className="size-4" />
                  </div>
                  <div>
                    <p className="text-foreground/60 text-xs">Perfil</p>
                    <p className="text-sm font-semibold">{user.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-accent text-primary flex size-8 items-center justify-center rounded-lg">
                    <UserIcon className="size-4" />
                  </div>
                  <div>
                    <p className="text-foreground/60 text-xs">Último acesso</p>
                    <p className="text-sm font-semibold">
                      {formatLastAccess(user.last_access)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
