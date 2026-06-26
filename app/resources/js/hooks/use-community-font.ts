import { usePage } from '@inertiajs/react'
import { useEffect } from 'react'
import { getFontFamilyByValue } from '@/settings/fonts'
import type { SharedData } from '@/types'

const FONT_CSS_VARIABLE = '--app-font-sans'

/**
 * Aplica a fonte configurada no `communityCenter.fontFamily`
 * à variável CSS `--app-font-sans`.
 *
 * Como o token `--font-sans` do Tailwind aponta para essa variável,
 * toda a plataforma reflete a fonte selecionada em tempo real.
 */
export function useCommunityFont() {
  const { communityCenter } = usePage<SharedData>().props

  useEffect(() => {
    const fontFamily = getFontFamilyByValue(communityCenter?.fontFamily)
    document.documentElement.style.setProperty(FONT_CSS_VARIABLE, fontFamily)
  }, [communityCenter?.fontFamily])
}
