import {
  CalendarDays,
  Check,
  FileText,
  Minus,
  Plus,
  Search,
  User,
  X,
} from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { router, usePage } from '@inertiajs/react'
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
import { applyDateMask, parseDate } from './data'
import type { BeneficiaryOption, BenefitOption } from './types'

function formatCpf(value: string | null | undefined): string {
  if (!value) return ''
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 3) return digits
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`
  if (digits.length <= 9) {
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`
  }
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`
}

interface CreateDeliveryModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  benefits: BenefitOption[]
  deliveredBy: string
}

export function CreateDeliveryModal({
  open,
  onOpenChange,
  benefits,
  deliveredBy,
}: CreateDeliveryModalProps) {
  const { errors: pageErrors } = usePage().props as {
    errors: Record<string, string>
  }

  const [beneficiarySearch, setBeneficiarySearch] = useState('')
  const [selectedBeneficiary, setSelectedBeneficiary] =
    useState<BeneficiaryOption | null>(null)
  const [beneficiaries, setBeneficiaries] = useState<BeneficiaryOption[]>([])
  const [showBeneficiaryList, setShowBeneficiaryList] = useState(false)
  const [benefitId, setBenefitId] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [deliveryDate, setDeliveryDate] = useState('')
  const [location, setLocation] = useState('')
  const [notes, setNotes] = useState('')
  const [receiptFile, setReceiptFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loadingBeneficiaries, setLoadingBeneficiaries] = useState(false)
  const beneficiaryRef = useRef<HTMLDivElement>(null)

  const reset = useCallback(() => {
    setBeneficiarySearch('')
    setSelectedBeneficiary(null)
    setBeneficiaries([])
    setShowBeneficiaryList(false)
    setBenefitId('')
    setQuantity(1)
    setDeliveryDate('')
    setLocation('')
    setNotes('')
    setReceiptFile(null)
    setIsDragging(false)
    setErrors({})
  }, [])

  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (!next) reset()
      onOpenChange(next)
    },
    [onOpenChange, reset],
  )

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        beneficiaryRef.current &&
        !beneficiaryRef.current.contains(event.target as Node)
      ) {
        setShowBeneficiaryList(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (selectedBeneficiary || beneficiarySearch.length < 2) {
      setBeneficiaries([])
      return
    }

    setLoadingBeneficiaries(true)
    const timer = setTimeout(() => {
      fetch(`/family/search?q=${encodeURIComponent(beneficiarySearch)}`, {
        headers: { Accept: 'application/json' },
      })
        .then((res) => (res.ok ? res.json() : []))
        .then((data: Array<{ id: number; responsible_name: string; responsible_cpf?: string | null }>) => {
          setBeneficiaries(
            data.map((family) => ({
              value: String(family.id),
              label: family.responsible_name,
              cpf: family.responsible_cpf,
            })),
          )
        })
        .catch(() => setBeneficiaries([]))
        .finally(() => setLoadingBeneficiaries(false))
    }, 300)

    return () => clearTimeout(timer)
  }, [beneficiarySearch, selectedBeneficiary])

  const selectedBeneficiaryId = selectedBeneficiary?.value ?? ''
  const selectedBeneficiaryLabel = selectedBeneficiary?.label ?? ''
  const selectedBenefit = benefitId
    ? benefits.find((b) => String(b.id) === benefitId)
    : null
  const maxQuantity = selectedBenefit ? selectedBenefit.stock : 999

  const increment = () => setQuantity((q) => (q >= maxQuantity ? q : q + 1))
  const decrement = () => setQuantity((q) => Math.max(1, q - 1))

  const handleFileChange = (file: File | null) => {
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        receipt: 'Arquivo muito grande. O limite é 5MB.',
      }))
      return
    }
    setReceiptFile(file)
    setErrors((prev) => {
      const next = { ...prev }
      delete next.receipt
      return next
    })
  }

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleFileChange(file ?? null)
  }

  const validate = (): boolean => {
    const nextErrors: Record<string, string> = {}
    if (!selectedBeneficiaryId)
      nextErrors.beneficiary = 'Selecione um beneficiário'
    if (!benefitId) nextErrors.benefitType = 'Selecione um tipo de benefício'
    if (
      benefitId &&
      selectedBenefit &&
      quantity > selectedBenefit.stock
    ) {
      nextErrors.quantity = `Quantidade excede o estoque disponível (${selectedBenefit.stock}).`
    }
    if (!deliveryDate) {
      nextErrors.deliveryDate = 'Informe a data da entrega'
    } else if (!isValidDeliveryDate(deliveryDate)) {
      nextErrors.deliveryDate = 'Informe uma data válida e não futura'
    }
    if (!location) nextErrors.location = 'Informe o local de retirada'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const toISODate = (value: string): string => {
    const date = parseDate(value)
    if (!date) return ''
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const isValidDeliveryDate = (value: string): boolean => {
    const date = parseDate(value)
    if (!date) return false
    const [day, month, year] = value.split('/').map(Number)
    if (
      date.getDate() !== day ||
      date.getMonth() + 1 !== month ||
      date.getFullYear() !== year
    ) {
      return false
    }
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date <= today
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const formData = new FormData()
    formData.append('family_id', selectedBeneficiaryId)
    formData.append('benefit_id', benefitId)
    formData.append('quantity', String(quantity))
    formData.append('delivery_date', toISODate(deliveryDate))
    formData.append('location', location)
    if (notes) formData.append('notes', notes)
    if (receiptFile) formData.append('receipt', receiptFile)

    router.post('/entregas', formData, {
      forceFormData: true,
      preserveScroll: true,
      onSuccess: () => handleOpenChange(false),
    })
  }

  const mergedErrors = { ...errors, ...pageErrors }

  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogContent
        className="gap-0 p-0 md:max-w-2xl"
        showCloseButton={false}
      >
        <form className="flex max-h-[90vh] flex-col" onSubmit={handleSubmit}>
          <div className="overflow-y-auto px-8 py-6">
            <DialogTitle className="text-center text-2xl font-bold uppercase tracking-tight">
              Cadastrar Nova Entrega
            </DialogTitle>
            <DialogDescription className="sr-only">
              Preencha os campos abaixo para registrar uma nova entrega.
            </DialogDescription>

            <div className="mt-6 space-y-4">
              <FormField
                error={mergedErrors.beneficiary || mergedErrors.family_id}
                label="Seleção do Beneficiário"
                required
              >
                <div ref={beneficiaryRef} className="relative">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input
                    className="pl-9"
                    onChange={(e) => {
                      setSelectedBeneficiary(null)
                      setBeneficiarySearch(e.target.value)
                      setShowBeneficiaryList(true)
                    }}
                    onFocus={() => setShowBeneficiaryList(true)}
                    placeholder="Buscar por nome ou CPF..."
                    value={
                      selectedBeneficiaryId
                        ? selectedBeneficiaryLabel
                        : beneficiarySearch
                    }
                  />
                  {selectedBeneficiaryId ? (
                    <button
                      className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                      onClick={() => {
                        setSelectedBeneficiary(null)
                        setBeneficiarySearch('')
                      }}
                      type="button"
                    >
                      <X className="size-4" />
                    </button>
                  ) : null}

                  {showBeneficiaryList && !selectedBeneficiary && (
                    <div className="absolute z-50 mt-1 max-h-56 w-full overflow-auto rounded-md border border-border bg-popover p-1 shadow-md">
                      {beneficiarySearch.length < 2 ? (
                        <p className="text-muted-foreground px-2 py-3 text-center text-sm">
                          Digite pelo menos 2 caracteres
                        </p>
                      ) : loadingBeneficiaries ? (
                        <p className="text-muted-foreground px-2 py-3 text-center text-sm">
                          Buscando...
                        </p>
                      ) : beneficiaries.length === 0 ? (
                        <p className="text-muted-foreground px-2 py-3 text-center text-sm">
                          Nenhum beneficiário encontrado
                        </p>
                      ) : (
                        beneficiaries.map((b) => (
                          <button
                            key={b.value}
                            className="hover:bg-accent hover:text-accent-foreground w-full rounded-sm px-2 py-2 text-left text-sm"
                            onClick={() => {
                                setSelectedBeneficiary(b)
                                setBeneficiarySearch(b.label)
                              setShowBeneficiaryList(false)
                            }}
                            type="button"
                          >
                            <span className="font-medium">{b.label}</span>
                            {b.cpf ? (
                              <span className="text-muted-foreground block text-xs">
                                CPF: {formatCpf(b.cpf)}
                              </span>
                            ) : null}
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </FormField>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  error={mergedErrors.benefitType || mergedErrors.benefit_id}
                  label="Tipo de Benefício"
                  required
                >
                  <Select onValueChange={setBenefitId} value={benefitId}>
                    <SelectTrigger className="border-border w-full border">
                      <SelectValue placeholder="Selecione um tipo...">
                        {benefitId
                          ? (benefits.find(
                              (b) => String(b.id) === benefitId,
                            )?.name ?? null)
                          : null}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {benefits.map((option) => (
                        <SelectItem
                          disabled={option.stock <= 0}
                          key={option.id}
                          value={String(option.id)}
                        >
                          {option.name}{' '}
                          {option.stock <= 0
                            ? '(sem estoque)'
                            : `(estoque: ${option.stock})`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField error={mergedErrors.quantity} label="Quantidade" required>
                  <div className="border-input flex h-9 items-stretch rounded-md border shadow-xs">
                    <button
                      aria-label="Diminuir quantidade"
                      className="text-foreground/70 hover:bg-muted flex w-10 items-center justify-center transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                      disabled={quantity <= 1}
                      onClick={decrement}
                      type="button"
                    >
                      <Minus className="size-4" />
                    </button>
                    <div className="border-input flex flex-1 items-center justify-center border-x text-sm font-medium">
                      {quantity}
                    </div>
                    <button
                    aria-label="Aumentar quantidade"
                    className="text-foreground/70 hover:bg-muted flex w-10 items-center justify-center transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                    disabled={quantity >= maxQuantity}
                    onClick={increment}
                      type="button"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                </FormField>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  error={mergedErrors.deliveryDate}
                  label="Data da Entrega"
                  required
                >
                  <div className="relative">
                    <CalendarDays className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                    <Input
                      className="pl-9"
                      onChange={(e) =>
                        setDeliveryDate(applyDateMask(e.target.value))
                      }
                      placeholder="dd/mm/aaaa"
                      value={deliveryDate}
                    />
                  </div>
                </FormField>

                <FormField
                  error={mergedErrors.location}
                  label="Local de Retirada"
                  required
                >
                  <Input
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Informe o local de retirada"
                    value={location}
                  />
                </FormField>
              </div>

              <FormField label="Responsável pela Entrega (preenchido automaticamente)">
                <div className="border-input bg-muted/40 text-foreground/70 flex h-9 items-center gap-2 rounded-md border px-2.5 text-sm">
                  <User className="text-foreground/60 size-4" />
                  <span>{deliveredBy}</span>
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
                  Comprovante de Entrega
                </h3>
                <p className="text-foreground/75 mt-1 text-sm">
                  Faça o upload de uma foto ou documento assinado para comprovar
                  a entrega.
                </p>

                <label
                  className={cn(
                    'border-foreground/20 bg-muted/20 hover:bg-muted/40 mt-3 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-6 py-10 text-center transition-colors',
                    isDragging && 'border-primary bg-primary/5',
                    receiptFile && 'border-primary/50 bg-primary/5',
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
                    name="receipt"
                    onChange={(e) =>
                      handleFileChange(e.target.files?.[0] ?? null)
                    }
                    type="file"
                  />
                  <div className="bg-accent text-primary flex size-12 items-center justify-center rounded-lg">
                    <FileText className="size-5" />
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
                    {receiptFile
                      ? receiptFile.name
                      : 'PNG, JPG ou PDF (Máx. 5MB)'}
                  </p>
                </label>
                {mergedErrors.receipt ? (
                  <p className="text-destructive mt-1 text-xs">
                    {mergedErrors.receipt}
                  </p>
                ) : null}
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
              Confirmar Entrega
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
  error?: string
  children: React.ReactNode
}

function FormField({ label, required, error, children }: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label className="text-sm font-medium">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {children}
      {error ? <p className="text-destructive text-xs">{error}</p> : null}
    </div>
  )
}
