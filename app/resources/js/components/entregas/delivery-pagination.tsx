import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DeliveryPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

type PageItem =
  | {
      key: string
      type: 'ellipsis'
    }
  | {
      key: string
      type: 'page'
      value: number
    }

function getPageNumbers(current: number, total: number): PageItem[] {
  if (total <= 5) {
    return Array.from(
      {
        length: total,
      },
      (_, i) => ({
        key: String(i + 1),
        type: 'page' as const,
        value: i + 1,
      }),
    )
  }
  const pages: PageItem[] = [
    {
      key: '1',
      type: 'page',
      value: 1,
    },
  ]
  if (current > 3) {
    pages.push({
      key: 'ellipsis-start',
      type: 'ellipsis',
    })
  }
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) {
    pages.push({
      key: String(i),
      type: 'page',
      value: i,
    })
  }
  if (current < total - 2) {
    pages.push({
      key: 'ellipsis-end',
      type: 'ellipsis',
    })
  }
  pages.push({
    key: String(total),
    type: 'page',
    value: total,
  })
  return pages
}

export function DeliveryPagination({
  currentPage,
  totalPages,
  onPageChange,
}: DeliveryPaginationProps) {
  if (totalPages <= 1) return null
  const pages = getPageNumbers(currentPage, totalPages)
  return (
    <nav aria-label="Paginação" className="flex items-center gap-1">
      <button
        aria-label="Página anterior"
        className="border-border text-foreground/70 hover:bg-muted flex size-8 items-center justify-center rounded-md border transition-colors disabled:cursor-not-allowed disabled:opacity-40"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        type="button"
      >
        <ChevronLeft className="size-4" />
      </button>

      {pages.map((item) =>
        item.type === 'ellipsis' ? (
          <span
            key={item.key}
            className="text-foreground/50 flex size-8 items-center justify-center"
          >
            <MoreHorizontal className="size-4" />
          </span>
        ) : (
          <button
            key={item.key}
            aria-current={item.value === currentPage ? 'page' : undefined}
            aria-label={`Página ${item.value}`}
            className={cn(
              'flex size-8 items-center justify-center rounded-md text-sm font-medium transition-colors',
              item.value === currentPage
                ? 'bg-primary text-white'
                : 'border-border text-foreground/70 hover:bg-muted border',
            )}
            onClick={() => onPageChange(item.value)}
            type="button"
          >
            {item.value}
          </button>
        ),
      )}

      <button
        aria-label="Próxima página"
        className="border-border text-foreground/70 hover:bg-muted flex size-8 items-center justify-center rounded-md border transition-colors disabled:cursor-not-allowed disabled:opacity-40"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        type="button"
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  )
}
