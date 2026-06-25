import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ROLE_OPTIONS } from './types'

interface UsersFilterBarProps {
  search: string
  role: string
  onSearchChange: (value: string) => void
  onRoleChange: (value: string) => void
  searchPlaceholder?: string
}

export function UsersFilterBar({
  search,
  role,
  onSearchChange,
  onRoleChange,
  searchPlaceholder,
}: UsersFilterBarProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-end">
      <div className="relative w-full md:w-80">
        <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
        <Input
          className="pl-9"
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder ?? 'Buscar por nomes ou e-mail...'}
          value={search}
        />
      </div>

      <div className="w-full md:w-56">
        <Select onValueChange={onRoleChange} value={role}>
          <SelectTrigger className="border-border w-full border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ROLE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
