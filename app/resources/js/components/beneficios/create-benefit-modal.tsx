import { Check, FileImage, Minus, Plus, User } from 'lucide-react'
import { useCallback, useState } from 'react'
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
import { CATEGORY_OPTIONS } from './data'

interface CreateBenefitModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}
export function CreateBenefitModal({
  open,
  onOpenChange,
}: CreateBenefitModalProps) {
  const [name, setName] = useState('')
  const [category, setCategory] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [donor, setDonor] = useState('')
  const [validity, setValidity] = useState('')
  const [notes, setNotes] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const reset = useCallback(() => {
    setName('')
    setCategory('')
    setQuantity(1)
    setDonor('')
    setValidity('')
    setNotes('')
    setImageFile(null)
    setIsDragging(false)
  }, [])
  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (!next) reset()
      onOpenChange(next)
    },
    [onOpenChange, reset],
  )
  const increment = () => setQuantity((q) => Math.min(999, q + 1))
  const decrement = () => setQuantity((q) => Math.max(1, q - 1))
  const handleFileChange = (file: File | null) => {
    if (file && file.size <= 5 * 1024 * 1024) {
      setImageFile(file)
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
    console.log('Submit benefit:', {
      name,
      category,
      quantity,
      donor,
      validity,
      notes,
      imageFile,
    })
    handleOpenChange(false)
  }
  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogContent
        className="max-w-2xl gap-0 p-0 sm:max-w-2xl"
        showCloseButton={false}
      >
        <form className="flex max-h-[90vh] flex-col" onSubmit={handleSubmit}>
          <div className="overflow-y-auto px-8 py-6">
            <DialogTitle className="text-center text-2xl font-bold tracking-[-0.03em] uppercase">
              Registrar novo benefício
            </DialogTitle>
            <DialogDescription className="sr-only">
              Preencha os campos abaixo para cadastrar um novo benefício no
              catálogo.
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

                <FormField label="Quantidade a ser adicionada" required>
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
                      disabled={quantity >= 999}
                      onClick={increment}
                      type="button"
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                </FormField>
              </div>

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
                  <span>João Silva (Administrador)</span>
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
                    <FileImage className="size-5" />
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
                    {imageFile ? imageFile.name : 'PNG, JPG ou PDF (Máx. 5MB)'}
                  </p>
                </label>
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
              Concluir Cadastro
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
