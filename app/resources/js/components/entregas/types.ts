export type DeliveryStatus = 'Entregue' | 'Pendente' | 'Cancelado'

export interface Delivery {
  code: string
  date: string
  benefit: string
  quantity: number
  unitLabel: string
  location: string
  status: DeliveryStatus
  deliveredBy: string
}

export interface SelectOption {
  value: string
  label: string
}

export interface BeneficiaryOption {
  value: string
  label: string
  cpf: string
  nis: string
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
