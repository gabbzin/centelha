import type { Delivery, PaginationResult } from './types'

const NON_DIGIT_RE = /\D/g

export function parseDate(value: string): Date | null {
  if (!value) return null
  const [day, month, year] = value.split('/')
  if (!day || !month || !year) return null
  const date = new Date(Number(year), Number(month) - 1, Number(day))
  if (Number.isNaN(date.getTime())) return null
  return date
}

export function parseISODate(value: string): Date {
  const datePart = value.slice(0, 10)
  const [year, month, day] = datePart.split('-')
  return new Date(Number(year), Number(month) - 1, Number(day))
}

export function formatInputDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

export function applyDateMask(value: string): string {
  const digits = value.replace(NON_DIGIT_RE, '').slice(0, 8)
  if (digits.length <= 2) return digits
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
}

export function formatDisplayDate(dateString: string): string {
  const date = parseISODate(dateString)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function normalizeDelivery(raw: any): Delivery {
  return {
    id: raw.id,
    code: raw.code,
    date: raw.delivery_date,
    benefit: raw.benefit?.name ?? '-',
    quantity: raw.quantity,
    location: raw.location,
    status: raw.status ?? 'Entregue',
    deliveredBy: raw.delivered_by?.name ?? '-',
    notes: raw.notes ?? null,
    receipt_path: raw.receipt_path ?? null,
    receipt_url: raw.receipt_url ?? null,
    family: raw.family,
  }
}

export function filterDeliveries(
  deliveries: Delivery[],
  {
    search,
    startDate,
    endDate,
  }: { search: string; startDate: string; endDate: string },
): Delivery[] {
  let result = deliveries

  const from = parseDate(startDate)
  const to = parseDate(endDate)

  if (from) {
    result = result.filter((d) => parseISODate(d.date) >= from)
  }

  if (to) {
    const end = new Date(
      to.getFullYear(),
      to.getMonth(),
      to.getDate(),
      23,
      59,
      59,
    )
    result = result.filter((d) => parseISODate(d.date) <= end)
  }

  if (search.trim()) {
    const q = search.toLowerCase().trim()
    result = result.filter(
      (d) =>
        d.code.toLowerCase().includes(q) ||
        d.benefit.toLowerCase().includes(q) ||
        d.location.toLowerCase().includes(q) ||
        d.deliveredBy.toLowerCase().includes(q) ||
        formatDisplayDate(d.date).toLowerCase().includes(q),
    )
  }

  return result
}

export function paginate<T>(
  items: T[],
  currentPage: number,
  pageSize: number,
): PaginationResult<T> {
  const total = items.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(Math.max(1, currentPage), totalPages)
  const startIndex = (safePage - 1) * pageSize + 1
  const endIndex = Math.min(safePage * pageSize, total)

  return {
    items: items.slice((safePage - 1) * pageSize, safePage * pageSize),
    total,
    totalPages,
    startIndex: total === 0 ? 0 : startIndex,
    endIndex,
  }
}
