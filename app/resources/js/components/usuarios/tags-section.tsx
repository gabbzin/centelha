import { Tags } from 'lucide-react'
import { useCallback, useState } from 'react'
import { router } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { TagsTable } from './tags-table'
import { TagFormModal } from './tag-form-modal'
import type { PaginatedTags, Tag } from './types'

interface TagsSectionProps {
  tags: PaginatedTags
}

export function TagsSection({ tags }: TagsSectionProps) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [tagToEdit, setTagToEdit] = useState<Tag | null>(null)

  const handleAdd = useCallback(() => {
    setTagToEdit(null)
    setIsFormOpen(true)
  }, [])

  const handleEdit = useCallback((tag: Tag) => {
    setTagToEdit(tag)
    setIsFormOpen(true)
  }, [])

  const handleDelete = useCallback((tag: Tag) => {
    if (typeof window !== 'undefined') {
      const confirmed = window.confirm(
        `Deseja realmente excluir a tag "${tag.name}"?`,
      )
      if (!confirmed) return
    }
    router.delete(`/tags/${tag.id}`, {
      preserveState: true,
      preserveScroll: true,
    })
  }, [])

  const handleSubmit = useCallback(
    (data: { name: string; color: string; icon: string | null }) => {
      if (tagToEdit) {
        router.put(
          `/tags/${tagToEdit.id}`,
          { ...data },
          {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
              setIsFormOpen(false)
              setTagToEdit(null)
            },
          },
        )
      } else {
        router.post(
          '/tags',
          { ...data },
          {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
              setIsFormOpen(false)
              setTagToEdit(null)
            },
          },
        )
      }
    },
    [tagToEdit],
  )

  return (
    <Card className="rounded-2xl border border-border shadow-sm">
      <CardContent className="p-6">
        <header className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="bg-accent text-primary flex h-9 w-9 items-center justify-center rounded-lg">
                <Tags className="size-4" />
              </div>
              <h3 className="text-heading text-lg font-semibold">
                Tags de Necessidades
              </h3>
            </div>
            <p className="text-foreground/70 max-w-2xl text-sm">
              Gerencie as tags utilizadas para classificar as necessidades
              específicas das famílias atendidas.
            </p>
          </div>

          <Button
            className="gap-2 rounded-md"
            onClick={handleAdd}
            variant="primary"
          >
            <Tags className="size-4" />
            Nova Tag
          </Button>
        </header>

        <div className="mt-6">
          <TagsTable
            onDelete={handleDelete}
            onEdit={handleEdit}
            tags={tags}
          />
        </div>
      </CardContent>

      <TagFormModal
        key={tagToEdit ? `edit-${tagToEdit.id}` : 'create'}
        onOpenChange={setIsFormOpen}
        onSubmit={handleSubmit}
        open={isFormOpen}
        tagToEdit={tagToEdit}
      />
    </Card>
  )
}
