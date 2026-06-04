import { InputHTMLAttributes } from 'react';
import InputError from '../laravel/input-error';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { type Mask, withMask } from 'use-mask-input';
interface InputLabelProps {
  id?: string;
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
  label: string;
  maxLength?: number;
  placeholder?: string;
  required?: boolean;
  autoFocus?: boolean;
  error?: string;
  mask?: Mask;
  maskOptions?: Parameters<typeof withMask>[1];
}
export function InputLabel({
  id,
  type = 'text',
  label,
  maxLength,
  placeholder,
  required = false,
  autoFocus = false,
  mask,
  maskOptions,
  error,
}: InputLabelProps) {
  return (
    <div className="grid gap-1">
      <Label className="text-heading text-xs font-semibold" htmlFor={id}>
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <div className="relative">
        <Input
          ref={mask !== undefined ? withMask(mask, maskOptions) : undefined}
          autoFocus={autoFocus}
          className="border-border rounded-md border p-2 placeholder:text-[#737781] text-start"
          maxLength={maxLength}
          placeholder={placeholder}
          required={required}
          type={type}
        />
      </div>
      <InputError message={error} />
    </div>
  );
}
