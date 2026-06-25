import { router } from '@inertiajs/react'
import { SaveIcon } from 'lucide-react'
import { useCallback, useState } from 'react'
import { SettingsForm } from '@/components/customization/settings-form'
import { toaster } from '@/components/toasters/toast-alert'
import { Button } from '@/components/ui/button'
import { LayoutBase } from '@/layouts/layout'
import Login from '@/pages/auth/login'
import Dashboard from '@/pages/dashboard'
import Home from '@/pages/home'
import type { PageSchema } from '@/types'

interface EditProps {
  pageKey: string
  schema: PageSchema
  settings: Record<string, unknown>
}
const PAGE_LABELS: Record<string, string> = {
  dashboard: 'Dashboard',
  home: 'Página Inicial',
  login: 'Login',
  familia: 'Gestão de Famílias',
  beneficios: 'Controle de Estoque',
}
const PREVIEW_MOCK = {
  dashboard: {
    statsCards: {
      benefitsDelivered: {
        value: 1240,
        percentageChange: 15,
      },
      familiesServed: {
        value: 850,
        percentageChange: 8,
      },
      newRegistrations: {
        value: 230,
        percentageChange: -6,
      },
    },
    alerts: [
      {
        label: 'Cestas básicas',
        rest: 12,
        alertLevel: 'warning',
      },
      {
        label: 'Gás',
        rest: 8,
        alertLevel: 'critical',
      },
      {
        label: 'Kit Higiene',
        rest: 5,
        alertLevel: 'critical',
      },
    ],
    topItems: [
      {
        name: 'Cestas básicas',
        quantity: 270,
        percentage: 75,
      },
      {
        name: 'Gás',
        quantity: 150,
        percentage: 60,
      },
      {
        name: 'Kit Higiene',
        quantity: 90,
        percentage: 40,
      },
    ],
    chartData: [
      {
        name: 'Kit Higiene',
        anterior: 250,
        atual: 320,
      },
      {
        name: 'Cestas básicas',
        anterior: 300,
        atual: 270,
      },
      {
        name: 'Gás',
        anterior: 200,
        atual: 150,
      },
      {
        name: 'Medicamentos',
        anterior: 100,
        atual: 180,
      },
    ],
  },
}
export default function CustomizacaoTelaEdit({
  pageKey,
  schema,
  settings: initialSettings,
}: EditProps) {
  const [liveSettings, setLiveSettings] =
    useState<Record<string, unknown>>(initialSettings)
  const [saving, setSaving] = useState(false)
  const handleChange = useCallback((key: string, value: unknown) => {
    setLiveSettings((prev) => {
      const next = structuredClone(prev)
      const parts = key.split('.')
      let current: Record<string, unknown> = next as Record<string, unknown>
      for (let i = 0; i < parts.length - 1; i++) {
        if (
          current[parts[i]] === undefined ||
          typeof current[parts[i]] !== 'object'
        ) {
          current[parts[i]] = {}
        }
        current = current[parts[i]] as Record<string, unknown>
      }
      current[parts[parts.length - 1]] = value
      return next
    })
  }, [])
  const handleSave = () => {
    setSaving(true)
    const flat: Record<string, unknown> = {}
    for (const section of schema.sections) {
      for (const field of section.fields) {
        const parts = field.key.split('.')
        let current: unknown = liveSettings
        for (const part of parts) {
          if (current && typeof current === 'object') {
            current = (current as Record<string, unknown>)[part]
          }
        }
        const flatKey = field.key.replace(/\./g, '_')
        flat[flatKey] = current
      }
    }
    router.put(`/gestao-sistema/customizacao-tela/${pageKey}`, flat as never, {
      onSuccess: () => {
        toaster.createSuccess('Sucesso!', 'Configurações salvas com sucesso.')
        setSaving(false)
      },
      onError: () => {
        toaster.createError('Erro!', 'Ocorreu um erro ao salvar.')
        setSaving(false)
      },
    })
  }
  return (
    <LayoutBase
      description={`Personalize a tela "${PAGE_LABELS[pageKey] ?? pageKey}"`}
      rightComponent={
        <Button disabled={saving} onClick={handleSave}>
          <SaveIcon className="mr-2 size-4" />
          {saving ? 'Salvando...' : 'Publicar'}
        </Button>
      }
      tagTitle="Customização"
      titlePage={`Customizar: ${PAGE_LABELS[pageKey] ?? pageKey}`}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-8">
        <aside className="col-span-2">
          <SettingsForm
            onChange={handleChange}
            schema={schema}
            settings={liveSettings as unknown as Record<string, unknown>}
          />
        </aside>

        <div className="max-h-[calc(100vh-12rem)] overflow-y-auto rounded-lg border bg-white p-4 col-span-6 hidden lg:block">
          <PreviewRenderer pageKey={pageKey} settings={liveSettings} />
        </div>
      </div>
    </LayoutBase>
  )
}
function PreviewRenderer({
  pageKey,
  settings,
}: {
  pageKey: string
  settings: Record<string, unknown>
}) {
  const previewSettings = settings
  switch (pageKey) {
    case 'dashboard':
      return (
        <Dashboard
          alerts={PREVIEW_MOCK.dashboard.alerts as []}
          chartData={PREVIEW_MOCK.dashboard.chartData}
          previewSettings={previewSettings}
          statsCards={PREVIEW_MOCK.dashboard.statsCards}
          topItems={PREVIEW_MOCK.dashboard.topItems}
          hideHeader
        />
      )
    case 'home':
      return <Home previewSettings={previewSettings} />
    case 'login':
      return (
        <Login
          canResetPassword={false}
          previewSettings={previewSettings}
          status=""
        />
      )
    case 'familia':
      return <FamilyPreview previewSettings={previewSettings} />
    case 'beneficios':
      return <BeneficiosPreview previewSettings={previewSettings} />
    default:
      return (
        <p className="text-muted-foreground text-sm">Preview não disponível</p>
      )
  }
}
function FamilyPreview({
  previewSettings,
}: {
  previewSettings: Record<string, unknown>
}) {
  const texts = (previewSettings?.texts as Record<string, string>) ?? {}
  const t = (key: string, fallback: string) => texts[key] ?? fallback
  const mockFamilies = [
    'Silva',
    'Oliveira',
    'Santos',
    'Ferreira',
    'Pereira',
    'Costa',
  ]
  return (
    <div className="space-y-4 p-2">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-heading text-xl font-bold">
            {t('page_title', 'Gestão de Famílias')}
          </h1>
          <p className="text-muted-foreground text-sm">
            {t(
              'page_description',
              'Gerencie e acompanhe o cadastro das famílias atendidas',
            )}
          </p>
        </div>
        <span className="bg-primary shrink-0 rounded px-3 py-1.5 text-xs font-medium text-white">
          {t('new_button', 'Nova Família +')}
        </span>
      </div>

      <div className="border-input flex items-center gap-2 rounded-lg border px-3 py-2 text-sm text-gray-400">
        🔍 {t('search_placeholder', 'Buscar família...')}
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {mockFamilies.map((name) => (
          <div key={name} className="rounded-lg border p-3">
            <p className="text-sm font-medium">Família {name}</p>
            <p className="text-muted-foreground text-xs">3 membros • Ativo</p>
          </div>
        ))}
      </div>

      <div className="border-muted rounded border border-dashed p-3 text-center text-xs text-gray-400">
        Estado vazio: “{t('empty_state', 'Nenhuma família encontrada.')}”
      </div>

      <div className="text-muted-foreground flex gap-4 text-xs">
        <span>Cadastro: “{t('register_title', 'Cadastro de Família')}”</span>
        <span>Edição: “{t('edit_title', 'Editar Família')}”</span>
      </div>
    </div>
  )
}
function BeneficiosPreview({
  previewSettings,
}: {
  previewSettings: Record<string, unknown>
}) {
  const texts = (previewSettings?.texts as Record<string, string>) ?? {}
  const t = (key: string, fallback: string) => texts[key] ?? fallback
  const mockItems = [
    { name: 'Cesta básica', qty: 270, status: 'Normal' },
    { name: 'Gás', qty: 8, status: 'Crítico' },
    { name: 'Kit Higiene', qty: 45, status: 'Alerta' },
  ]
  return (
    <div className="space-y-4 p-2">
      <h1 className="text-heading text-xl font-bold">
        {t('page_title', 'Benefícios')}
      </h1>

      <div>
        <h2 className="text-heading text-base font-semibold">
          {t('section_title', 'Controle de Estoque')}
        </h2>
        <p className="text-muted-foreground text-sm">
          {t(
            'section_subtitle',
            'Gerencie, edite e acompanhe a disponibilidade dos benefícios',
          )}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <div className="border-input flex flex-1 items-center gap-2 rounded-lg border px-3 py-2 text-sm text-gray-400">
          🔍 {t('search_placeholder', 'Buscar por benefícios...')}
        </div>
        <span className="bg-primary shrink-0 rounded px-3 py-1.5 text-xs font-medium text-white">
          {t('add_button', 'Adicionar novo benefício')}
        </span>
      </div>

      <div className="rounded-lg border">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b">
              <th className="text-muted-foreground px-4 py-2 text-left font-medium">
                Item
              </th>
              <th className="text-muted-foreground px-4 py-2 text-left font-medium">
                Qtd.
              </th>
              <th className="text-muted-foreground px-4 py-2 text-left font-medium">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {mockItems.map((item) => (
              <tr key={item.name} className="last:border-0 border-b">
                <td className="px-4 py-2 font-medium">{item.name}</td>
                <td className="text-muted-foreground px-4 py-2">{item.qty}</td>
                <td className="px-4 py-2">
                  <span
                    className={[
                      'rounded-full px-2 py-0.5 text-xs font-medium',
                      item.status === 'Crítico'
                        ? 'bg-red-100 text-red-700'
                        : item.status === 'Alerta'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700',
                    ].join(' ')}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
