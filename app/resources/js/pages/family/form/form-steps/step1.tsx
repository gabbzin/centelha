import { InputLabel } from '@/components/inputs/input-label';
import { Button } from '@/components/ui/button';
import { Trash2Icon } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
export function Step1() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'family_members',
  });
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
          {...register('cpf')}
          id="cpf"
          label="CPF"
          maxLength={11}
          placeholder="000.000.000-00"
          required
        />
        <InputLabel
          {...register('telefone')}
          id="telefone"
          label="Telefone"
          placeholder="(00) 00000-0000"
          required
        />
      </div>

      <div className="col-span-2 flex items-center justify-between gap-4 *:flex-1">
        <InputLabel
          {...register('email')}
          id="E-mail"
          label="E-mail"
          placeholder="nome@email.com"
        />
        {/* Trocar para um calendar Select */}
        <InputLabel
          {...register('data_nascimento')}
          id="data_nascimento"
          label="Data de Nascimento"
          placeholder="00/00/0000"
          required
        />
      </div>

      <div className="col-span-2 flex items-center justify-end text-xs font-bold text-[#094785] uppercase">
        Membros adicionados: {fields.length}
      </div>

      <div className="col-span-2 space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-end justify-between gap-4">
            <div className="flex-1">
              <InputLabel
                {...register(`family_members.${index}.name`)}
                label="Nome do Membro Familiar"
                maxLength={100}
                placeholder="Digite o nome do membro familiar"
                required
              />
            </div>
            <div className="flex-1">
              <InputLabel
                {...register(`family_members.${index}.cpf`)}
                label="CPF do membro familiar"
                maxLength={11}
                placeholder="000.000.000-00"
                required
              />
            </div>
            <div className="flex-1">
              <InputLabel
                {...register(`family_members.${index}.data_nascimento`)}
                label="Data de Nascimento"
                placeholder="00/00/0000"
                required
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
            });
          }}
          type="button"
          variant={'ghost'}
        >
          + Adicionar novo membro
        </Button>
      </div>
    </div>
  );
}
