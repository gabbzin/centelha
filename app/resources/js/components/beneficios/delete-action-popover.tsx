import { Trash2 } from 'lucide-react'
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
import { cn } from '@/lib/utils'

interface DeleteActionPopoverProps {
  onDelete: () => void
  ariaLabel?: string
}

export function DeleteActionPopover({
  onDelete,
  ariaLabel,
}: DeleteActionPopoverProps) {
  const [open, setOpen] = useState(false)

  const handleConfirm = () => {
    onDelete()
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        className={cn(
          'flex size-8 items-center justify-center rounded-md transition-colors',
          'bg-red-50 text-red-600 hover:bg-red-100',
        )}
        aria-label={ariaLabel}
      >
        <Trash2 className="size-4" />
      </PopoverTrigger>
      <PopoverContent side="top" align="end" sideOffset={8} className="w-64">
        <PopoverHeader>
          <PopoverTitle className="text-sm">Excluir benefício</PopoverTitle>
          <PopoverDescription className="text-xs">
            Tem certeza? Esta ação não pode ser desfeita.
          </PopoverDescription>
        </PopoverHeader>
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="h-8 text-xs"
            onClick={handleConfirm}
          >
            Excluir
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
