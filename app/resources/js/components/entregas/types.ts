export type DeliveryStatus = 'Entregue'

export interface DeliveryFamily {
  id: number
  responsible_name: string
  responsible_cpf?: string | null
  address?: {
    street: string
    number?: string | null
    neighborhood: string
    city: string
    state: string
  } | null
  members?: Array<{ name: string; relationship?: string | null }>
}

export interface DeliveryBenefit {
  id: number
  name: string
}

export interface DeliveryUser {
  id: number
  name: string
}

export interface Delivery {
  id: number
  code: string
  date: string
  benefit: string
  quantity: number
  location: string
  status: DeliveryStatus
  deliveredBy: string
  notes?: string | null
  receipt_path?: string | null
  family?: DeliveryFamily
}

export interface SelectOption {
  value: string
  label: string
}

export interface BeneficiaryOption {
  value: string
  label: string
  cpf?: string | null
}

export interface BenefitOption {
  id: number
  name: string
  stock: number
}

export interface PaginationState {
  currentPage: number
  pageSize: number
}

export interface PaginationResult<T> {
  items: T[]
  total: number
  totalPages: number
  startIndex: number
  endIndex: number
}
