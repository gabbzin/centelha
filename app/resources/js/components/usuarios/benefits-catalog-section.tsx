import { Package, Plus } from 'lucide-react'
import { useCallback, useState } from 'react'
import { toaster } from '@/components/toasters/toast-alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { BenefitCard } from './benefit-card'
import { BenefitFormModal } from './benefit-form-modal'
import { MOCK_BENEFITS } from './data'
import type { Benefit, BenefitCategory } from './types'

export function BenefitsCatalogSection() {
  const [benefits, setBenefits] = useState<Benefit[]>(MOCK_BENEFITS)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [benefitToEdit, setBenefitToEdit] = useState<Benefit | null>(null)

  const handleAdd = useCallback(() => {
    setBenefitToEdit(null)
    setIsFormOpen(true)
  }, [])

  const handleEdit = useCallback((benefit: Benefit) => {
    setBenefitToEdit(benefit)
    setIsFormOpen(true)
  }, [])

  const handleDelete = useCallback((benefit: Benefit) => {
    if (typeof window !== 'undefined') {
      const confirmed = window.confirm(
        `Deseja realmente excluir o benefício "${benefit.name}"?`,
      )
      if (!confirmed) return
    }
    setBenefits((prev) => prev.filter((b) => b.id !== benefit.id))
    toaster.createSuccess('Sucesso', `Benefício "${benefit.name}" excluído.`)
  }, [])

  const handleSubmit = useCallback(
    (data: {
      name: string
      category: BenefitCategory
      description: string
    }) => {
      if (benefitToEdit) {
        setBenefits((prev) =>
          prev.map((b) => (b.id === benefitToEdit.id ? { ...b, ...data } : b)),
        )
        toaster.createSuccess('Sucesso', 'Benefício atualizado.')
      } else {
        const newId =
          benefits.length === 0 ? 1 : Math.max(...benefits.map((b) => b.id)) + 1
        const newBenefit: Benefit = {
          id: newId,
          ...data,
          created_at: new Date().toISOString(),
        }
        setBenefits((prev) => [newBenefit, ...prev])
        toaster.createSuccess('Sucesso', 'Benefício cadastrado.')
      }
      setIsFormOpen(false)
      setBenefitToEdit(null)
    },
    [benefitToEdit, benefits],
  )

  return (
    <Card className="rounded-2xl border border-border shadow-sm">
      <CardContent className="p-6">
        <header className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="bg-accent text-primary flex h-9 w-9 items-center justify-center rounded-lg">
                <Package className="size-4" />
              </div>
              <h3 className="text-heading text-lg font-semibold">
                Catálogo de Benefícios e Insumos
              </h3>
            </div>
            <p className="text-foreground/70 max-w-2xl text-sm">
              Crie, edite e organize a lista de auxílios (como cestas, kits e
              complementos) ofertados pela organização.
            </p>
          </div>

          <Button
            className="gap-2 rounded-md bg-emerald-600 px-4 hover:bg-emerald-700"
            onClick={handleAdd}
          >
            <Plus className="size-4" />
            Novo Benefício
          </Button>
        </header>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {benefits.map((benefit) => (
            <BenefitCard
              key={benefit.id}
              benefit={benefit}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      </CardContent>

      <BenefitFormModal
        key={benefitToEdit ? `edit-${benefitToEdit.id}` : 'create'}
        benefitToEdit={benefitToEdit}
        onOpenChange={setIsFormOpen}
        onSubmit={handleSubmit}
        open={isFormOpen}
      />
    </Card>
  )
}
