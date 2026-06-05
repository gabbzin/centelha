import Heading from '@/components/layout/heading';
import { Main } from '@/components/layout/main';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { type Family, type PaginatedData, type SharedData } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import {
  CheckCircleIcon,
  ListFilterIcon,
  SearchIcon,
  XCircleIcon,
} from 'lucide-react';
import { FamilyCard } from './components/family-card';
import { PaginationConsul } from '@/components/layout/pagination';
import { useState } from 'react';
interface FamilyProps {
  families: PaginatedData<Family>;
}
export default function Family({ families }: FamilyProps) {
  const { communityCenter } = usePage<SharedData>().props;
  const [onlyLastName, setOnlyLastName] = useState(false);
  return (
    <>
      <Head title="Módulo Familia" />

      <Main>
        <div className="flex items-center justify-between gap-4">
          <Heading
            description={`Gerencie e acompanhe o cadastro das famílias atendidas pela rede ${communityCenter?.name}`}
            title="Gestão de Familias"
          />
          <Button
            className={'uppercase'}
            onClick={() => router.visit('/family/register')}
            variant={'primary'}
          >
            Nova Família +
          </Button>
        </div>

        <Card variant={'basic'}>
          <CardContent className="flex items-center gap-3">
            <InputGroup className="bg-muted">
              <InputGroupInput className="" placeholder="Buscar família..." />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>

            <div className="flex items-center gap-2">
              <Button size={'icon'} variant={'outline'}>
                <ListFilterIcon />
              </Button>
              <Button
                onClick={() => setOnlyLastName(!onlyLastName)}
                size={'icon'}
                variant={'secondary'}
              >
                {onlyLastName ? <CheckCircleIcon /> : <XCircleIcon />}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {families.data.map((family) => {
            const getSobrenome = (name: string) => {
              const parts = name.trim().split(' ');
              return parts.length > 1
                ? parts[parts.length - 2] + ' ' + parts[parts.length - 1]
                : name;
            };
            // Se withoutSobrenome for true, pega o sobrenome, caso contrário, pega o nome completo
            const sobrenome = onlyLastName
              ? getSobrenome(family.responsible_name)
              : family.responsible_name;
            return (
              <FamilyCard
                key={family.id}
                cpf={family.responsible_cpf}
                familyName={sobrenome}
                id={family.id.toString()}
                location={family.address?.neighborhood}
                membersCount={family.total_members_count || 0}
                status={family.is_active}
              />
            );
          })}
        </div>
        <PaginationConsul
          links={families.links}
          next_page_url={families.next_page_url}
          prev_page_url={families.prev_page_url}
        />
      </Main>
    </>
  );
}
