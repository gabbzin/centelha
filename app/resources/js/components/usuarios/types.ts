export type UserRole = 'Administrador' | 'Operador'

export type UserStatus = 'Ativo' | 'Inativo'

export interface User {
  id: number
  name: string
  email: string
  data_nascimento: string | null
  role: UserRole
  status: UserStatus
  last_access: string | null
  created_at: string
}

export type BenefitCategory =
  | 'Alimentação'
  | 'Gás'
  | 'Higiene'
  | 'Vestuário'
  | 'Educação'
  | 'Emergência'

export interface Benefit {
  id: number
  name: string
  category: BenefitCategory
  description: string
  created_at: string
}

export interface PaginatedUsers {
  data: User[]
  current_page: number
  last_page: number
  from: number | null
  to: number | null
  total: number
  per_page: number
}

export const ROLE_OPTIONS: { value: UserRole | 'all'; label: string }[] = [
  { value: 'all', label: 'Todos os perfis' },
  { value: 'Administrador', label: 'Administrador' },
  { value: 'Operador', label: 'Operador' },
]

export const ROLE_OPTIONS_FORM: { value: UserRole; label: string }[] = [
  { value: 'Administrador', label: 'Administrador' },
  { value: 'Operador', label: 'Operador' },
]

export const STATUS_OPTIONS_FORM: { value: UserStatus; label: string }[] = [
  { value: 'Ativo', label: 'Ativo' },
  { value: 'Inativo', label: 'Inativo' },
]
