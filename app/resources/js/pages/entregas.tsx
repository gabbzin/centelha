import { Head } from '@inertiajs/react'
import { DeliveryHistorySection } from '@/components/entregas/delivery-history-section'
import { Header } from '@/components/layout/header'
export default function Entregas() {
  return (
    <>
      <Head title="Entregas" />
      <div className="bg-surface min-h-screen">
        <Header />
        <main className="max-w-lm mx-auto w-full px-8 pt-8 pb-12">
          <DeliveryHistorySection />
        </main>
      </div>
    </>
  )
}
