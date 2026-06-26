export type FontSource = 'system' | 'google'

export interface FontOption {
  /** Slug enviado ao backend no campo `fontFamily`. */
  value: string
  /** Rótulo exibido no select. */
  label: string
  /** Stack CSS aplicado à variável `--app-font-sans`. */
  fontFamily: string
  type: FontSource
}

export const AVAILABLE_FONTS: FontOption[] = [
  {
    value: 'inter',
    label: 'Inter',
    fontFamily: "'Inter Variable', 'Inter', sans-serif",
    type: 'system',
  },
  {
    value: 'ibm-plex-sans',
    label: 'IBM Plex Sans',
    fontFamily: "'IBM Plex Sans', sans-serif",
    type: 'google',
  },
  {
    value: 'poppins',
    label: 'Poppins',
    fontFamily: "'Poppins', sans-serif",
    type: 'google',
  },
  {
    value: 'roboto',
    label: 'Roboto',
    fontFamily: "'Roboto', sans-serif",
    type: 'google',
  },
  {
    value: 'open-sans',
    label: 'Open Sans',
    fontFamily: "'Open Sans', sans-serif",
    type: 'google',
  },
  {
    value: 'system-ui',
    label: 'Padrão do Sistema',
    fontFamily: 'system-ui, sans-serif',
    type: 'system',
  },
]

export const DEFAULT_FONT = AVAILABLE_FONTS[0]

/**
 * Retorna a opção de fonte correspondente ao valor salvo.
 * Faz fallback tolerante para valores antigos salvos como label
 * (ex: "Inter", "Poppins") ou slug (ex: "poppins").
 */
export function getFontByValue(value: string | undefined | null): FontOption {
  if (!value) return DEFAULT_FONT

  const normalized = value.trim().toLowerCase()

  const byValue = AVAILABLE_FONTS.find((font) => font.value === normalized)
  if (byValue) return byValue

  const byLabel = AVAILABLE_FONTS.find(
    (font) => font.label.toLowerCase() === normalized,
  )
  if (byLabel) return byLabel

  return DEFAULT_FONT
}

/** Retorna o stack CSS da fonte selecionada. */
export function getFontFamilyByValue(
  value: string | undefined | null,
): string {
  return getFontByValue(value).fontFamily
}

/** Opções formatadas para o componente `<InputSelect />`. */
export const FONT_SELECT_OPTIONS = AVAILABLE_FONTS.map((font) => ({
  label: font.label,
  value: font.value,
}))
