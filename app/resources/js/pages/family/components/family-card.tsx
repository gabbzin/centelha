import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { formatCPF, formatProtocol } from '@/utils/formatters';
import { Link } from '@inertiajs/react';
import { IdCardIcon, MapPinIcon, Trash2Icon, UsersIcon } from 'lucide-react';
interface FamilyCardProps {
  id: string;
  cpf: string;
  status: 'ativo' | 'inativo' | 'aguardando';
  familyName: string;
  membersCount: number;
  location: string | undefined;
}
export function FamilyCard({
  id,
  cpf,
  status,
  familyName,
  membersCount,
  location,
}: FamilyCardProps) {
  const sizeIcons = 'size-4';
  return (
    <Card className="space-y-3" variant={'basic'}>
      <CardHeader className="flex items-center justify-between">
        <p className="text-muted-foreground text-xs uppercase">
          Protocolo #{formatProtocol(id)}
        </p>
        <Badge className="rounded-2xl bg-[#83FC8E] text-[10px] text-green-900 uppercase">
          {status}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-1">
        <h3 className="text-heading font-semibold">Família {familyName}</h3>

        <ul className="space-y-2">
          <InfoCardItem
            icon={<IdCardIcon className={sizeIcons} />}
            text={formatCPF(cpf)}
          />
          <InfoCardItem
            icon={<UsersIcon className={sizeIcons} />}
            text={`${membersCount} membros`}
          />
          <InfoCardItem
            icon={<MapPinIcon className={sizeIcons} />}
            text={location || 'Endereço não informado'}
          />
        </ul>
      </CardContent>
      <CardFooter className="mt-2 flex items-center gap-4 *:rounded-md">
        <Link
          className={
            'border text-center border-info text-button bg-transparent hover:bg-info p-3 flex-1 text-xs uppercase hover:text-white'
          }
          href={`/family/details/${id}`}
        >
          Ver Informações
        </Link>
        <Button
          className={
            'border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground px-3 py-5'
          }
          variant={'outline'}
        >
          <Trash2Icon />
        </Button>
      </CardFooter>
    </Card>
  );
}
function InfoCardItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="mt-2 flex items-center gap-2 text-sm">
      {icon}
      <p>{text}</p>
    </div>
  );
}
