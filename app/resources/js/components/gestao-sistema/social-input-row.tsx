import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2Icon } from 'lucide-react';
import { SocialIcon } from 'react-social-icons';
interface SocialInputRowProps {
  value?: string;
  placeholder?: string;
  onDelete?: () => void;
}
export function SocialInputRow({
  value = '',
  placeholder,
  onDelete,
  ...props
}: SocialInputRowProps) {
  return (
    <div className="flex items-center gap-3">
      <SocialIcon
        bgColor="#E8E9EA"
        borderRadius={'8px'}
        fgColor="#000000"
        style={{
          fontWeight: 'bolder',
        }}
        url={value ?? 'https://share.com'}
      />
      <Input
        className="border-border border"
        placeholder={placeholder}
        value={value}
        {...props}
      />
      <Button
        className="p-2"
        onClick={onDelete}
        size={'icon-lg'}
        type="button"
        variant="ghost"
      >
        <Trash2Icon className="size-4" />
      </Button>
    </div>
  );
}
