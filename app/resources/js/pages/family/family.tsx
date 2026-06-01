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
import { Head, usePage } from '@inertiajs/react';
import { ListFilterIcon, SearchIcon } from 'lucide-react';
import { FamilyCard } from './components/family-card';
interface FamilyProps {
  families: PaginatedData<Family>;
}
export default function Family({ families }: FamilyProps) {
  const { communityCenter } = usePage<SharedData>().props;
  return (
    <>
      <Head title="Módulo Familia" />

      <Main>
        <div className="flex items-center justify-between gap-4">
          <Heading
            description={`Gerencie e acompanhe o cadastro das famílias atendidas pela rede ${communityCenter?.name ?? 'Centelha'}`}
            title="Gestão de Familias"
          />

          <Button variant={'default'}>Nova Família +</Button>
        </div>

        <Card variant={'basic'}>
          <CardContent className="flex items-center gap-4">
            <InputGroup className="bg-muted">
              <InputGroupInput className="" placeholder="Buscar família..." />
              <InputGroupAddon>
                <SearchIcon></SearchIcon>
              </InputGroupAddon>
            </InputGroup>

            <Button size={'icon'} variant={'outline'}>
              <ListFilterIcon />
            </Button>
          </CardContent>
        </Card>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {families.data.map((family) => (
            <FamilyCard
              key={family.id}
              cpf={family.responsible_cpf}
              familyName={family.responsible_name}
              id={family.id.toString()}
              location={family.address?.neighborhood}
              membersCount={family.total_members_count || 0}
              status={family.is_active ? 'ativo' : 'inativo'}
            />
          ))}
        </div>
      </Main>
    </>
  );
}
