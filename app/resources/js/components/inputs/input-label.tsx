import { InputHTMLAttributes } from 'react';
import InputError from '../laravel/input-error';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface InputLabelProps {
  id?: string;
  type?: InputHTMLAttributes<HTMLInputElement>['type'];
  label: string;
  maxLength?: number;
  placeholder?: string;
  required?: boolean;
  autoFocus?: boolean;
  error?: string;
}

export function InputLabel({
  id,
  type = 'text',
  label,
  maxLength,
  placeholder,
  required = false,
  autoFocus = false,
  error,
}: InputLabelProps) {
  return (
    <div className="grid gap-1">
      <Label htmlFor={id} className="text-heading text-xs font-semibold">
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <div className="relative">
        <Input
          type={type}
          required={required}
          autoFocus={autoFocus}
          placeholder={placeholder}
          maxLength={maxLength}
          className="border-border rounded-md border p-2 placeholder:text-[#737781]"
        />
      </div>
      <InputError message={error} />
    </div>
  );
}
