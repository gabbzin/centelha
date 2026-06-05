import { Control, Controller } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import React from 'react';
interface RadioGroupProps {
  control: Control;
  name: string;
  options: {
    label: string;
    value: string;
    icon?: React.ReactNode;
  }[];
  sr_only?: boolean;
}
export function RadioInput({
  control,
  name,
  options,
  sr_only = false,
}: RadioGroupProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <RadioGroup
          {...field}
          className={
            'flex border overflow-hidden rounded-lg divide-x divide-border border-border gap-0 bg-surface'
          }
        >
          {options.map((option) => (
            <Label
              key={option.value}
              className={`flex flex-1 cursor-pointer items-center text-center justify-center gap-2 py-3 text-sm transition-colors
            ${field.value === option.value ? 'bg-[#094785] text-white' : 'hover:bg-muted'}`}
            >
              <RadioGroupItem
                className={sr_only ? 'hidden' : 'border-border'}
                value={option.value}
              />
              {option.icon}
              <span>{option.label}</span>
            </Label>
          ))}
        </RadioGroup>
      )}
    />
  );
}
