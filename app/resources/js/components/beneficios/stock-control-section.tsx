import { useCallback, useMemo, useState } from 'react';
import { CreateBenefitModal } from './create-benefit-modal';
import { BENEFITS, filterBenefits, paginate } from './data';
import { StockFilterBar } from './stock-filter-bar';
import { StockSectionHeader } from './stock-section-header';
import { StockTable } from './stock-table';
import type { Benefit } from './types';

const PAGE_SIZE = 8;

export function StockControlSection() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filtered = useMemo(() => filterBenefits(BENEFITS, { search, category }), [search, category]);

  const pagination = useMemo(() => paginate(filtered, currentPage, PAGE_SIZE), [filtered, currentPage]);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = useCallback((value: string) => {
    setCategory(value);
    setCurrentPage(1);
  }, []);

  const handleView = useCallback((benefit: Benefit) => {
    console.log('View:', benefit.code);
  }, []);

  const handleEdit = useCallback((benefit: Benefit) => {
    console.log('Edit:', benefit.code);
  }, []);

  const handleDelete = useCallback((benefit: Benefit) => {
    console.log('Delete:', benefit.code);
  }, []);

  const handleAdd = useCallback(() => {
    setIsCreateOpen(true);
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
          benefits={pagination.items}
          startIndex={pagination.startIndex}
          endIndex={pagination.endIndex}
          total={pagination.total}
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          onPageChange={setCurrentPage}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <CreateBenefitModal open={isCreateOpen} onOpenChange={setIsCreateOpen} />
    </section>
  );
}
