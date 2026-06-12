<<<<<<< Updated upstream
import { format } from 'date-fns';
=======
import { format, parse } from 'date-fns';
>>>>>>> Stashed changes
import { z } from 'zod';
export const familyMemberSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .max(100, 'Máximo 100 caracteres'),
  cpf: z
    .string()
    .transform((v) => v.replace(/\D/g, ''))
    .pipe(z.string().length(11, 'CPF inválido')),
  // Zod agora aceita o objeto Date e converte pra string pro Backend!
  data_nascimento: z
    .date({
      error: 'Data de nascimento é obrigatória',
    })
    .transform((date) => format(date, 'yyyy-MM-dd')),
  relacao_parentesco: z.string().min(1, 'Relação de parentesco é obrigatória'),
});
export const familySchema = z.object({
  name: z.string().min(1, 'Nome do responsável é obrigatório'),
  cpf: z
    .string()
    .transform((v) => v.replace(/\D/g, ''))
    .pipe(z.string().length(11, 'CPF inválido')),
  telefone: z
    .string()
    .transform((v) => v.replace(/\D/g, ''))
    .pipe(z.string().min(10, 'Telefone inválido').max(11, 'Telefone inválido')),
  email: z.string().email('E-mail inválido').or(z.literal('')).optional(),
  data_nascimento: z
    .date({
      error: 'Data de nascimento é obrigatória',
    })
    .transform((date) => format(date, 'yyyy-MM-dd')),
  family_members: z.array(familyMemberSchema).optional(),
  cep: z
    .string()
    .transform((v) => v.replace(/\D/g, ''))
    .pipe(z.string().length(8, 'CEP inválido')),
  logradouro: z.string().min(1, 'Logradouro é obrigatório'),
  numero: z.number().min(1, 'Número é obrigatório'),
  cidade: z.string().min(1, 'Cidade é obrigatória'),
  UF: z.string().length(2, 'UF deve ter 2 caracteres'),
  bairro: z.string().min(1, 'Bairro é obrigatório'),
  moradia: z.enum(['propria', 'alugada', 'cedida']).optional(),
  fonte_renda: z.string().optional(),
  renda_familiar: z.union([z.string(), z.number()]).optional(),
  recebe_auxilio: z.enum(['sim', 'nao']).optional(),
  auxilios_recebidos: z.string().optional(),
  general_observations: z.string().optional(),
});
export type FormData = z.infer<typeof familySchema>;
export const defaultValues: FormData = {
  name: '',
  cpf: '',
  telefone: '',
  email: '',
  data_nascimento: '',
  family_members: [],
  cep: '',
  logradouro: '',
  numero: 0,
  cidade: '',
  UF: '',
  bairro: '',
  moradia: undefined,
  fonte_renda: '',
  renda_familiar: '',
  recebe_auxilio: undefined,
  auxilios_recebidos: '',
  general_observations: '',
};
<<<<<<< Updated upstream
=======

function strip(value: string | null | undefined): string {
  return (value ?? '').replace(/\D/g, '');
}

export function familyToFormData(family: Family): FormData {
  return {
    name: family.responsible_name,
    cpf: strip(family.responsible_cpf),
    telefone: strip(family.responsible_phone),
    email: family.responsible_email ?? '',
    data_nascimento: family.responsible_birth_date
      ? (parseISO(family.responsible_birth_date) as unknown as string)
      : '',
    family_members: (family.members ?? []).map((m) => ({
      name: m.name,
      cpf: strip(m.cpf),
      data_nascimento: m.birth_date
        ? (parseISO(m.birth_date) as unknown as string)
        : '',
      relacao_parentesco: m.relationship,
    })),
    cep: strip(family.address?.zipcode),
    logradouro: family.address?.street ?? '',
    numero: Number(family.address?.number) || 0,
    cidade: family.address?.city ?? '',
    UF: family.address?.state ?? '',
    bairro: family.address?.neighborhood ?? '',
    moradia: (family.housing_condition as FormData['moradia']) ?? undefined,
    fonte_renda: family.income_source ?? '',
    renda_familiar: family.total_income ? family.total_income / 100 : '',
    recebe_auxilio: family.receives_government_aid ? 'sim' : 'nao',
    auxilios_recebidos: family.government_aid_description ?? '',
    general_observations: family.general_observations ?? '',
  };
}
>>>>>>> Stashed changes
