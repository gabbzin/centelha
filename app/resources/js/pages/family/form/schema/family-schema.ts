import { z } from 'zod';
export const familyMemberSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome é obrigatório')
    .max(100, 'Máximo 100 caracteres'),
  cpf: z.string().regex(/^\d{11}$/, 'CPF inválido'),
  data_nascimento: z.string().min(1, 'Data de nascimento é obrigatória'),
});
export const familySchema = z.object({
  name: z.string().min(1, 'Nome do responsável é obrigatório'),
  cpf: z.string().regex(/^\d{11}$/, 'CPF inválido'),
  telefone: z.string().regex(/^\d{10,11}$/, 'Telefone inválido'),
  email: z.email('E-mail inválido').optional(),
  data_nascimento: z.string().min(1, 'Data de nascimento é obrigatória'),
  family_members: z.array(familyMemberSchema).optional(),
  cep: z.string().regex(/^\d{8}$/, 'CEP inválido'),
  logradouro: z.string().min(1, 'Logradouro é obrigatório'),
  numero: z.string().min(1, 'Número é obrigatório'),
  cidade: z.string().min(1, 'Cidade é obrigatória'),
  UF: z.string().length(2, 'UF deve ter 2 caracteres'),
  Bairro: z.string().min(1, 'Bairro é obrigatório'),
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
  numero: '',
  cidade: '',
  UF: '',
  Bairro: '',
};
