import { Check } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import type { Benefit, BenefitCategory } from './types'

const CATEGORY_OPTIONS: { value: BenefitCategory; label: string }[] = [
  { value: 'Alimentação', label: 'Alimentação' },
  { value: 'Gás', label: 'Gás' },
  { value: 'Higiene', label: 'Higiene' },
  { value: 'Vestuário', label: 'Vestuário' },
  { value: 'Educação', label: 'Educação' },
  { value: 'Emergência', label: 'Emergência' },
]

interface BenefitFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  benefitToEdit?: Benefit | null
  onSubmit: (data: {
    name: string
    category: BenefitCategory
    description: string
  }) => void
}

export function BenefitFormModal({
  open,
  onOpenChange,
  benefitToEdit,
  onSubmit,
}: BenefitFormModalProps) {
  const isEdit = !!benefitToEdit

  const [name, setName] = useState('')
  const [category, setCategory] = useState<BenefitCategory>('Alimentação')
  const [description, setDescription] = useState('')

  const reset = useCallback(() => {
    setName('')
    setCategory('Alimentação')
    setDescription('')
  }, [])

  useEffect(() => {
    if (isEdit && benefitToEdit) {
      setName(benefitToEdit.name)
      setCategory(benefitToEdit.category)
      setDescription(benefitToEdit.description)
    } else if (open) {
      reset()
    }
  }, [isEdit, benefitToEdit, open, reset])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name, category, description })
  }

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent
        className="max-w-lg gap-0 p-0 sm:max-w-lg"
        showCloseButton={false}
      >
        <form className="flex max-h-[90vh] flex-col" onSubmit={handleSubmit}>
          <div className="overflow-y-auto px-8 py-6">
            <DialogTitle className="text-center text-2xl font-bold tracking-[-0.03em] uppercase">
              {isEdit ? 'Editar benefício' : 'Novo benefício'}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {isEdit
                ? 'Atualize os dados do benefício.'
                : 'Preencha os campos abaixo para cadastrar um novo benefício no catálogo.'}
            </DialogDescription>

            <div className="mt-6 space-y-4">
              <FormField label="Nome do benefício" required>
                <Input
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Cesta Básica, Kit Gás, Auxílio Emergencial"
                  required
                  value={name}
                />
              </FormField>

              <FormField label="Categoria" required>
                <Select
                  onValueChange={(v) => setCategory(v as BenefitCategory)}
                  value={category}
                >
                  <SelectTrigger className="border-border w-full border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORY_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="Descrição" required>
                <Textarea
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descreva brevemente o benefício..."
                  required
                  rows={4}
                  value={description}
                />
              </FormField>

              <p className="text-destructive text-xs font-semibold tracking-wide uppercase">
                Todos os campos com * são obrigatórios
              </p>
            </div>
          </div>

          <div className="border-border flex items-center justify-end gap-3 rounded-b-xl border-t bg-background px-8 py-4">
            <Button
              className="px-5"
              onClick={() => onOpenChange(false)}
              type="button"
              variant="outline"
            >
              Cancelar
            </Button>
            <Button className="gap-2 px-5" type="submit" variant="default">
              <Check className="size-4" />
              {isEdit ? 'Salvar Alterações' : 'Concluir Cadastro'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

interface FormFieldProps {
  label: string
  required?: boolean
  children: React.ReactNode
}

function FormField({ label, required, children }: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {children}
    </div>
  )
}
