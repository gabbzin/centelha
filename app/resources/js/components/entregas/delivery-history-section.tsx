import { ChevronDown, FileText, Plus } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CreateDeliveryModal } from './create-delivery-modal'
import { DELIVERIES, filterDeliveries, formatInputDate, paginate } from './data'
import { DeliveryFilterBar } from './delivery-filter-bar'
import { DeliveryTable } from './delivery-table'

const PAGE_SIZE = 7

export function DeliveryHistorySection() {
  const [startDate, setStartDate] = useState(() => {
    const now = new Date()
    return formatInputDate(new Date(now.getFullYear(), now.getMonth(), 1))
  })
  const [endDate, setEndDate] = useState(() => {
    const now = new Date()
    return formatInputDate(new Date(now.getFullYear(), now.getMonth() + 1, 0))
  })
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const filtered = useMemo(
    () =>
      filterDeliveries(DELIVERIES, {
        search,
        startDate,
        endDate,
      }),
    [search, startDate, endDate],
  )

  const pagination = useMemo(
    () => paginate(filtered, currentPage, PAGE_SIZE),
    [filtered, currentPage],
  )

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value)
    setCurrentPage(1)
  }, [])

  const handleStartDateChange = useCallback((value: string) => {
    setStartDate(value)
    setCurrentPage(1)
  }, [])

  const handleEndDateChange = useCallback((value: string) => {
    setEndDate(value)
    setCurrentPage(1)
  }, [])

  const handleRegister = useCallback(() => {
    setIsCreateOpen(true)
  }, [])

  const handleExportCurrentMonth = useCallback(() => {
    console.log('Exportar PDF do mês atual')
  }, [])

  const handleExportSelectedPeriod = useCallback(() => {
    console.log('Exportar PDF do período selecionado')
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
            variant="default"
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
            currentPage={currentPage}
            deliveries={pagination.items}
            endIndex={pagination.endIndex}
            onPageChange={setCurrentPage}
            startIndex={pagination.startIndex}
            total={pagination.total}
            totalPages={pagination.totalPages}
          />
        </CardContent>
      </Card>

      <CreateDeliveryModal onOpenChange={setIsCreateOpen} open={isCreateOpen} />
    </section>
  )
}
