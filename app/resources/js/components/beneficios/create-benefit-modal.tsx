import { router, usePage } from '@inertiajs/react'
import {
  Check,
  FileImage,
  ImageIcon,
  Minus,
  Plus,
  Trash2,
  User,
} from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { toaster } from '@/components/toasters/toast-alert'
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
import { cn } from '@/lib/utils'
import { CATEGORY_OPTIONS, formatIsoDateToInput } from './data'
import type { Benefit } from './types'

interface BenefitFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  benefitToEdit?: Benefit | null
}

const STATUS_OPTIONS = [
  { value: 'Ativo', label: 'Ativo' },
  { value: 'Revisão', label: 'Revisão' },
  { value: 'Inativo', label: 'Inativo' },
]

export function BenefitFormModal({
  open,
  onOpenChange,
  benefitToEdit,
}: BenefitFormModalProps) {
  const isEdit = !!benefitToEdit
  const { auth } = usePage().props as {
    auth: { user: { name: string } | null }
  }
  const currentUserName = auth.user?.name ?? 'Usuário'

  const [name, setName] = useState('')
  const [category, setCategory] = useState<string>('')
  const [stock, setStock] = useState(1)
  const [status, setStatus] = useState<string>('Ativo')
  const [donor, setDonor] = useState('')
  const [validity, setValidity] = useState('')
  const [notes, setNotes] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [removeImage, setRemoveImage] = useState(false)

  const reset = useCallback(() => {
    setName('')
    setCategory('')
    setStock(1)
    setStatus('Ativo')
    setDonor('')
    setValidity('')
    setNotes('')
    setImageFile(null)
    setIsDragging(false)
    setRemoveImage(false)
  }, [])

  useEffect(() => {
    if (isEdit && benefitToEdit) {
      setName(benefitToEdit.name)
      setCategory(benefitToEdit.category)
      setStock(benefitToEdit.stock)
      setStatus(benefitToEdit.status)
      setDonor(benefitToEdit.donor ?? '')
      setValidity(formatIsoDateToInput(benefitToEdit.validity) ?? '')
      setNotes(benefitToEdit.notes ?? '')
      setImageFile(null)
      setIsDragging(false)
      setRemoveImage(false)
    } else if (open) {
      reset()
    }
  }, [isEdit, benefitToEdit, open, reset])

  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (!next) reset()
      onOpenChange(next)
    },
    [onOpenChange, reset],
  )

  const increment = () => setStock((q) => Math.min(999, q + 1))
  const decrement = () => setStock((q) => Math.max(0, q - 1))

  const handleFileChange = (file: File | null) => {
    if (file && file.size <= 5 * 1024 * 1024) {
      setImageFile(file)
      setRemoveImage(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleFileChange(file ?? null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', name)
    formData.append('category', category)
    if (isEdit) {
      formData.append('stock', String(stock))
      formData.append('status', status)
    } else {
      formData.append('quantity', String(stock))
    }
    if (donor) formData.append('donor', donor)
    if (validity) formData.append('validity', validity)
    if (notes) formData.append('notes', notes)
    if (imageFile) formData.append('image', imageFile)
    if (isEdit && removeImage) formData.append('remove_image', '1')

    if (isEdit && benefitToEdit) {
      formData.append('_method', 'PUT')
      router.post(`/beneficios/${benefitToEdit.id}`, formData, {
        forceFormData: true,
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => {
          handleOpenChange(false)
          toaster.createSuccess('Sucesso', 'Benefício atualizado com sucesso!')
        },
        onError: () => {
          toaster.createError('Erro', 'Não foi possível atualizar o benefício.')
        },
      })
    } else {
      router.post('/beneficios', formData, {
        forceFormData: true,
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => {
          handleOpenChange(false)
          toaster.createSuccess('Sucesso', 'Benefício cadastrado com sucesso!')
        },
        onError: () => {
          toaster.createError('Erro', 'Não foi possível cadastrar o benefício.')
        },
      })
    }
  }

  const existingImageUrl =
    isEdit && benefitToEdit?.image_path && !removeImage
      ? `/storage/${benefitToEdit.image_path}`
      : null

  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogContent
        className="max-w-2xl gap-0 p-0 sm:max-w-2xl"
        showCloseButton={false}
      >
        <form className="flex max-h-[90vh] flex-col" onSubmit={handleSubmit}>
          <div className="overflow-y-auto px-8 py-6">
            <DialogTitle className="text-center text-2xl font-bold tracking-[-0.03em] uppercase">
              {isEdit ? 'Editar benefício' : 'Registrar novo benefício'}
            </DialogTitle>
            <DialogDescription className="sr-only">
              {isEdit
                ? 'Preencha os campos abaixo para editar o benefício.'
                : 'Preencha os campos abaixo para cadastrar um novo benefício no catálogo.'}
            </DialogDescription>

            <div className="mt-6 space-y-4">
              <FormField label="Nome do Benefício" required>
                <Input
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Cesta básica, Voucher, Auxílio Gás"
                  required
                  value={name}
                />
              </FormField>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField label="Categoria" required>
                  <Select onValueChange={setCategory} required value={category}>
                    <SelectTrigger className="border-border w-full border">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORY_OPTIONS.filter((o) => o.value !== 'all').map(
                        (option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField
                  label={
                    isEdit
                      ? 'Quantidade em estoque'
                      : 'Quantidade a ser adicionada'
                  }
                  required
                >
                  <div className="border-input flex h-9 items-stretch rounded-md border shadow-xs">
                    <button
                      aria-label="Diminuir quantidade"
                      className="text-foreground/70 hover:bg-muted flex w-10 items-center justify-center transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                      disabled={stock <= 0}
                      onClick={decrement}
                      type="button"
                    >
                      <Minus className="size-4" />
                    </button>
                    <div className="border-input flex flex-1 items-center justify-center border-x text-sm font-medium">
                      {stock}
                    </div>
                    <button
                      aria-label="Aumentar quantidade"
                      className="text-foreground/70 hover:bg-muted flex w-10 items-center justify-center transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                      disabled={stock >= 999}
                      onClick={increment}
                      type="button"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                </FormField>
              </div>

              {isEdit && (
                <FormField label="Status">
                  <Select onValueChange={setStatus} value={status}>
                    <SelectTrigger className="border-border w-full border">
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUS_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>
              )}

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField label="Doador/Origem">
                  <Input
                    onChange={(e) => setDonor(e.target.value)}
                    placeholder="Prefeitura, Empresa X"
                    value={donor}
                  />
                </FormField>

                <FormField label="Validade">
                  <Input
                    onChange={(e) => setValidity(e.target.value)}
                    placeholder="Adicione a validade, se for perecível"
                    type="date"
                    value={validity}
                  />
                </FormField>
              </div>

              <FormField label="Responsável por registrar (preenchido automaticamente)">
                <div className="border-input bg-muted/40 text-foreground/70 flex h-9 items-center gap-2 rounded-md border px-2.5 text-sm">
                  <User className="text-foreground/60 size-4" />
                  <span>
                    {isEdit && benefitToEdit?.creator
                      ? `${benefitToEdit.creator.name} (criador) — editando como ${currentUserName}`
                      : currentUserName}
                  </span>
                </div>
              </FormField>

              <FormField label="Observações Adicionais">
                <Textarea
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Informações relevantes sobre a entrega..."
                  rows={4}
                  value={notes}
                />
              </FormField>

              <p className="text-destructive text-xs font-semibold tracking-wide uppercase">
                Todos os campos que tem * são obrigatórios
              </p>

              <div className="border-border my-6 border-t" />

              <div>
                <h3 className="text-heading text-base font-semibold">
                  Imagem do Benefício
                </h3>
                <p className="text-foreground/75 mt-1 text-sm">
                  Faça o upload de uma imagem para ajudar a identificar melhor o
                  item
                </p>

                {existingImageUrl ? (
                  <div className="border-border relative mt-3 w-fit max-w-full overflow-hidden rounded-lg border">
                    <img
                      alt="Imagem do benefício"
                      className="max-h-48 object-contain"
                      src={existingImageUrl}
                    />
                    <button
                      aria-label="Remover imagem"
                      className="absolute top-2 right-2 rounded-full bg-red-600 p-1 text-white transition-colors hover:bg-red-700"
                      onClick={() => setRemoveImage(true)}
                      type="button"
                    >
                      <Trash2 className="size-3" />
                    </button>
                  </div>
                ) : (
                  <label
                    className={cn(
                      'border-foreground/20 bg-muted/20 hover:bg-muted/40 mt-3 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-6 py-10 text-center transition-colors',
                      isDragging && 'border-primary bg-primary/5',
                      imageFile && 'border-primary/50 bg-primary/5',
                    )}
                    onDragLeave={() => setIsDragging(false)}
                    onDragOver={(e) => {
                      e.preventDefault()
                      setIsDragging(true)
                    }}
                    onDrop={handleDrop}
                  >
                    <input
                      accept="image/png,image/jpeg,application/pdf"
                      className="sr-only"
                      onChange={(e) =>
                        handleFileChange(e.target.files?.[0] ?? null)
                      }
                      type="file"
                    />
                    <div className="bg-accent text-primary flex size-12 items-center justify-center rounded-lg">
                      {imageFile ? (
                        <ImageIcon className="size-5" />
                      ) : (
                        <FileImage className="size-5" />
                      )}
                    </div>
                    <p className="text-sm">
                      <span className="text-primary font-semibold">
                        Clique para selecionar
                      </span>
                      <span className="text-foreground/70">
                        {' '}
                        ou arraste o arquivo
                      </span>
                    </p>
                    <p className="text-foreground/60 text-xs">
                      {imageFile
                        ? imageFile.name
                        : 'PNG, JPG ou PDF (Máx. 5MB)'}
                    </p>
                  </label>
                )}
              </div>
            </div>
          </div>

          <div className="border-border flex items-center justify-end gap-3 rounded-b-xl border-t bg-background px-8 py-4">
            <Button
              className="px-5"
              onClick={() => handleOpenChange(false)}
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

export const CreateBenefitModal = BenefitFormModal

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
