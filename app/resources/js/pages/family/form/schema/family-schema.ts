import { format } from 'date-fns';
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
};
