export type UserRole =
  | 'Administrador'
  | 'Agente de Saúde'
  | 'Voluntário'
  | 'Coordenador'

export type UserStatus = 'Ativo' | 'Inativo' | 'Pendente'

export interface User {
  id: number
  name: string
  email: string
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
  { value: 'Coordenador', label: 'Coordenador' },
  { value: 'Agente de Saúde', label: 'Agente de Saúde' },
  { value: 'Voluntário', label: 'Voluntário' },
]

export const ROLE_OPTIONS_FORM: { value: UserRole; label: string }[] = [
  { value: 'Administrador', label: 'Administrador' },
  { value: 'Coordenador', label: 'Coordenador' },
  { value: 'Agente de Saúde', label: 'Agente de Saúde' },
  { value: 'Voluntário', label: 'Voluntário' },
]

export const STATUS_OPTIONS_FORM: { value: UserStatus; label: string }[] = [
  { value: 'Ativo', label: 'Ativo' },
  { value: 'Inativo', label: 'Inativo' },
  { value: 'Pendente', label: 'Pendente' },
]
