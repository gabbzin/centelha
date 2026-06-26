import { usePage } from '@inertiajs/react'
import { AlertCard } from '@/components/dashboard/cards/alert-card'
import { TopItensCard } from '@/components/dashboard/cards/top-itens-card'
import { FamilyIcon } from '@/components/dashboard/icons/family-icon'
import { HandWithHeartIcon } from '@/components/dashboard/icons/hand-with-heart-icon'
import { UserAddIcon } from '@/components/dashboard/icons/user-add-icon'
import { DashboardMap as Map } from '@/components/dashboard/map'
import SimpleBarChart from '@/components/dashboard/simple-bar-chart'
import { StatsCard } from '@/components/dashboard/stats-card'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { LayoutBase } from '@/layouts/layout'
import type { SharedData } from '@/types'

interface StatsCardData {
  value: number
  percentageChange: number
}
interface AlertInfo {
  label: string
  rest: number
  alertLevel: 'warning' | 'critical'
}
interface TopItem {
  name: string
  quantity: number
  percentage: number
}
interface ChartDataItem {
  name: string
  anterior: number
  atual: number
}
interface DashboardProps {
  statsCards: {
    benefitsDelivered: StatsCardData
    familiesServed: StatsCardData
    newRegistrations: StatsCardData
  }
  alerts: AlertInfo[]
  topItems: TopItem[]
  chartData: ChartDataItem[]
  previewSettings?: Record<string, unknown>
  hideHeader?: boolean
}
export default function Dashboard({
  statsCards,
  alerts,
  topItems,
  chartData,
  previewSettings,
  hideHeader,
}: DashboardProps) {
  const { pageSettings: sharedSettings } = usePage<SharedData>().props
  const pageSettings = previewSettings ?? sharedSettings
  const { widgets, texts, rules } =
    (pageSettings as unknown as typeof defaultConfigs) ?? defaultConfigs

  // Verificamos se há algo para exibir na coluna da direita
  const hasSidebar = widgets.stock_alerts || topItems.length > 0
  return (
    <LayoutBase
      descriptionPage={texts.subtitle}
      hideHeader={hideHeader}
      rightComponent={
        widgets.period_selector && (
          <Select defaultValue="junho_2026">
            <SelectTrigger className="border-border border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="maio_2026">Maio 2026</SelectItem>
              <SelectItem value="junho_2026">Junho 2026</SelectItem>
            </SelectContent>
          </Select>
        )
      }
      tagTitle="Dashboard"
      titlePage={texts.main_title}
    >
      <main className="flex flex-col gap-8">
        {/* 1. LINHA DE MÉTRICAS (Empilha em telas pequenas, 3 colunas no desktop) */}
        {widgets.metrics_cards && (
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatsCard
              icon={<HandWithHeartIcon />}
              percentageChange={statsCards.benefitsDelivered.percentageChange}
              title={texts.label_card_1}
              value={statsCards.benefitsDelivered.value}
            />
            <StatsCard
              icon={<FamilyIcon />}
              percentageChange={statsCards.familiesServed.percentageChange}
              title={texts.label_card_2}
              value={statsCards.familiesServed.value}
            />
            <StatsCard
              icon={<UserAddIcon />}
              percentageChange={statsCards.newRegistrations.percentageChange}
              title={texts.label_card_3}
              value={statsCards.newRegistrations.value}
            />
          </section>
        )}

        {/* 2. ÁREA DE CONTEÚDO PRINCIPAL E SIDEBAR */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Lado Esquerdo: Mapa e/ou Gráfico (Ocupa 8 colunas se a sidebar existir, ou 12 se não existir) */}
          <div
            className={`flex flex-col gap-6 ${hasSidebar ? 'lg:col-span-8' : 'lg:col-span-12'}`}
          >
            {widgets.heat_map && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-bold text-lg uppercase font-heading">
                    {texts.map_title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Map />
                </CardContent>
              </Card>
            )}

            {widgets.comparison_chart && (
              <Card>
                <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between border-b gap-4">
                  <CardTitle className="font-bold text-lg uppercase font-heading">
                    {texts.chart_title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="size-2 bg-chart-5 rounded-full" />
                      {texts.chart_label_previous}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="size-2 bg-chart-3 rounded-full" />
                      {texts.chart_label_current}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center p-4">
                  <SimpleBarChart data={chartData} />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Lado Direito: Alertas e Top Itens (Ocupa 4 colunas) */}
          {hasSidebar && (
            <div className="flex flex-col gap-6 lg:col-span-4">
              {widgets.stock_alerts && <AlertCard infos={alerts} />}

              {/* Presumo que você queira exibir isso caso tenha itens, você pode adicionar uma flag no 'widgets' para ele também se quiser */}
              {topItems.length > 0 && <TopItensCard itens={topItems} />}
            </div>
          )}
        </section>
      </main>
    </LayoutBase>
  )
}
const defaultConfigs = {
  widgets: {
    metrics_cards: true,
    heat_map: true,
    stock_alerts: true,
    comparison_chart: true,
    period_selector: true,
  },
  texts: {
    main_title: 'Visão Geral do Dashboard',
    subtitle: 'Acompanhamento estratégico das operações da Centelha',
    label_card_1: 'Benefícios Entregues',
    label_card_2: 'Famílias Atendidas',
    label_card_3: 'Novos Cadastros',
    map_title: 'Mapa de Distribuição',
    alert_card_title: 'Alertas de baixo estoque',
    top_items_title: 'Top itens em estoque',
    chart_title: 'Comparativo de Entregas por Categoria (Mês Atual x Anterior)',
    chart_label_previous: 'Mês anterior',
    chart_label_current: 'Mês atual',
  },
  rules: {
    low_stock_limit: 50,
  },
}
