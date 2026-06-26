import { Trash2Icon } from 'lucide-react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useHookFormMask } from 'use-mask-input'
import { DatePicker } from '@/components/inputs/date-picker'
import { InputLabel } from '@/components/inputs/input-label'
import { InputSelect } from '@/components/inputs/input-select'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface Step1Props {
  availableTags?: Array<{
    id: number
    name: string
    color: string
    icon: string | null
  }>
}

export function Step1({ availableTags = [] }: Step1Props) {
  const {
    control,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext()

  const registerWithMask = useHookFormMask(register)

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'family_members',
  })

  const selectedTags: number[] = watch('tags') ?? []

  const handleTagToggle = (tagId: number) => {
    const current = selectedTags.includes(tagId)
      ? selectedTags.filter((id) => id !== tagId)
      : [...selectedTags, tagId]
    setValue('tags', current, { shouldValidate: true })
  }

  const eightteenYearsAgo = new Date(
    Date.now() - 1000 * 60 * 60 * 24 * 365 * 18,
  )

  return (
    <div className="grid grid-cols-1 gap-2 p-1 md:grid-cols-2">
      <div className="col-span-2">
        <InputLabel
          {...register('name')}
          autoFocus
          error={errors.form?.message}
          id="nome"
          label="Nome do Responsável Familiar"
          placeholder="Digite o nome do responsável familiar"
          required
        />
      </div>

      <div className="col-span-2 flex items-center justify-between gap-4 *:flex-1">
        <InputLabel
          {...registerWithMask('cpf', 'cpf')}
          id="cpf"
          label="CPF"
          placeholder="000.000.000-00"
          required
        />
        <InputLabel
          {...registerWithMask('telefone', '(99) 99999-9999', {
            rightAlign: false,
          })}
          id="telefone"
          label="Telefone"
          placeholder="Digite o número de telefone"
          required
        />
      </div>

      <div className="col-span-2 flex items-center justify-between gap-4 *:flex-1">
        <InputLabel
          {...register('email')}
          id="E-mail"
          label="E-mail"
          placeholder="nome@email.com"
          required={false}
        />
        <DatePicker
          control={control}
          disabled={{
            after: eightteenYearsAgo,
          }}
          label="Data de nascimento"
          name="data_nascimento"
          today={eightteenYearsAgo}
        />
      </div>

      {availableTags.length > 0 && (
        <div className="col-span-2 space-y-2">
          <Label className="text-heading text-xs font-semibold">
            Necessidades Específicas
          </Label>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => {
              const isSelected = selectedTags.includes(tag.id)
              return (
                <button
                  key={tag.id}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                    isSelected
                      ? 'border-foreground bg-accent'
                      : 'border-border hover:border-foreground/50'
                  }`}
                  onClick={() => handleTagToggle(tag.id)}
                  type="button"
                >
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: tag.color }}
                  />
                  {tag.name}
                </button>
              )
            })}
          </div>
        </div>
      )}

      <div className="col-span-2 flex items-center justify-end text-xs font-bold text-[#094785] uppercase">
        Membros adicionados: {fields.length}
      </div>

      <div className="col-span-2 space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-end justify-between gap-4">
            <div className="flex-3">
              <InputLabel
                {...register(`family_members.${index}.name`)}
                label="Nome do Membro Familiar"
                placeholder="Digite o nome do membro familiar"
                required
              />
            </div>
            <div className="flex-1">
              <InputLabel
                {...registerWithMask(`family_members.${index}.cpf`, 'cpf')}
                label="CPF do membro familiar"
                placeholder="000.000.000-00"
                required
              />
            </div>
            <div className="flex-1">
              <DatePicker
                control={control}
                disabled={{
                  after: new Date(),
                }}
                label="Data de nascimento"
                {...register(`family_members.${index}.data_nascimento`)}
              />
            </div>
            <div className="flex-1">
              <Label className="text-heading text-xs font-semibold">
                Relação de Parentesco
                <span className="text-destructive">*</span>
              </Label>
              <InputSelect
                control={control}
                name={`family_members.${index}.relacao_parentesco`}
                options={[
                  {
                    label: 'Pai',
                    value: 'pai',
                  },
                  {
                    label: 'Mãe',
                    value: 'mae',
                  },
                  {
                    label: 'Filho(a)',
                    value: 'filho',
                  },
                ]}
              />
            </div>
            <Button
              className={'size-5 self-end'}
              onClick={() => remove(index)}
              type="button"
              variant={'destructive'}
            >
              <Trash2Icon />
            </Button>
          </div>
        ))}
        <Button
          className="p-0 text-xs font-semibold text-[#094785] uppercase"
          onClick={() => {
            append({
              name: '',
              cpf: '',
              data_nascimento: '',
              relacao_parentesco: '',
            })
          }}
          type="button"
          variant={'ghost'}
        >
          + Adicionar novo membro
        </Button>
      </div>
    </div>
  )
}
