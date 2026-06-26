export type UserRole = 'admin' | 'operador'

export type UserStatus = 'Ativo' | 'Inativo'

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  admin: 'Administrador',
  operador: 'Operador',
}

export const userRoleLabel = (role: UserRole): string =>
  USER_ROLE_LABELS[role] ?? role

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
  { value: 'admin', label: 'Administrador' },
  { value: 'operador', label: 'Operador' },
]

export const ROLE_OPTIONS_FORM: { value: UserRole; label: string }[] = [
  { value: 'admin', label: 'Administrador' },
  { value: 'operador', label: 'Operador' },
]

export const STATUS_OPTIONS_FORM: { value: UserStatus; label: string }[] = [
  { value: 'Ativo', label: 'Ativo' },
  { value: 'Inativo', label: 'Inativo' },
]

export interface Tag {
  id: number
  name: string
  color: string
  icon: string | null
  created_at: string
}

export interface PaginatedTags {
  data: Tag[]
  current_page: number
  last_page: number
  from: number | null
  to: number | null
  total: number
  per_page: number
}
