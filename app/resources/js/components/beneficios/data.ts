import type { Benefit, PaginationResult } from './types';

export const LOW_STOCK_THRESHOLD = 20;

export const BENEFITS: Benefit[] = [
  { code: '#BNF-001', name: 'Cesta básica padrão', category: 'Alimentação', stock: 145, status: 'Ativo' },
  { code: '#BNF-002', name: 'Voucher R$ 100', category: 'Financeiro', stock: 50, status: 'Ativo' },
  { code: '#BNF-003', name: 'Kit higiene', category: 'Saúde', stock: 210, status: 'Ativo' },
  { code: '#BNF-004', name: 'Cesta básica completa', category: 'Alimentação', stock: 85, status: 'Ativo' },
  { code: '#BNF-005', name: 'Auxílio gás', category: 'Financeiro', stock: 12, status: 'Ativo' },
  { code: '#BNF-006', name: 'Kit material escolar', category: 'Educação', stock: 67, status: 'Ativo' },
  { code: '#BNF-007', name: 'Cesta natalina', category: 'Alimentação', stock: 8, status: 'Revisão' },
  { code: '#BNF-008', name: 'Voucher R$ 200', category: 'Financeiro', stock: 30, status: 'Ativo' },
  { code: '#BNF-009', name: 'Kit primeiros socorros', category: 'Saúde', stock: 15, status: 'Revisão' },
  { code: '#BNF-010', name: 'Uniforme escolar', category: 'Vestuário', stock: 42, status: 'Ativo' },
  { code: '#BNF-011', name: 'Cesta básica leve', category: 'Alimentação', stock: 180, status: 'Ativo' },
  { code: '#BNF-012', name: 'Auxílio transporte', category: 'Financeiro', stock: 5, status: 'Revisão' },
  { code: '#BNF-013', name: 'Kit higiene bucal', category: 'Saúde', stock: 95, status: 'Ativo' },
  { code: '#BNF-014', name: 'Calçados infantis', category: 'Vestuário', stock: 18, status: 'Revisão' },
  { code: '#BNF-015', name: 'Cesta de frutas', category: 'Alimentação', stock: 60, status: 'Ativo' },
  { code: '#BNF-016', name: 'Curso profissionalizante', category: 'Educação', stock: 25, status: 'Ativo' },
  { code: '#BNF-017', name: 'Kit cama e mesa', category: 'Vestuário', stock: 3, status: 'Inativo' },
  { code: '#BNF-018', name: 'Voucher R$ 50', category: 'Financeiro', stock: 110, status: 'Ativo' },
];

export const CATEGORY_OPTIONS: { value: string; label: string }[] = [
  { value: 'all', label: 'Todas as Categorias' },
  { value: 'Alimentação', label: 'Alimentação' },
  { value: 'Financeiro', label: 'Financeiro' },
  { value: 'Saúde', label: 'Saúde' },
  { value: 'Vestuário', label: 'Vestuário' },
  { value: 'Educação', label: 'Educação' },
];

export function filterBenefits(
  benefits: Benefit[],
  { search, category }: { search: string; category: string },
): Benefit[] {
  let result = benefits;

  if (category && category !== 'all') {
    result = result.filter((b) => b.category === category);
  }

  if (search.trim()) {
    const q = search.toLowerCase().trim();
    result = result.filter(
      (b) =>
        b.name.toLowerCase().includes(q) || b.code.toLowerCase().includes(q) || b.category.toLowerCase().includes(q),
    );
  }

  return result;
}

export function paginate<T>(items: T[], currentPage: number, pageSize: number): PaginationResult<T> {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (safePage - 1) * pageSize + 1;
  const endIndex = Math.min(safePage * pageSize, total);

  return {
    items: items.slice((safePage - 1) * pageSize, safePage * pageSize),
    total,
    totalPages,
    startIndex: total === 0 ? 0 : startIndex,
    endIndex,
  };
}
