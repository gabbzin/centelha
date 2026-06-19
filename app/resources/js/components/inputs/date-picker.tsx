import { format } from 'date-fns'
import * as React from 'react'
import type { Matcher } from 'react-day-picker'
import { type Control, Controller } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '../ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

interface DatePickerProps {
  label?: string
  name: string
  disabled?: Matcher | Matcher[] | undefined
  today?: Date
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  required?: boolean
}
export function DatePicker({
  label,
  disabled,
  today = new Date(),
  control,
  name,
  required,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="mx-auto w-full space-y-1">
          <Label
            className="text-heading text-xs font-semibold"
            htmlFor={'date'}
          >
            {label} {<span className="text-destructive">*</span>}
          </Label>
          <Popover onOpenChange={setOpen} open={open}>
            <PopoverTrigger
              render={(props) => (
                <Button
                  {...props}
                  className="justify-start font-normal hover:scale-100 py-2 w-full"
                  id="date"
                  variant="outline"
                >
                  {field.value
                    ? format(field.value, 'dd/MM/yyyy')
                    : 'Selecione a data'}
                </Button>
              )}
            />
            <PopoverContent
              align="start"
              className="w-auto overflow-hidden p-0"
            >
              <Calendar
                {...field}
                captionLayout="dropdown"
                defaultMonth={field.value}
                disabled={disabled}
                mode="single"
                onSelect={(date: Date | undefined) => {
                  if (date) {
                    field.onChange(date)
                    setOpen(false)
                  }
                }}
                required={required}
                selected={field.value}
                today={today}
              />
            </PopoverContent>
          </Popover>
        </div>
      )}
    />
  )
}
