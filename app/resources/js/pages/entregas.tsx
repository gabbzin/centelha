import { usePage } from '@inertiajs/react'
import { DeliveryHistorySection } from '@/components/entregas/delivery-history-section'
import type { BenefitOption, Delivery } from '@/components/entregas/types'
import { FlashListener } from '@/components/toasters/flash-listener'
import { LayoutBase } from '@/layouts/layout'
import type { SharedData } from '@/types'

export interface PaginatedDeliveries {
  data: Delivery[]
  current_page: number
  last_page: number
  total: number
  from: number
  to: number
  links: Array<{ url: string | null; label: string; active: boolean }>
}

interface EntregasPageProps {
  deliveries: PaginatedDeliveries
  filters: {
    search: string
    startDate: string
    endDate: string
  }
  benefits: BenefitOption[]
  previewSettings?: Record<string, unknown>
}

export default function Entregas({
  deliveries,
  filters,
  benefits,
  previewSettings,
}: EntregasPageProps) {
  const { pageSettings: sharedSettings } = usePage<SharedData>().props
  const pageSettings = previewSettings ?? sharedSettings
  const texts = (pageSettings?.texts as Record<string, string>) ?? {}
  const t = (key: string, fallback: string) => texts[key] ?? fallback

  return (
    <LayoutBase
      descriptionPage={t(
        'page_description',
        'Controle e histórico de entregas de benefícios',
      )}
      tagTitle={t('page_title', 'Entregas')}
      titlePage={t('section_title', 'Histórico de Entregas')}
    >
      <FlashListener />
      <DeliveryHistorySection
        benefits={benefits}
        deliveries={deliveries}
        filters={filters}
        texts={texts}
      />
    </LayoutBase>
  )
}
