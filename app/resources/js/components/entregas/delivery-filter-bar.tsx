import { CalendarDays, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { applyDateMask } from './data'

interface DeliveryFilterBarProps {
  search: string
  onSearchChange: (value: string) => void
  startDate: string
  onStartDateChange: (value: string) => void
  endDate: string
  onEndDateChange: (value: string) => void
}

export function DeliveryFilterBar({
  search,
  onSearchChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
}: DeliveryFilterBarProps) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div className="relative w-full max-w-sm">
        <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
        <Input
          className="pl-9"
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar por benefício, data, local..."
          value={search}
        />
      </div>

      <div className="flex w-full flex-col items-start gap-2 sm:w-auto sm:flex-row sm:items-center">
        <span className="text-foreground/70 text-sm whitespace-nowrap">
          Período De:
        </span>
        <div className="relative">
          <Input
            className="w-36 pl-9"
            onChange={(e) => onStartDateChange(applyDateMask(e.target.value))}
            placeholder="dd/mm/aaaa"
            value={startDate}
          />
          <CalendarDays className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
        </div>
        <span className="text-foreground/70 text-sm whitespace-nowrap">
          Até:
        </span>
        <div className="relative">
          <Input
            className="w-36 pl-9"
            onChange={(e) => onEndDateChange(applyDateMask(e.target.value))}
            placeholder="dd/mm/aaaa"
            value={endDate}
          />
          <CalendarDays className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
        </div>
      </div>
    </div>
  )
}
