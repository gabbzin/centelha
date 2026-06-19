import { router } from '@inertiajs/react'
import { useCallback, useState } from 'react'
import { toaster } from '@/components/toasters/toast-alert'
import { BenefitFormModal } from './create-benefit-modal'
import { StockFilterBar } from './stock-filter-bar'
import { StockSectionHeader } from './stock-section-header'
import { StockTable } from './stock-table'
import type { Benefit, PaginatedBenefits } from './types'
import { ViewBenefitModal } from './view-benefit-modal'

interface StockControlSectionProps {
  benefits: PaginatedBenefits
}

export function StockControlSection({ benefits }: StockControlSectionProps) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [benefitToEdit, setBenefitToEdit] = useState<Benefit | null>(null)

  const [isViewOpen, setIsViewOpen] = useState(false)
  const [benefitToView, setBenefitToView] = useState<Benefit | null>(null)

  const searchParams = new URLSearchParams(window.location.search)
  const [search, setSearch] = useState(searchParams.get('search') ?? '')
  const [category, setCategory] = useState(
    searchParams.get('category') ?? 'all',
  )

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearch(value)
      router.get(
        '/beneficios',
        { search: value, category, page: 1 },
        { preserveState: true, preserveScroll: true, replace: true },
      )
    },
    [category],
  )

  const handleCategoryChange = useCallback(
    (value: string) => {
      setCategory(value)
      router.get(
        '/beneficios',
        { search, category: value, page: 1 },
        { preserveState: true, preserveScroll: true, replace: true },
      )
    },
    [search],
  )

  const handlePageChange = useCallback(
    (page: number) => {
      router.get(
        '/beneficios',
        { search, category, page },
        { preserveState: true, preserveScroll: true, replace: true },
      )
    },
    [search, category],
  )

  const handleView = useCallback((benefit: Benefit) => {
    setBenefitToView(benefit)
    setIsViewOpen(true)
  }, [])

  const handleEdit = useCallback((benefit: Benefit) => {
    setBenefitToEdit(benefit)
    setIsFormOpen(true)
  }, [])

  const handleDelete = useCallback((benefit: Benefit) => {
    router.delete(`/beneficios/${benefit.id}`, {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        toaster.createSuccess('Sucesso', 'Benefício excluído com sucesso!')
      },
      onError: () => {
        toaster.createError('Erro', 'Não foi possível excluir o benefício.')
      },
    })
  }, [])

  const handleAdd = useCallback(() => {
    setBenefitToEdit(null)
    setIsFormOpen(true)
  }, [])

  const handleCloseFormModal = useCallback(() => {
    setIsFormOpen(false)
    setBenefitToEdit(null)
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
          benefits={benefits.data}
          currentPage={benefits.current_page}
          endIndex={benefits.to ?? benefits.data.length}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onPageChange={handlePageChange}
          onView={handleView}
          startIndex={benefits.from ?? 1}
          total={benefits.total}
          totalPages={benefits.last_page}
        />
      </div>

      <BenefitFormModal
        key={benefitToEdit ? `edit-${benefitToEdit.id}` : 'create'}
        benefitToEdit={benefitToEdit}
        onOpenChange={handleCloseFormModal}
        open={isFormOpen}
      />

      <ViewBenefitModal
        benefit={benefitToView}
        onOpenChange={setIsViewOpen}
        open={isViewOpen}
      />
    </section>
  )
}
