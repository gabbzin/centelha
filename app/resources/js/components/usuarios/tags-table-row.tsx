import { PencilIcon, Trash2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Tag } from './types'

interface TagsTableRowProps {
  onDelete: (tag: Tag) => void
  onEdit: (tag: Tag) => void
  tag: Tag
}

export function TagsTableRow({ onDelete, onEdit, tag }: TagsTableRowProps) {
  return (
    <tr className="border-b transition-colors hover:bg-muted/50">
      <td className="px-4 py-3 text-sm font-medium">{tag.name}</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <div
            className="h-5 w-5 rounded-full border"
            style={{ backgroundColor: tag.color }}
          />
          <span className="text-muted-foreground text-xs">{tag.color}</span>
        </div>
      </td>
      <td className="hidden px-4 py-3 text-sm md:table-cell">
        {tag.icon ?? '—'}
      </td>
      <td className="px-4 py-3 text-right">
        <div className="flex items-center justify-end gap-1">
          <Button
            onClick={() => onEdit(tag)}
            size="icon"
            variant="ghost"
          >
            <PencilIcon className="size-4" />
          </Button>
          <Button
            onClick={() => onDelete(tag)}
            size="icon"
            variant="ghost"
          >
            <Trash2Icon className="size-4" />
          </Button>
        </div>
      </td>
    </tr>
  )
}
