export type BenefitCategory =
  | 'Alimentação'
  | 'Financeiro'
  | 'Saúde'
  | 'Vestuário'
  | 'Educação';
export interface Benefit {
  code: string;
  name: string;
  category: BenefitCategory;
  stock: number;
  status: 'Ativo' | 'Revisão' | 'Inativo';
}
export interface PaginationState {
  currentPage: number;
  pageSize: number;
}
export interface PaginationResult<T> {
  items: T[];
  total: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
}
