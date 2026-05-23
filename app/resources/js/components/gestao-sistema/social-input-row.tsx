import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2Icon } from 'lucide-react';
import { SocialIcon } from 'react-social-icons';

interface SocialInputRowProps {
  value?: string;
  placeholder?: string;
  network: string;
  onChange?: (v: string) => void;
  onDelete?: () => void;
}

export function SocialInputRow({
  network = 'instagram',
  value = '',
  placeholder,
  onChange,
  onDelete,
}: SocialInputRowProps) {
  return (
    <div className="flex items-center gap-3">
      <SocialIcon
        network={network}
        url={`http://${network}.com`}
        borderRadius={'8px'}
        bgColor="#E8E9EA"
        fgColor="#000000"
        style={{
          fontWeight: 'bolder',
        }}
      />
      <Input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="border-border border"
      />
      <Button variant="ghost" onClick={onDelete} size={'icon-lg'} className="p-2">
        <Trash2Icon className="size-4" />
      </Button>
    </div>
  );
}
