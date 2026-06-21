import { Head } from '@inertiajs/react'
import { DeliveryHistorySection } from '@/components/entregas/delivery-history-section'
import type { BenefitOption, Delivery } from '@/components/entregas/types'
import { Header } from '@/components/layout/header'

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
}

export default function Entregas({
  deliveries,
  filters,
  benefits,
}: EntregasPageProps) {
  return (
    <>
      <Head title="Entregas" />
      <div className="bg-surface min-h-screen">
        <Header />
        <main className="max-w-lm mx-auto w-full px-8 pt-8 pb-12">
          <DeliveryHistorySection
            benefits={benefits}
            deliveries={deliveries}
            filters={filters}
          />
        </main>
      </div>
    </>
  )
}
