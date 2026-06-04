import { ComboboxMulti } from '@/components/inputs/combobox-multiple';
import { RadioInput } from '@/components/inputs/radio-group';
import { Label } from '@/components/ui/label';
import { useFormContext } from 'react-hook-form';
export function Step3() {
  const {
    control,
    register,
    // formState: { errors },
  } = useFormContext();
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

      <div className="col-span-2">
        <LabelInput label="Categorias de Benefícios" />
        <ComboboxMulti />
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
    </div>
  );
}
const LabelInput = ({ label }: { label: string }) => (
  <Label className="uppercase text-xs text-muted-foreground">
    {label}
    <span className="text-destructive">*</span>
  </Label>
);
