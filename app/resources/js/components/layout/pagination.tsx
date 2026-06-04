import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';
interface PaginationConsulProps {
  links: {
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
  }[];
  prev_page_url: string | null;
  next_page_url: string | null;
}
export function PaginationConsul({
  links,
  prev_page_url,
  next_page_url,
}: PaginationConsulProps) {
  // Constantes
  const firstPageIndex = 1;
  const lastPageIndex = links.length - 2;
  const activeIndex = links.findIndex((link) => link.active);
  const active = activeIndex !== -1 ? activeIndex : 1;
  const pagesToShow = 2;

  // Lógica de Gap (Buraco) para o final
  const lastMappedIndex = active + pagesToShow;

  // Só mostra a elipse se houver pelo menos 1 página escondida entre o primeiro link e o ativo
  const showEllipsisStart = active - firstPageIndex > 1;

  // Só mostra a elipse se houver pelo menos 1 página escondida entre o map e o último link
  const showEllipsisEnd = lastPageIndex - lastMappedIndex > 1;

  // Só mostra o último link fixo se o map não tiver alcançado ele
  const showLastItem = lastPageIndex - lastMappedIndex > 0;

  // Condição para o primeiro item (esconde se o ativo for o primeiro)
  const showFirstItem = !links[firstPageIndex].active;

  // Renderização
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={prev_page_url ?? undefined} text="" />
        </PaginationItem>
        {/* Oculta o primeiro link (caso ele seja ativo), deixei o trabalho pro map */}
        {showFirstItem && (
          <PaginationItem>
            <PaginationLink
              href={links[firstPageIndex].url ?? undefined}
              isActive={links[firstPageIndex].active}
            >
              {links[firstPageIndex].label}
            </PaginationLink>
          </PaginationItem>
        )}
        {showEllipsisStart && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {links.map((link, index) => {
          if (index === 0 || index === links.length - 1) {
            return null; // Ignora o primeiro e o último link (Previous e Next)
          }
          if (index < active) {
            return null; // Ignora os links anteriores ao ativo
          }
          if (index > active + pagesToShow) {
            return null; // Ignora os links posteriores ao ativo (exibe apenas 2 após o ativo)
          }
          return (
            <PaginationItem key={link.label}>
              <PaginationLink
                href={link.url ?? undefined}
                isActive={link.active}
              >
                {link.label}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        {/* Tiramos 3, para remover o gargalo e a separação entre os últimos */}
        <PaginationItem className={showEllipsisEnd ? '' : 'hidden'}>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            className={showLastItem ? '' : 'hidden'}
            href={links[lastPageIndex].url ?? undefined}
            isActive={links[lastPageIndex].active}
          >
            {links[lastPageIndex].label}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href={next_page_url ?? undefined} text="" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
