import { ChevronDown, FileText, Plus } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { router, usePage } from '@inertiajs/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CreateDeliveryModal } from './create-delivery-modal'
import { DeliveryDetailsModal } from './delivery-details-modal'
import { formatInputDate, normalizeDelivery } from './data'
import { DeliveryFilterBar } from './delivery-filter-bar'
import { DeliveryTable } from './delivery-table'
import type { BenefitOption, Delivery, PaginatedDeliveries } from './types'

interface DeliveryHistorySectionProps {
  deliveries: PaginatedDeliveries
  filters: {
    search: string
    startDate: string
    endDate: string
  }
  benefits: BenefitOption[]
}

const PAGE_SIZE = 8

export function DeliveryHistorySection({
  deliveries,
  filters,
  benefits,
}: DeliveryHistorySectionProps) {
  const { auth } = usePage().props as { auth: { user: { name: string } } }

  const [search, setSearch] = useState(filters.search ?? '')
  const [startDate, setStartDate] = useState(filters.startDate ?? '')
  const [endDate, setEndDate] = useState(filters.endDate ?? '')
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [selectedDeliveryId, setSelectedDeliveryId] = useState<number | null>(
    null,
  )
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const normalizedDeliveries = deliveries.data.map(normalizeDelivery)

  const reload = useCallback(
    (page = deliveries.current_page) => {
      router.get(
        '/entregas',
        {
          search,
          startDate,
          endDate,
          page,
        },
        {
          preserveState: true,
          preserveScroll: true,
          only: ['deliveries', 'filters'],
        },
      )
    },
    [search, startDate, endDate, deliveries.current_page],
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      reload(1)
    }, 400)

    return () => clearTimeout(timer)
  }, [search, startDate, endDate])

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value)
  }, [])

  const handleStartDateChange = useCallback((value: string) => {
    setStartDate(value)
  }, [])

  const handleEndDateChange = useCallback((value: string) => {
    setEndDate(value)
  }, [])

  const handlePageChange = useCallback(
    (page: number) => {
      reload(page)
    },
    [reload],
  )

  const handleRegister = useCallback(() => {
    setIsCreateOpen(true)
  }, [])

  const handleRowClick = useCallback((delivery: Delivery) => {
    setSelectedDeliveryId(delivery.id)
    setIsDetailsOpen(true)
  }, [])

  const handleExportCurrentMonth = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('Exportar PDF do mês atual — implementação futura')
  }, [])

  const handleExportSelectedPeriod = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('Exportar PDF do período selecionado — implementação futura')
  }, [])

  return (
    <section className="space-y-4">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold uppercase tracking-tight">
          Histórico de Entregas
        </h1>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <Button
            className="gap-2 rounded-md px-4"
            onClick={handleRegister}
            variant="primary"
          >
            <Plus className="size-4" />
            Registrar nova entrega
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-2 rounded-md px-4" variant="outline">
                <FileText className="size-4" />
                Exportar PDF (Mês Atual)
                <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleExportCurrentMonth}>
                <span className="flex items-center gap-2">
                  <FileText className="size-4" />
                  Exportar PDF (Mês Atual)
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportSelectedPeriod}>
                <span className="flex items-center gap-2">
                  <FileText className="size-4" />
                  Exportar PDF (Período Selecionado)
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Card className="rounded-xl border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-bold uppercase tracking-wide">
            Entregas Realizadas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <DeliveryFilterBar
            endDate={endDate}
            onEndDateChange={handleEndDateChange}
            onSearchChange={handleSearchChange}
            onStartDateChange={handleStartDateChange}
            search={search}
            startDate={startDate}
          />

          <DeliveryTable
            currentPage={deliveries.current_page}
            deliveries={normalizedDeliveries}
            endIndex={deliveries.to ?? 0}
            onPageChange={handlePageChange}
            onRowClick={handleRowClick}
            startIndex={deliveries.from ?? 0}
            total={deliveries.total}
            totalPages={deliveries.last_page}
          />
        </CardContent>
      </Card>

      <CreateDeliveryModal
        benefits={benefits}
        deliveredBy={auth.user.name}
        onOpenChange={setIsCreateOpen}
        open={isCreateOpen}
      />

      <DeliveryDetailsModal
        deliveryId={selectedDeliveryId}
        onOpenChange={setIsDetailsOpen}
        open={isDetailsOpen}
      />
    </section>
  )
}
