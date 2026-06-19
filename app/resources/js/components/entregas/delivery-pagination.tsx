import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
interface DeliveryPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
function getPageNumbers(
  current: number,
  total: number,
): (number | 'ellipsis')[] {
  if (total <= 5) {
    return Array.from(
      {
        length: total,
      },
      (_, i) => i + 1,
    );
  }
  const pages: (number | 'ellipsis')[] = [1];
  if (current > 3) {
    pages.push('ellipsis');
  }
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  if (current < total - 2) {
    pages.push('ellipsis');
  }
  pages.push(total);
  return pages;
}
export function DeliveryPagination({
  currentPage,
  totalPages,
  onPageChange,
}: DeliveryPaginationProps) {
  if (totalPages <= 1) return null;
  const pages = getPageNumbers(currentPage, totalPages);
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

      {pages.map((page, idx) =>
        page === 'ellipsis' ? (
          <span
            key={`ellipsis-${idx}`}
            className="text-foreground/50 flex size-8 items-center justify-center"
          >
            <MoreHorizontal className="size-4" />
          </span>
        ) : (
          <button
            key={page}
            aria-current={page === currentPage ? 'page' : undefined}
            aria-label={`Página ${page}`}
            className={cn(
              'flex size-8 items-center justify-center rounded-md text-sm font-medium transition-colors',
              page === currentPage
                ? 'bg-primary text-white'
                : 'border-border text-foreground/70 hover:bg-muted border',
            )}
            onClick={() => onPageChange(page)}
            type="button"
          >
            {page}
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
  );
}
