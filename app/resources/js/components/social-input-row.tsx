import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash } from 'lucide-react';
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
        borderRadius={"8px"}
        bgColor="#E8E9EA"
        fgColor="#000000"
        style={{
          fontWeight: 'bolder',
        }}
      />
      <Input value={value} onChange={(e) => onChange?.(e.target.value)} placeholder={placeholder} />
      <Button variant="ghost" onClick={onDelete} className="h-10 w-10 p-2">
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default SocialInputRow;
