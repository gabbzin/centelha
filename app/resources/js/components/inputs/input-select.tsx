import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function InputSelect({ options }: { options: { value: string; label: string }[] }) {
  return (
    <Select defaultValue={options[0].value}>
      <SelectTrigger className={'border-border w-full border'}>
        <SelectValue className={'capitalize'} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value} className={'capitalize'}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
