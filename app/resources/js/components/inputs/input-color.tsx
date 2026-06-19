import { PenIcon } from 'lucide-react'
import { HexColorPicker } from 'react-colorful'
import { Label } from '../ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

interface InputColorProps {
  label?: string
  color?: string
  setColor?: (color: string) => void
}
export function InputColor({ label, color, setColor }: InputColorProps) {
  return (
    <div className="w-full space-y-2">
      <Label className="capitalize">{label}</Label>
      <Popover>
        <PopoverTrigger
          render={
            <button className="flex items-center justify-between cursor-pointer border border-border rounded-lg p-2 gap-2 w-full bg-muted">
              <div className="flex items-end gap-4">
                <div
                  className="size-8 rounded-lg border"
                  style={{
                    backgroundColor: color,
                  }}
                />
                <p className="text-heading text-base font-normal uppercase">
                  {color}
                </p>
              </div>
              <PenIcon className="size-4 opacity-50" />
            </button>
          }
        />
        <PopoverContent>
          <HexColorPicker color={color} onChange={setColor} />
        </PopoverContent>
      </Popover>
    </div>
  )
}
