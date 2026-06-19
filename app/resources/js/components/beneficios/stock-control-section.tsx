import { useCallback, useMemo, useState } from 'react'
import { CreateBenefitModal } from './create-benefit-modal'
import { BENEFITS, filterBenefits, paginate } from './data'
import { StockFilterBar } from './stock-filter-bar'
import { StockSectionHeader } from './stock-section-header'
import { StockTable } from './stock-table'
import type { Benefit } from './types'

const PAGE_SIZE = 8
export function StockControlSection() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const filtered = useMemo(
    () =>
      filterBenefits(BENEFITS, {
        search,
        category,
      }),
    [search, category],
  )
  const pagination = useMemo(
    () => paginate(filtered, currentPage, PAGE_SIZE),
    [filtered, currentPage],
  )
  const handleSearchChange = useCallback((value: string) => {
    setSearch(value)
    setCurrentPage(1)
  }, [])
  const handleCategoryChange = useCallback((value: string) => {
    setCategory(value)
    setCurrentPage(1)
  }, [])
  const handleView = useCallback((benefit: Benefit) => {
    console.log('View:', benefit.code)
  }, [])
  const handleEdit = useCallback((benefit: Benefit) => {
    console.log('Edit:', benefit.code)
  }, [])
  const handleDelete = useCallback((benefit: Benefit) => {
    console.log('Delete:', benefit.code)
  }, [])
  const handleAdd = useCallback(() => {
    setIsCreateOpen(true)
  }, [])
  return (
    <section className="space-y-0">
      <StockSectionHeader
        subtitle="Gerencie, edite e acompanhe a disponibilidade dos benefícios do centro."
        title="Controle de estoque"
      />

      <StockFilterBar
        category={category}
        onAdd={handleAdd}
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
        search={search}
      />

      <div className="mt-4">
        <StockTable
          benefits={pagination.items}
          currentPage={currentPage}
          endIndex={pagination.endIndex}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onPageChange={setCurrentPage}
          onView={handleView}
          startIndex={pagination.startIndex}
          total={pagination.total}
          totalPages={pagination.totalPages}
        />
      </div>

      <CreateBenefitModal onOpenChange={setIsCreateOpen} open={isCreateOpen} />
    </section>
  )
}
