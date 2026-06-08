import { RentedHouseIcon } from '@/components/icons/rented-house-icon';
import { InputLabel } from '@/components/inputs/input-label';
import { RadioInput } from '@/components/inputs/radio-group';
import { Separator } from '@/components/ui/separator';
import { HandshakeIcon, HomeIcon, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useHookFormMask } from 'use-mask-input';
export function Step2() {
  const {
    control,
    register,
    watch,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useFormContext();
  const registerWithMask = useHookFormMask(register);
  const [loadingCep, setLoadingCep] = useState(false);
  const [write, setWrite] = useState(true);

  // Monitora o valor do CEP
  const cepValue = watch('cep');

  // Efeito para buscar o endereço quando o CEP for preenchido corretamente
  useEffect(() => {
    const cleanCep = cepValue?.replace(/\D/g, '');
    if (cleanCep?.length === 8) {
      const fetchAddress = async () => {
        setLoadingCep(true);
        clearErrors('cep');
        setWrite(true);
        try {
          const response = await fetch(
            `https://viacep.com.br/ws/${cleanCep}/json/`,
          );
          const data = await response.json();
          if (data.erro) {
            setError('cep', {
              type: 'manual',
              message: 'CEP não encontrado',
            });
          } else {
            // Preenche os campos automaticamente
            setValue('logradouro', data.logradouro || '', {
              shouldValidate: true,
            });
            setValue('bairro', data.bairro || '', {
              shouldValidate: true,
            });
            setValue('cidade', data.localidade || '', {
              shouldValidate: true,
            });
            setValue('UF', data.uf || '', {
              shouldValidate: true,
            });
            setWrite(false);
            document.getElementById('numero')?.focus();
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
        } catch (_error: any) {
          setError('cep', {
            type: 'manual',
            message: 'Erro ao buscar CEP. Preencha manualmente.',
          });
          setWrite(true);
        } finally {
          setLoadingCep(false);
        }
      };
      fetchAddress();
    }
  }, [cepValue, setValue, setError, clearErrors]);
  return (
    <div className="grid grid-cols-1 gap-6 p-1">
      <div className="col-span-2">
        <InputLabel
          {...registerWithMask('cep', '99999-999')}
          autoFocus
          error={errors.form?.message}
          id="cep"
          label="CEP"
          placeholder="00000-000"
          required
        />
        {loadingCep && (
          <div className="absolute right-3 top-8 flex items-center">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        )}
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
          disabled={!write}
          id="cidade"
          label="Cidade"
          placeholder="Digite a cidade"
          required
        />
        <InputLabel
          {...register('UF')}
          disabled={!write}
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
