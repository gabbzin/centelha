import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { Tag } from './types'

const TAG_COLORS = [
  { label: 'Vermelho', value: '#EF4444' },
  { label: 'Laranja', value: '#F97316' },
  { label: 'Amarelo', value: '#EAB308' },
  { label: 'Verde', value: '#22C55E' },
  { label: 'Azul', value: '#3B82F6' },
  { label: 'Índigo', value: '#6366F1' },
  { label: 'Roxo', value: '#A855F7' },
  { label: 'Rosa', value: '#EC4899' },
]

const TAG_ICONS = [
  'Heart',
  'Baby',
  'Home',
  'HeartHandshake',
  'Apple',
  'Pill',
  'Accessibility',
  'Droplets',
  'Shield',
  'ShoppingBasket',
  'Stethoscope',
  'Wheat',
]

const tagSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').max(100),
  color: z.string().min(1, 'Cor é obrigatória'),
  icon: z.string().nullable(),
})

type TagFormData = z.infer<typeof tagSchema>

interface TagFormModalProps {
  onOpenChange: (open: boolean) => void
  onSubmit: (data: TagFormData) => void
  open: boolean
  tagToEdit?: Tag | null
}

export function TagFormModal({
  onOpenChange,
  onSubmit,
  open,
  tagToEdit,
}: TagFormModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TagFormData>({
    resolver: zodResolver(tagSchema),
    defaultValues: tagToEdit
      ? {
          name: tagToEdit.name,
          color: tagToEdit.color,
          icon: tagToEdit.icon ?? null,
        }
      : {
          name: '',
          color: '#3B82F6',
          icon: null,
        },
  })

  const selectedColor = watch('color')
  const selectedIcon = watch('icon')

  const handleColorSelect = useCallback(
    (color: string) => {
      setValue('color', color, { shouldValidate: true })
    },
    [setValue],
  )

  const handleIconSelect = useCallback(
    (icon: string | null) => {
      setValue('icon', icon, { shouldValidate: true })
    },
    [setValue],
  )

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {tagToEdit ? 'Editar Tag' : 'Nova Tag'}
          </DialogTitle>
          <DialogDescription>
            {tagToEdit
              ? 'Edite as informações da tag de necessidade.'
              : 'Cadastre uma nova tag para classificar as famílias.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Nome <span className="text-destructive">*</span>
              </Label>
              <Input
                {...register('name')}
                id="name"
                placeholder="Ex: Gestante, Acamado, PCD..."
              />
              {errors.name && (
                <p className="text-destructive text-xs">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>
                Cor <span className="text-destructive">*</span>
              </Label>
              <div className="flex flex-wrap gap-2">
                {TAG_COLORS.map(({ label, value }) => (
                  <button
                    key={value}
                    className={`h-8 w-8 rounded-full border-2 transition-all ${
                      selectedColor === value
                        ? 'border-foreground scale-110'
                        : 'border-transparent hover:scale-105'
                    }`}
                    onClick={() => handleColorSelect(value)}
                    style={{ backgroundColor: value }}
                    title={label}
                    type="button"
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Ícone (opcional)</Label>
              <div className="flex max-h-24 flex-wrap gap-2 overflow-y-auto">
                <button
                  className={`flex h-8 w-8 items-center justify-center rounded-md border text-xs transition-all ${
                    selectedIcon === null
                      ? 'border-foreground bg-accent'
                      : 'border-border hover:bg-accent'
                  }`}
                  onClick={() => handleIconSelect(null)}
                  title="Sem ícone"
                  type="button"
                >
                  —
                </button>
                {TAG_ICONS.map((icon) => (
                  <button
                    key={icon}
                    className={`flex h-8 w-8 items-center justify-center rounded-md border text-xs transition-all ${
                      selectedIcon === icon
                        ? 'border-foreground bg-accent'
                        : 'border-border hover:bg-accent'
                    }`}
                    onClick={() => handleIconSelect(icon)}
                    title={icon}
                    type="button"
                  >
                    {icon.slice(0, 2)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button
              onClick={() => onOpenChange(false)}
              type="button"
              variant="outline"
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              {tagToEdit ? 'Atualizar' : 'Cadastrar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
