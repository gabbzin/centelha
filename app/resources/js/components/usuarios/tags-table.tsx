import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TagsTableRow } from './tags-table-row'
import type { PaginatedTags, Tag } from './types'

interface TagsTableProps {
  onDelete: (tag: Tag) => void
  onEdit: (tag: Tag) => void
  tags: PaginatedTags
}

export function TagsTable({ onDelete, onEdit, tags }: TagsTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Cor</TableHead>
            <TableHead className="hidden md:table-cell">Ícone</TableHead>
            <TableHead className="w-24 text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tags.data.length === 0 ? (
            <TableRow>
              <td
                className="text-muted-foreground px-4 py-8 text-center"
                colSpan={4}
              >
                Nenhuma tag encontrada.
              </td>
            </TableRow>
          ) : (
            tags.data.map((tag) => (
              <TagsTableRow
                key={tag.id}
                onDelete={onDelete}
                onEdit={onEdit}
                tag={tag}
              />
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
