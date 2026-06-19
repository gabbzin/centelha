import type { LucideIcon } from 'lucide-react'
export interface Auth {
  user: User
}
export interface BreadcrumbItem {
  title: string
  href: string
}
export interface NavGroup {
  title: string
  items: NavItem[]
}
export interface NavItem {
  title: string
  url: string
  icon?: LucideIcon | null
  isActive?: boolean
}
export interface CommunityCenter {
  id: number
  name: string
  location: string
  slogan: string
  rodape_text: string
  logo_path: string | null
  favicon_path: string | null
  fontFamily: string
  settings: Record<string, unknown>
  colors: Record<string, string>
  maintenance_mode: boolean
  social_links?: SocialLink[]
  created_at: string
  updated_at: string
}
export interface SocialLink {
  id: number
  community_center_id: number
  value: string
  created_at: string
  updated_at: string
}
export interface SharedData {
  name: string
  quote: {
    message: string
    author: string
  }
  auth: Auth
  communityCenter: CommunityCenter | null
  flash: {
    success: string | null
    error: string | null
  }
  [key: string]: unknown
}
export interface PaginatedData<T> {
  current_page: number
  data: T[]
  first_page_url: string
  from: number | null
  last_page: number
  last_page_url: string
  links: {
    url: string | null
    label: string
    page: number | null
    active: boolean
  }[]
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number | null
  total: number
}
export interface User {
  id: number
  name: string
  email: string
  avatar?: string
  email_verified_at: string | null
  created_at: string
  updated_at: string
  [key: string]: unknown // This allows for additional properties...
}
export interface SpecificNeed {
  id: number
  name: string
  created_at: string
  updated_at: string
}
export interface FamilyMember {
  id: number
  family_id: number
  name: string
  birth_date: string | null
  relationship: string
  cpf: string | null
  created_at: string
  updated_at: string
}
export interface Address {
  id: number
  family_id: number
  zipcode: string | null
  street: string
  number: string | null
  neighborhood: string
  city: string
  state: string
  created_at: string
  updated_at: string
}
export interface Family {
  id: number
  responsible_name: string
  responsible_cpf: string
  responsible_birth_date: string
  responsible_phone: string
  responsible_email: string | null
  is_active: boolean
  total_income: number // Decimal returns as string or number depending on DB driver, but usually number in frontend
  income_source: string | null
  receives_government_aid: boolean
  government_aid_description: string | null
  housing_condition: string | null
  general_observations: string | null
  created_at: string
  updated_at: string

  // Relacionamentos (carregados via Eager Loading 'with')
  address?: Address
  members?: FamilyMember[]
  members_count?: number
  total_members_count?: number // Campo adicionado no controller
  specific_needs?: SpecificNeed[]
}
