import { useCallback, useState } from 'react';
import { BenefitFormModal } from './create-benefit-modal';
import { ViewBenefitModal } from './view-benefit-modal';
import { StockFilterBar } from './stock-filter-bar';
import { StockSectionHeader } from './stock-section-header';
import { StockTable } from './stock-table';
import { toaster } from '@/components/toasters/toast-alert';
import type { Benefit, PaginatedBenefits } from './types';
import { router } from '@inertiajs/react';

interface StockControlSectionProps {
  benefits: PaginatedBenefits;
}

interface StockControlSectionProps {
  benefits?: PaginatedBenefits;
  texts?: Record<string, string>;
}

export function StockControlSection({ benefits, texts = {} }: StockControlSectionProps) {
  const t = (key: string, fallback: string) => texts[key] ?? fallback;
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [isViewOpen, setIsViewOpen] = useState(false);
  const [benefitToView, setBenefitToView] = useState<Benefit | null>(null);

  const searchParams = new URLSearchParams(window.location.search);
  const [search, setSearch] = useState(searchParams.get('search') ?? '');
  const [category, setCategory] = useState(searchParams.get('category') ?? 'all');

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    router.get(
      '/beneficios',
      { search: value, category, page: 1 },
      { preserveState: true, preserveScroll: true, replace: true },
    );
  }, [category]);

  const handleCategoryChange = useCallback((value: string) => {
    setCategory(value);
    router.get(
      '/beneficios',
      { search, category: value, page: 1 },
      { preserveState: true, preserveScroll: true, replace: true },
    );
  }, [search]);

  const handlePageChange = useCallback((page: number) => {
    router.get(
      '/beneficios',
      { search, category, page },
      { preserveState: true, preserveScroll: true, replace: true },
    );
  }, [search, category]);

  const handleView = useCallback((benefit: Benefit) => {
    setBenefitToView(benefit);
    setIsViewOpen(true);
  }, []);

  const handleEdit = useCallback((benefit: Benefit) => {
    setBenefitToEdit(benefit);
    setIsFormOpen(true);
  }, []);

  const handleDelete = useCallback((benefit: Benefit) => {
    router.delete(`/beneficios/${benefit.id}`, {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        toaster.createSuccess('Sucesso', 'Benefício excluído com sucesso!');
      },
      onError: () => {
        toaster.createError('Erro', 'Não foi possível excluir o benefício.');
      },
    });
  }, []);

  const handleAdd = useCallback(() => {
    setBenefitToEdit(null);
    setIsFormOpen(true);
  }, []);

  const handleCloseFormModal = useCallback(() => {
    setIsFormOpen(false);
    setBenefitToEdit(null);
  }, []);

  return (
    <section className="space-y-0">
      <StockSectionHeader
        title={t('section_title', 'Controle de estoque')}
        subtitle={t('section_subtitle', 'Gerencie, edite e acompanhe a disponibilidade dos benefícios do centro.')}
      />

      <StockFilterBar
        search={search}
        onSearchChange={handleSearchChange}
        category={category}
        onCategoryChange={handleCategoryChange}
        onAdd={handleAdd}
        searchPlaceholder={t('search_placeholder', 'Buscar por benefícios...')}
        addButtonLabel={t('add_button', 'Adicionar novo benefício')}
      />

      <div className="mt-4">
        <StockTable
          benefits={benefits.data}
          startIndex={benefits.from ?? 1}
          endIndex={benefits.to ?? benefits.data.length}
          total={benefits.total}
          currentPage={benefits.current_page}
          totalPages={benefits.last_page}
          onPageChange={handlePageChange}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <BenefitFormModal
        key={benefitToEdit ? `edit-${benefitToEdit.id}` : 'create'}
        open={isFormOpen}
        onOpenChange={handleCloseFormModal}
        benefitToEdit={benefitToEdit}
      />

      <ViewBenefitModal
        benefit={benefitToView}
        open={isViewOpen}
        onOpenChange={setIsViewOpen}
      />
    </section>
  );
}
