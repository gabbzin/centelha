import { ComboboxMulti } from '@/components/inputs/combobox-multiple';
import { InputLabel } from '@/components/inputs/input-label';
import { RadioInput } from '@/components/inputs/radio-group';
import { Label } from '@/components/ui/label';
import { useFormContext } from 'react-hook-form';
export function Step3() {
  const { control, register, watch } = useFormContext();
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
          label="Renda da familia (Valor máximo R$ 3.500,00)"
          mask={'currency'}
          maskOptions={{
            prefix: 'R$ ',
            displayFormat: 'BRL',
            groupSeparator: '.',
            inputType: 'number',
            min: 0,
            max: 3500,
            rightAlign: false,
            digits: 0,
          }}
          placeholder="Digite a renda familiar"
          required
          {...register('renda_familiar')}
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
  );
}

// Componentizar dentro dos inputs depois
const LabelInput = ({ label }: { label: string }) => (
  <Label className="text-heading text-xs font-semibold">
    {label}
    <span className="text-destructive">*</span>
  </Label>
);
