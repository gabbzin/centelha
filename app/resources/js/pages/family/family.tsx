import Heading from '@/components/layout/heading';
import { Main } from '@/components/layout/main';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { formatCPF, formatProtocol } from '@/utils/formatters';
import { Head } from '@inertiajs/react';
import { IdCardIcon, ListFilterIcon, MapPinIcon, SearchIcon, Trash2Icon, UsersIcon } from 'lucide-react';

export default function Family() {
  return (
    <>
      <Head title="Módulo Familia" />

      <Main>
        <div className="flex items-center justify-between gap-4">
          <Heading
            title="Gestão de Familias"
            description="Gerencie e acompanhe o cadastro das famílias atendidas pela rede Centelha"
          />

          <Button variant={'default'}>Nova Família +</Button>
        </div>

        <Card variant={'basic'}>
          <CardContent className="flex items-center gap-4">
            <InputGroup className="bg-muted">
              <InputGroupInput placeholder="Buscar família..." className="" />
              <InputGroupAddon>
                <SearchIcon></SearchIcon>
              </InputGroupAddon>
            </InputGroup>

            <Button variant={'outline'} size={'icon'}>
              <ListFilterIcon />
            </Button>
          </CardContent>
        </Card>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <FamilyCard
            protocol="20248842"
            cpf="12345678900"
            status="Ativo"
            familyName="Sailva Santos"
            membersCount={6}
            location="Jardim Industrial"
          />
        </div>
      </Main>
    </>
  );
}

export function InfoCardItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="mt-2 flex items-center gap-2 text-sm">
      {icon}
      <p>{text}</p>
    </div>
  );
}

interface FamilyCardProps {
  protocol: string;
  cpf: string;
  status: 'Ativo' | 'Inativo' | 'Aguardando';
  familyName: string;
  membersCount: number;
  location: string;
}

function FamilyCard({ protocol, cpf, status, familyName, membersCount, location }: FamilyCardProps) {
  const sizeIcons = 'size-4';

  return (
    <Card variant={'basic'} className="space-y-4">
      <CardHeader className="flex items-center justify-between">
        <p className="text-muted-foreground text-xs uppercase">Protocolo #{formatProtocol(protocol)}</p>
        <Badge className="rounded-2xl bg-[#83FC8E] text-[10px] text-green-900 uppercase">{status}</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <h3 className="text-heading font-semibold">Família {familyName}</h3>

        <ul className="space-y-3">
          <InfoCardItem icon={<IdCardIcon className={sizeIcons} />} text={formatCPF(cpf)} />
          <InfoCardItem icon={<UsersIcon className={sizeIcons} />} text={`${membersCount} membros`} />
          <InfoCardItem icon={<MapPinIcon className={sizeIcons} />} text={location} />
        </ul>
      </CardContent>
      <CardFooter className="mt-2 flex items-center gap-4 *:rounded-md">
        <Button
          className={'border-info text-button hover:bg-info flex-1 text-xs uppercase hover:text-white'}
          variant={'outline'}
        >
          Ver Informações
        </Button>
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
