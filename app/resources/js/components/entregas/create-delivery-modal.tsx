import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import {
  CalendarDays,
  Check,
  FileText,
  Minus,
  Plus,
  Search,
  User,
  X,
} from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  BENEFICIARY_OPTIONS,
  BENEFIT_TYPE_OPTIONS,
  LOCATION_OPTIONS,
  applyDateMask,
} from './data';
interface CreateDeliveryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export function CreateDeliveryModal({
  open,
  onOpenChange,
}: CreateDeliveryModalProps) {
  const [beneficiarySearch, setBeneficiarySearch] = useState('');
  const [selectedBeneficiary, setSelectedBeneficiary] = useState<string>('');
  const [showBeneficiaryList, setShowBeneficiaryList] = useState(false);
  const [benefitType, setBenefitType] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const beneficiaryRef = useRef<HTMLDivElement>(null);
  const reset = useCallback(() => {
    setBeneficiarySearch('');
    setSelectedBeneficiary('');
    setShowBeneficiaryList(false);
    setBenefitType('');
    setQuantity(1);
    setDeliveryDate('');
    setLocation('');
    setNotes('');
    setReceiptFile(null);
    setIsDragging(false);
    setErrors({});
  }, []);
  const handleOpenChange = useCallback(
    (next: boolean) => {
      if (!next) reset();
      onOpenChange(next);
    },
    [onOpenChange, reset],
  );
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        beneficiaryRef.current &&
        !beneficiaryRef.current.contains(event.target as Node)
      ) {
        setShowBeneficiaryList(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const filteredBeneficiaries = BENEFICIARY_OPTIONS.filter(
    (b) =>
      b.label.toLowerCase().includes(beneficiarySearch.toLowerCase()) ||
      b.cpf.includes(beneficiarySearch) ||
      b.nis.includes(beneficiarySearch),
  );
  const selectedBeneficiaryLabel =
    BENEFICIARY_OPTIONS.find((b) => b.value === selectedBeneficiary)?.label ??
    '';
  const increment = () => setQuantity((q) => Math.min(999, q + 1));
  const decrement = () => setQuantity((q) => Math.max(1, q - 1));
  const handleFileChange = (file: File | null) => {
    if (file && file.size <= 5 * 1024 * 1024) {
      setReceiptFile(file);
    }
  };
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file ?? null);
  };
  const validate = (): boolean => {
    const nextErrors: Record<string, string> = {};
    if (!selectedBeneficiary)
      nextErrors.beneficiary = 'Selecione um beneficiário';
    if (!benefitType) nextErrors.benefitType = 'Selecione um tipo de benefício';
    if (!deliveryDate) nextErrors.deliveryDate = 'Informe a data da entrega';
    if (!location) nextErrors.location = 'Selecione um local de retirada';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    console.log('Submit delivery:', {
      beneficiary: selectedBeneficiary,
      benefitType,
      quantity,
      deliveryDate,
      location,
      notes,
      receiptFile,
    });
    handleOpenChange(false);
  };
  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogContent
        className="max-w-2xl gap-0 p-0 sm:max-w-2xl"
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
                error={errors.beneficiary}
                label="Seleção do Beneficiário"
                required
              >
                <div ref={beneficiaryRef} className="relative">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <Input
                    className="pl-9"
                    onChange={(e) => {
                      setSelectedBeneficiary('');
                      setBeneficiarySearch(e.target.value);
                      setShowBeneficiaryList(true);
                    }}
                    onFocus={() => setShowBeneficiaryList(true)}
                    placeholder="Buscar por CPF, Nome ou NIS..."
                    value={
                      selectedBeneficiary
                        ? selectedBeneficiaryLabel
                        : beneficiarySearch
                    }
                  />
                  {selectedBeneficiary ? (
                    <button
                      className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                      onClick={() => {
                        setSelectedBeneficiary('');
                        setBeneficiarySearch('');
                      }}
                      type="button"
                    >
                      <X className="size-4" />
                    </button>
                  ) : null}

                  {showBeneficiaryList && !selectedBeneficiary && (
                    <div className="absolute z-50 mt-1 max-h-56 w-full overflow-auto rounded-md border border-border bg-popover p-1 shadow-md">
                      {filteredBeneficiaries.length === 0 ? (
                        <p className="text-muted-foreground px-2 py-3 text-center text-sm">
                          Nenhum beneficiário encontrado
                        </p>
                      ) : (
                        filteredBeneficiaries.map((b) => (
                          <button
                            key={b.value}
                            className="hover:bg-accent hover:text-accent-foreground w-full rounded-sm px-2 py-2 text-left text-sm"
                            onClick={() => {
                              setSelectedBeneficiary(b.value);
                              setBeneficiarySearch(b.label);
                              setShowBeneficiaryList(false);
                            }}
                            type="button"
                          >
                            <span className="font-medium">{b.label}</span>
                            <span className="text-muted-foreground block text-xs">
                              CPF: {b.cpf} · NIS: {b.nis}
                            </span>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </FormField>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  error={errors.benefitType}
                  label="Tipo de Benefício"
                  required
                >
                  <Select onValueChange={setBenefitType} value={benefitType}>
                    <SelectTrigger className="border-border w-full border">
                      <SelectValue placeholder="Selecione um tipo..." />
                    </SelectTrigger>
                    <SelectContent>
                      {BENEFIT_TYPE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>

                <FormField label="Quantidade" required>
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
                <FormField
                  error={errors.deliveryDate}
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
                  error={errors.location}
                  label="Local de Retirada"
                  required
                >
                  <Select onValueChange={setLocation} value={location}>
                    <SelectTrigger className="border-border w-full border">
                      <SelectValue placeholder="Selecione um local..." />
                    </SelectTrigger>
                    <SelectContent>
                      {LOCATION_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>
              </div>

              <FormField label="Responsável pela Entrega (preenchido automaticamente)">
                <div className="border-input bg-muted/40 text-foreground/70 flex h-9 items-center gap-2 rounded-md border px-2.5 text-sm">
                  <User className="text-foreground/60 size-4" />
                  <span>João Silva (Assistente Social)</span>
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
                    e.preventDefault();
                    setIsDragging(true);
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
  );
}
interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
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
  );
}
