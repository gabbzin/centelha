import type { Delivery, PaginationResult, SelectOption } from './types';
export interface BeneficiaryOption {
  value: string;
  label: string;
  cpf: string;
  nis: string;
}
export const BENEFICIARY_OPTIONS: BeneficiaryOption[] = [
  {
    value: '1',
    label: 'Maria Aparecida Souza',
    cpf: '123.456.789-00',
    nis: '12345678901',
  },
  {
    value: '2',
    label: 'José da Silva Santos',
    cpf: '987.654.321-00',
    nis: '98765432100',
  },
  {
    value: '3',
    label: 'Ana Paula Ferreira',
    cpf: '456.789.123-00',
    nis: '45678912300',
  },
  {
    value: '4',
    label: 'Carlos Eduardo Lima',
    cpf: '789.123.456-00',
    nis: '78912345600',
  },
  {
    value: '5',
    label: 'Fernanda Costa Oliveira',
    cpf: '321.654.987-00',
    nis: '32165498700',
  },
];
export const BENEFIT_TYPE_OPTIONS: SelectOption[] = [
  {
    value: 'cesta_basica_padrao',
    label: 'Cesta Básica Padrão',
  },
  {
    value: 'cesta_basica_completa',
    label: 'Cesta Básica Completa',
  },
  {
    value: 'kit_higiene',
    label: 'Kit Higiene',
  },
  {
    value: 'voucher_gas',
    label: 'Voucher Gás',
  },
  {
    value: 'voucher_alimentacao',
    label: 'Voucher Alimentação',
  },
  {
    value: 'kit_material_escolar',
    label: 'Kit Material Escolar',
  },
  {
    value: 'cesta_natalina',
    label: 'Cesta Natalina',
  },
];
export const LOCATION_OPTIONS: SelectOption[] = [
  {
    value: 'centro_comunitario_a',
    label: 'Centro Comunitário A',
  },
  {
    value: 'posto_saude_b',
    label: 'Posto de Saúde B',
  },
  {
    value: 'supermercado_parceria',
    label: 'Supermercado Parceria',
  },
  {
    value: 'escola_municipal_c',
    label: 'Escola Municipal C',
  },
];
export const DELIVERIES: Delivery[] = [
  {
    code: '#ENT-3450',
    date: '2026-04-04',
    benefit: 'Cesta Básica Padrão',
    quantity: 1,
    unitLabel: 'unidade',
    location: 'Centro Comunitário A',
    status: 'Entregue',
    deliveredBy: 'João Silva',
  },
  {
    code: '#ENT-3391',
    date: '2026-03-15',
    benefit: 'Kit Higiene',
    quantity: 2,
    unitLabel: 'unidades',
    location: 'Posto de Saúde B',
    status: 'Entregue',
    deliveredBy: 'Maria Souza',
  },
  {
    code: '#ENT-3212',
    date: '2026-03-12',
    benefit: 'Voucher Gás',
    quantity: 1,
    unitLabel: 'unidade',
    location: 'Supermercado Parceria',
    status: 'Entregue',
    deliveredBy: 'João Silva',
  },
  {
    code: '#ENT-3389',
    date: '2026-03-10',
    benefit: 'Cesta Básica Padrão',
    quantity: 1,
    unitLabel: 'unidade',
    location: 'Centro Comunitário A',
    status: 'Entregue',
    deliveredBy: 'Ana Paula',
  },
  {
    code: '#ENT-3201',
    date: '2026-02-28',
    benefit: 'Kit Material Escolar',
    quantity: 3,
    unitLabel: 'unidades',
    location: 'Escola Municipal C',
    status: 'Entregue',
    deliveredBy: 'Carlos Eduardo',
  },
  {
    code: '#ENT-3150',
    date: '2026-02-15',
    benefit: 'Voucher Alimentação',
    quantity: 1,
    unitLabel: 'unidade',
    location: 'Supermercado Parceria',
    status: 'Entregue',
    deliveredBy: 'Maria Souza',
  },
  {
    code: '#ENT-3102',
    date: '2026-01-20',
    benefit: 'Kit Higiene',
    quantity: 1,
    unitLabel: 'unidade',
    location: 'Posto de Saúde B',
    status: 'Entregue',
    deliveredBy: 'João Silva',
  },
  {
    code: '#ENT-3050',
    date: '2026-01-10',
    benefit: 'Cesta Básica Padrão',
    quantity: 2,
    unitLabel: 'unidades',
    location: 'Centro Comunitário A',
    status: 'Entregue',
    deliveredBy: 'Ana Paula',
  },
  {
    code: '#ENT-2980',
    date: '2025-12-22',
    benefit: 'Cesta Natalina',
    quantity: 1,
    unitLabel: 'unidade',
    location: 'Centro Comunitário A',
    status: 'Entregue',
    deliveredBy: 'Carlos Eduardo',
  },
  {
    code: '#ENT-2910',
    date: '2025-12-10',
    benefit: 'Voucher Gás',
    quantity: 1,
    unitLabel: 'unidade',
    location: 'Supermercado Parceria',
    status: 'Entregue',
    deliveredBy: 'Maria Souza',
  },
  {
    code: '#ENT-2850',
    date: '2025-11-28',
    benefit: 'Kit Higiene',
    quantity: 2,
    unitLabel: 'unidades',
    location: 'Posto de Saúde B',
    status: 'Entregue',
    deliveredBy: 'João Silva',
  },
  {
    code: '#ENT-2801',
    date: '2025-11-15',
    benefit: 'Cesta Básica Padrão',
    quantity: 1,
    unitLabel: 'unidade',
    location: 'Centro Comunitário A',
    status: 'Entregue',
    deliveredBy: 'Ana Paula',
  },
  {
    code: '#ENT-2750',
    date: '2025-10-30',
    benefit: 'Voucher Alimentação',
    quantity: 1,
    unitLabel: 'unidade',
    location: 'Supermercado Parceria',
    status: 'Entregue',
    deliveredBy: 'Carlos Eduardo',
  },
  {
    code: '#ENT-2700',
    date: '2025-10-12',
    benefit: 'Kit Higiene',
    quantity: 1,
    unitLabel: 'unidade',
    location: 'Posto de Saúde B',
    status: 'Entregue',
    deliveredBy: 'Maria Souza',
  },
  {
    code: '#ENT-2650',
    date: '2025-09-25',
    benefit: 'Cesta Básica Padrão',
    quantity: 2,
    unitLabel: 'unidades',
    location: 'Centro Comunitário A',
    status: 'Entregue',
    deliveredBy: 'João Silva',
  },
  {
    code: '#ENT-2600',
    date: '2025-09-10',
    benefit: 'Voucher Gás',
    quantity: 1,
    unitLabel: 'unidade',
    location: 'Supermercado Parceria',
    status: 'Entregue',
    deliveredBy: 'Ana Paula',
  },
  {
    code: '#ENT-2550',
    date: '2025-08-28',
    benefit: 'Kit Material Escolar',
    quantity: 2,
    unitLabel: 'unidades',
    location: 'Escola Municipal C',
    status: 'Entregue',
    deliveredBy: 'Carlos Eduardo',
  },
  {
    code: '#ENT-2501',
    date: '2025-08-15',
    benefit: 'Cesta Básica Padrão',
    quantity: 1,
    unitLabel: 'unidade',
    location: 'Centro Comunitário A',
    status: 'Entregue',
    deliveredBy: 'Maria Souza',
  },
  {
    code: '#ENT-2450',
    date: '2025-07-30',
    benefit: 'Kit Higiene',
    quantity: 2,
    unitLabel: 'unidades',
    location: 'Posto de Saúde B',
    status: 'Entregue',
    deliveredBy: 'João Silva',
  },
  {
    code: '#ENT-2400',
    date: '2025-07-10',
    benefit: 'Voucher Alimentação',
    quantity: 1,
    unitLabel: 'unidade',
    location: 'Supermercado Parceria',
    status: 'Entregue',
    deliveredBy: 'Ana Paula',
  },
];
const NON_DIGIT_RE = /\D/g;
export function parseDate(value: string): Date | null {
  if (!value) return null;
  const [day, month, year] = value.split('/');
  if (!day || !month || !year) return null;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  if (Number.isNaN(date.getTime())) return null;
  return date;
}
export function parseISODate(value: string): Date {
  const [year, month, day] = value.split('-');
  return new Date(Number(year), Number(month) - 1, Number(day));
}
export function formatInputDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
export function applyDateMask(value: string): string {
  const digits = value.replace(NON_DIGIT_RE, '').slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}
export function formatDisplayDate(dateString: string): string {
  const date = parseISODate(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}
export function filterDeliveries(
  deliveries: Delivery[],
  {
    search,
    startDate,
    endDate,
  }: {
    search: string;
    startDate: string;
    endDate: string;
  },
): Delivery[] {
  let result = deliveries;
  const from = parseDate(startDate);
  const to = parseDate(endDate);
  if (from) {
    result = result.filter((d) => parseISODate(d.date) >= from);
  }
  if (to) {
    const end = new Date(
      to.getFullYear(),
      to.getMonth(),
      to.getDate(),
      23,
      59,
      59,
    );
    result = result.filter((d) => parseISODate(d.date) <= end);
  }
  if (search.trim()) {
    const q = search.toLowerCase().trim();
    result = result.filter(
      (d) =>
        d.code.toLowerCase().includes(q) ||
        d.benefit.toLowerCase().includes(q) ||
        d.location.toLowerCase().includes(q) ||
        d.deliveredBy.toLowerCase().includes(q) ||
        formatDisplayDate(d.date).toLowerCase().includes(q),
    );
  }
  return result;
}
export function paginate<T>(
  items: T[],
  currentPage: number,
  pageSize: number,
): PaginationResult<T> {
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
