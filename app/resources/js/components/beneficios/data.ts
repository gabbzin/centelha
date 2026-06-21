export const LOW_STOCK_THRESHOLD = 20

export const CATEGORY_OPTIONS: { value: string; label: string }[] = [
  { value: 'all', label: 'Todas as Categorias' },
  { value: 'Alimentação', label: 'Alimentação' },
  { value: 'Financeiro', label: 'Financeiro' },
  { value: 'Saúde', label: 'Saúde' },
  { value: 'Vestuário', label: 'Vestuário' },
  { value: 'Educação', label: 'Educação' },
]

export function formatIsoDateToDisplay(
  dateString: string | null,
): string | null {
  if (!dateString) return null
  const d = new Date(dateString)
  if (Number.isNaN(d.getTime())) return null
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

export function formatIsoDateToInput(dateString: string | null): string | null {
  if (!dateString) return null
  const d = new Date(dateString)
  if (Number.isNaN(d.getTime())) return null
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${year}-${month}-${day}`
}
