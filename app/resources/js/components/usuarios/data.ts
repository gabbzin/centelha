import {
  Baby,
  Backpack,
  Droplets,
  Flame,
  HeartHandshake,
  type LucideIcon,
  ShoppingBasket,
} from 'lucide-react'
import type { Benefit, BenefitCategory, User } from './types'

export const MOCK_USERS: User[] = [
  {
    id: 8932,
    name: 'Ana Dias',
    email: 'ana.dias@centelha.org',
    role: 'Administrador',
    status: 'Ativo',
    last_access: '2026-06-24T09:41:00',
    created_at: '2024-01-15T10:00:00',
  },
  {
    id: 8945,
    name: 'Carlos Mendes',
    email: 'carlos.mendes@centelha.org',
    role: 'Agente de Saúde',
    status: 'Inativo',
    last_access: '2026-06-23T16:20:00',
    created_at: '2024-02-08T10:00:00',
  },
  {
    id: 8971,
    name: 'Patrícia Lima',
    email: 'patricia.lima@centelha.org',
    role: 'Coordenador',
    status: 'Ativo',
    last_access: '2026-06-24T08:15:00',
    created_at: '2024-03-22T10:00:00',
  },
  {
    id: 8988,
    name: 'Rafael Souza',
    email: 'rafael.souza@centelha.org',
    role: 'Voluntário',
    status: 'Ativo',
    last_access: '2026-06-22T14:02:00',
    created_at: '2024-05-10T10:00:00',
  },
  {
    id: 9002,
    name: 'Mariana Costa',
    email: 'mariana.costa@centelha.org',
    role: 'Agente de Saúde',
    status: 'Pendente',
    last_access: null,
    created_at: '2026-06-20T10:00:00',
  },
  {
    id: 9010,
    name: 'Bruno Oliveira',
    email: 'bruno.oliveira@centelha.org',
    role: 'Voluntário',
    status: 'Ativo',
    last_access: '2026-06-19T11:48:00',
    created_at: '2025-01-12T10:00:00',
  },
]

export const MOCK_BENEFITS: Benefit[] = [
  {
    id: 1,
    name: 'Cesta Básica',
    category: 'Alimentação',
    description:
      'Fornecimento de mantimentos básicos de alimentação para garantir a segurança alimentar das famílias atendidas.',
    created_at: '2024-01-10T10:00:00',
  },
  {
    id: 2,
    name: 'Kit Gás',
    category: 'Gás',
    description:
      'Fornecimento ou subsídio de carga de botijão de gás doméstico (GLP) para preparo de refeições.',
    created_at: '2024-01-10T10:00:00',
  },
  {
    id: 3,
    name: 'Kit Higiene',
    category: 'Higiene',
    description:
      'Itens essenciais de asseio corporal, álcool e saneantes de ambiente.',
    created_at: '2024-01-10T10:00:00',
  },
  {
    id: 4,
    name: 'Enxoval Bebê',
    category: 'Vestuário',
    description:
      'Kit de roupas infantis básicas, fraldas e apoio inicial para mães e recém-nascidos.',
    created_at: '2024-01-10T10:00:00',
  },
  {
    id: 5,
    name: 'Kit Escolar',
    category: 'Educação',
    description:
      'Conjunto de cadernos, mochilas e materiais didáticos para estudantes da rede pública.',
    created_at: '2024-01-10T10:00:00',
  },
  {
    id: 6,
    name: 'Auxílio Emergencial',
    category: 'Emergência',
    description:
      'Apoio monetário extraordinário transitório ou recursos financeiros para situações críticas.',
    created_at: '2024-01-10T10:00:00',
  },
]

export const BENEFIT_CATEGORY_STYLES: Record<
  BenefitCategory,
  { label: string; className: string; icon: LucideIcon }
> = {
  Alimentação: {
    label: 'Cesta Básica',
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: ShoppingBasket,
  },
  Gás: {
    label: 'Kit Gás',
    className: 'bg-orange-50 text-orange-700 border-orange-200',
    icon: Flame,
  },
  Higiene: {
    label: 'Kit Higiene',
    className: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    icon: Droplets,
  },
  Vestuário: {
    label: 'Enxoval Bebê',
    className: 'bg-purple-50 text-purple-700 border-purple-200',
    icon: Baby,
  },
  Educação: {
    label: 'Kit Escolar',
    className: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: Backpack,
  },
  Emergência: {
    label: 'Auxílio Emergencial',
    className: 'bg-red-50 text-red-700 border-red-200',
    icon: HeartHandshake,
  },
}

export function formatLastAccess(iso: string | null): string {
  if (!iso) return '—'
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return '—'

  const now = new Date()
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  )
  const startOfDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  )
  const diffDays = Math.round(
    (startOfToday.getTime() - startOfDate.getTime()) / 86_400_000,
  )

  const time = date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })

  if (diffDays === 0) return `Hoje, ${time}`
  if (diffDays === 1) return `Ontem, ${time}`
  if (diffDays > 1 && diffDays < 7) {
    return `${diffDays} dias atrás, ${time}`
  }
  return date.toLocaleDateString('pt-BR')
}

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 0 || !parts[0]) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  const last = parts[parts.length - 1] ?? parts[0]
  return ((parts[0][0] ?? '') + (last[0] ?? '')).toUpperCase()
}
