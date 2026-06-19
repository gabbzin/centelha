import { useFormContext } from 'react-hook-form'
import { useHookFormMask } from 'use-mask-input'
import { ComboboxMulti } from '@/components/inputs/combobox-multiple'
import { InputLabel } from '@/components/inputs/input-label'
import { RadioInput } from '@/components/inputs/radio-group'
import { Label } from '@/components/ui/label'
export function Step3() {
  // Puxando contexto do form
  const { control, register, watch } = useFormContext()

  // Implementação da máscara
  const registerWithMask = useHookFormMask(register)

  // Render
  return (
    <div className="grid grid-cols-1 gap-6 p-1 *:space-y-2">
      <div className="col-span-2">
        <LabelInput label="Fonte de renda principal" />
        <RadioInput
          control={control}
          options={[
            {
              value: 'emprego_formal',
              label: 'Emprego Formal',
            },
            {
              value: 'emprego_informal',
              label: 'Emprego Informal',
            },
            {
              value: 'beneficios_sociais',
              label: 'Benefícios Sociais',
            },
            {
              value: 'outra_fonte',
              label: 'Outra Fonte',
            },
            {
              value: 'sem_renda',
              label: 'Sem renda',
            },
          ]}
          sr_only={false}
          {...register('fonte_renda')}
        />
      </div>

      <div className="col-span-2 flex items-center justify-between gap-4 *:flex-1">
        <InputLabel
          label="Renda média da familia (Valor máximo R$ 3.500,00)"
          {...registerWithMask('renda_familiar', 'brl-currency', {
            groupSeparator: '.',
            inputType: 'number',
            min: 0,
            max: 3500,
            rightAlign: false,
            digits: 0,
          })}
          placeholder="Digite a renda familiar"
          required
        />
        <div className="space-y-1">
          <LabelInput label="Categorias de Benefícios" />
          <ComboboxMulti />
        </div>
      </div>

      <div className="col-span-2">
        <LabelInput label="Recebe Auxílio?" />
        <div className="w-50">
          <RadioInput
            control={control}
            options={[
              {
                value: 'sim',
                label: 'Sim',
              },
              {
                value: 'nao',
                label: 'Não',
              },
            ]}
            sr_only={true}
            {...register('recebe_auxilio')}
          />
        </div>
      </div>

      {watch('recebe_auxilio') === 'sim' && (
        <div className="col-span-2">
          <InputLabel
            label="Qual auxilio / beneficio recebe?"
            placeholder="Ex: Bolsa Familia, BPC ..."
            {...register('auxilios_recebidos')}
          />
        </div>
      )}
    </div>
  )
}

// Componentizar dentro dos inputs depois
const LabelInput = ({ label }: { label: string }) => (
  <Label className="text-heading text-xs font-semibold">
    {label}
    <span className="text-destructive">*</span>
  </Label>
)
