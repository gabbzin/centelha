import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { CATEGORY_OPTIONS } from './data';

interface StockFilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  onAdd: () => void;
  searchPlaceholder?: string;
  addButtonLabel?: string;
}

export function StockFilterBar({ search, onSearchChange, category, onCategoryChange, onAdd, searchPlaceholder, addButtonLabel }: StockFilterBarProps) {
  return (
    <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex w-full items-center gap-3 md:w-2/3">
        <Input placeholder={searchPlaceholder ?? 'Buscar por benefícios...'} value={search} onChange={(e) => onSearchChange(e.target.value)} />
        <div className="w-48">
          <Select value={category} onValueChange={onCategoryChange}>
            <SelectTrigger className="border-border w-full border">
              <SelectValue className="capitalize" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORY_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value} className="capitalize">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="default" className="gap-2 rounded-md px-4" onClick={onAdd}>
          {addButtonLabel ?? 'Adicionar novo benefício'}
          <Plus className="size-4" />
        </Button>
      </div>
    </div>
  );
}
