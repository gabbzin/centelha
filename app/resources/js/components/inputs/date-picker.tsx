import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Label } from '../ui/label';
export function DatePicker({ label }: { label?: string }) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  return (
    <div className="mx-auto w-full space-y-1">
      <Label className="text-heading text-xs font-semibold" htmlFor={'date'}>
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
              {date ? date.toLocaleDateString() : 'Selecione a data'}
            </Button>
          )}
        />
        <PopoverContent align="start" className="w-auto overflow-hidden p-0">
          <Calendar
            captionLayout="dropdown"
            defaultMonth={date}
            mode="single"
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
            selected={date}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
