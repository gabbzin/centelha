export interface FontOption {
  id: string
  label: string
  type: 'system' | 'google'
}
export const AVAILABLE_FONTS: FontOption[] = [
  {
    id: 'Inter, sans-serif',
    label: 'Inter (Sistema)',
    type: 'system',
  },
  {
    id: 'system-ui, sans-serif',
    label: 'Padrão do Sistema',
    type: 'system',
  },
  {
    id: 'Roboto',
    label: 'Roboto',
    type: 'google',
  },
  {
    id: 'Poppins',
    label: 'Poppins',
    type: 'google',
  },
  {
    id: 'Open Sans',
    label: 'Open Sans',
    type: 'google',
  },
]
