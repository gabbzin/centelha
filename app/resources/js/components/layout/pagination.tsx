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
  const first_page_index = 1; // Primeira paǵina pós (Previous)
  const lastPageIndex = links.length - 2; // Ignora o último link (Next)
  const active = links.findIndex((link) => link.active);
  const pagesToShow = 2; // Quantidade de links a serem renderizados após o ativo

  // Verifica se deve mostrar a elipse antes dos últimos links
  const ellipsisIndex = lastPageIndex - pagesToShow - 1;
  const shouldShowEllipsis =
    ellipsisIndex > first_page_index && !links[ellipsisIndex].active;

  // Verifica se deve mostrar o último link (caso ele seja ativo, não mostra)
  const shouldLastItem = lastPageIndex > active + pagesToShow;

  // Renderização
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={prev_page_url ?? undefined} text="" />
        </PaginationItem>
        {/* Ocula o primeiro link (caso ele seja ativo), deixei o trabalho pro map */}
        <PaginationItem
          className={links[first_page_index].active ? 'hidden' : 'block'}
        >
          <PaginationLink
            href={links[first_page_index].url ?? undefined}
            isActive={links[first_page_index].active}
          >
            {links[first_page_index].label}
          </PaginationLink>
        </PaginationItem>
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
        <PaginationItem className={shouldShowEllipsis ? 'block' : 'hidden'}>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            className={shouldLastItem ? '' : 'hidden'}
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
