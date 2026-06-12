import { useCallback, useState } from 'react';
import { BenefitFormModal } from './create-benefit-modal';
import { ViewBenefitModal } from './view-benefit-modal';
import { StockFilterBar } from './stock-filter-bar';
import { StockSectionHeader } from './stock-section-header';
import { StockTable } from './stock-table';
import type { Benefit, PaginatedBenefits } from './types';
import { router } from '@inertiajs/react';

interface StockControlSectionProps {
  benefits: PaginatedBenefits;
}

export function StockControlSection({ benefits }: StockControlSectionProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [benefitToEdit, setBenefitToEdit] = useState<Benefit | null>(null);

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
    if (confirm(`Tem certeza que deseja excluir o benefício "${benefit.name}"?`)) {
      router.delete(`/beneficios/${benefit.id}`, {
        preserveState: true,
        preserveScroll: true,
      });
    }
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
        title="Controle de estoque"
        subtitle="Gerencie, edite e acompanhe a disponibilidade dos benefícios do centro."
      />

      <StockFilterBar
        search={search}
        onSearchChange={handleSearchChange}
        category={category}
        onCategoryChange={handleCategoryChange}
        onAdd={handleAdd}
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
