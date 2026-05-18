import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash } from 'lucide-react';

interface SocialInputRowProps {
  value?: string;
  placeholder?: string;
  onChange?: (v: string) => void;
  onDelete?: () => void;
}

export function SocialInputRow({ value = '', placeholder, onChange, onDelete }: SocialInputRowProps) {
  return (
    <div className="flex items-center gap-3">
      <Input value={value} onChange={(e) => onChange?.(e.target.value)} placeholder={placeholder} />
      <Button variant="ghost" onClick={onDelete} className="h-10 w-10 p-2">
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default SocialInputRow;
