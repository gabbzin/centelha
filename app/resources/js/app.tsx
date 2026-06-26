import '../css/app.css'
import 'leaflet/dist/leaflet.css'
import { createInertiaApp } from '@inertiajs/react'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { createRoot } from 'react-dom/client'
import type { route as routeFn } from 'ziggy-js'
import { initializeTheme } from './hooks/use-appearance'
import { getFontFamilyByValue } from './settings/fonts'
import type { SharedData } from './types'

declare global {
  const route: typeof routeFn
}

const _appName = import.meta.env.VITE_APP_NAME || 'Laravel'

function applyCommunityFont(props: Record<string, unknown>) {
  const shared = (props.initialPage?.props ?? props.props ?? {}) as SharedData
  const fontFamily = getFontFamilyByValue(shared.communityCenter?.fontFamily)
  document.documentElement.style.setProperty('--app-font-sans', fontFamily)
}

createInertiaApp({
  title: (title) => `${title}`,
  resolve: (name) =>
    resolvePageComponent(
      `./pages/${name}.tsx`,
      import.meta.glob('./pages/**/*.tsx'),
    ),
  setup({ el, App, props }) {
    applyCommunityFont(props as Record<string, unknown>)

    const root = createRoot(el)
    root.render(<App {...props} />)
  },
  progress: {
    color: '#4B5563',
  },
})

// This will set light / dark mode on load...
initializeTheme()
