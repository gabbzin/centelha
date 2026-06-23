export type BenefitCategory =
  | 'Alimentação'
  | 'Financeiro'
  | 'Saúde'
  | 'Vestuário'
  | 'Educação'

export interface Benefit {
  id: number
  code: string
  name: string
  category: BenefitCategory
  stock: number
  status: 'Ativo' | 'Revisão' | 'Inativo'
  donor: string | null
  validity: string | null
  notes: string | null
  image_path: string | null
  image_url: string | null
  created_by: number | null
  creator: { id: number; name: string } | null
  created_at: string
  updated_at: string
}

export interface PaginatedBenefits {
  data: Benefit[]
  current_page: number
  last_page: number
  from: number
  to: number
  total: number
  per_page: number
  links: { url: string | null; label: string; active: boolean }[]
}
