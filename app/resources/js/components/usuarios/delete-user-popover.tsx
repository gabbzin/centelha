import { UserX } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '@/components/ui/popover'

interface DeleteUserPopoverProps {
  userName: string
  onDelete: () => void
}

export function DeleteUserPopover({
  userName,
  onDelete,
}: DeleteUserPopoverProps) {
  const [open, setOpen] = useState(false)

  const handleConfirm = () => {
    onDelete()
    setOpen(false)
  }

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger
        aria-label={`Desativar ${userName}`}
        className="bg-red-50 text-red-600 hover:bg-red-100 flex size-8 items-center justify-center rounded-md transition-colors"
      >
        <UserX className="size-4" />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64" side="top" sideOffset={8}>
        <PopoverHeader>
          <PopoverTitle className="text-sm">Desativar usuário</PopoverTitle>
          <PopoverDescription className="text-xs">
            Tem certeza que deseja desativar <strong>{userName}</strong>? O
            usuário perderá o acesso ao sistema.
          </PopoverDescription>
        </PopoverHeader>
        <div className="mt-2 flex justify-end gap-2">
          <Button
            className="h-8 text-xs"
            onClick={() => setOpen(false)}
            size="sm"
            variant="outline"
          >
            Cancelar
          </Button>
          <Button
            className="h-8 text-xs"
            onClick={handleConfirm}
            size="sm"
            variant="destructive"
          >
            Desativar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
