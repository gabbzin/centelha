import { RentedHouseIcon } from '@/components/icons/rented-house-icon';
import { InputLabel } from '@/components/inputs/input-label';
import { RadioInput } from '@/components/inputs/radio-group';
import { Separator } from '@/components/ui/separator';
import { HandshakeIcon, HomeIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
export function Step2() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="grid grid-cols-1 gap-6 p-1">
      <div className="col-span-2">
        <InputLabel
          {...register('cep')}
          autoFocus
          error={errors.form?.message}
          id="cep"
          label="CEP"
          placeholder="00000-000"
          required
        />
      </div>

      <div className="col-span-2 flex items-center justify-between gap-4 *:flex-1">
        <InputLabel
          {...register('logradouro')}
          id="logradouro"
          label="Logradouro"
          placeholder="Digite o logradouro"
          required
        />
        <InputLabel
          {...register('numero')}
          id="numero"
          label="Número (Use 0, caso não exista)"
          placeholder="0"
          required
        />
      </div>

      <div className="col-span-2 flex items-center justify-between gap-4 *:flex-1">
        <InputLabel
          {...register('cidade')}
          id="cidade"
          label="Cidade"
          placeholder="Digite a cidade"
          required
        />
        <InputLabel
          {...register('UF')}
          id="UF"
          label="UF"
          placeholder="Sigla do Estado"
          required
        />
        <InputLabel
          {...register('bairro')}
          id="bairro"
          label="Bairro"
          placeholder="Digite o bairro"
          required
        />
      </div>

      <Separator className={'col-span-2'} />

      <RadioInput
        control={control}
        name="moradia"
        options={[
          {
            value: 'propria',
            label: 'Própria',
            icon: <HomeIcon />,
          },
          {
            value: 'alugada',
            label: 'Alugada',
            icon: <RentedHouseIcon />,
          },
          {
            value: 'cedida',
            label: 'Cedida',
            icon: <HandshakeIcon />,
          },
        ]}
        sr_only={true}
      />
    </div>
  );
}
