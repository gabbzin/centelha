import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import InputError from '../laravel/input-error'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

interface InputLabelProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}
export const InputLabel = forwardRef<HTMLInputElement, InputLabelProps>(
  (
    {
      id,
      type = 'text',
      label,
      required = false,
      autoFocus = false,
      error,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="grid gap-1">
        <Label className="text-heading text-xs font-semibold" htmlFor={id}>
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
        <div className="relative">
          <Input
            ref={ref}
            autoFocus={autoFocus}
            className={cn(
              'border-border rounded-md border p-2 placeholder:text-[#737781] text-start',
              className,
            )}
            id={id}
            required={required}
            type={type}
            {...props}
          />
        </div>
        <InputError message={error} />
      </div>
    )
  },
)
InputLabel.displayName = 'InputLabel'
