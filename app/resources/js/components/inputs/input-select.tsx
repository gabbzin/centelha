import { type Control, Controller } from 'react-hook-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface InputSelectProps {
  options: {
    value: string
    label: string
  }[]
  name: string
  // biome-ignore lint/suspicious/noExplicitAny: control vinculado a campos de formulário dinâmicos
  control: Control<any>
  placeholder?: string
  required?: boolean
}
export function InputSelect({
  options,
  control,
  name,
  placeholder,
  required,
}: InputSelectProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Select
          defaultValue={options[0].value}
          onValueChange={field.onChange}
          required={required}
          value={field.value}
        >
          <SelectTrigger className={'border-border w-full border'}>
            <SelectValue className={'capitalize'} placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                className={'capitalize'}
                value={option.value}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  )
}
