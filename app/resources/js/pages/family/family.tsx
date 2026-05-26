import Heading from '@/components/layout/heading';
import { Main } from '@/components/layout/main';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Head } from '@inertiajs/react';
import { ListFilterIcon, SearchIcon } from 'lucide-react';
import { FamilyCard } from './components/family-card';

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
            id="20248842"
            cpf="12345678900"
            status="ativo"
            familyName="Silva Santos"
            membersCount={6}
            location="Jardim Industrial"
          />
          <FamilyCard
            id="20248842"
            cpf="12345678900"
            status="ativo"
            familyName="Silva Santos"
            membersCount={6}
            location="Jardim Industrial"
          />
          <FamilyCard
            id="20248842"
            cpf="12345678900"
            status="ativo"
            familyName="Silva Santos"
            membersCount={6}
            location="Jardim Industrial"
          />
          <FamilyCard
            id="20248842"
            cpf="12345678900"
            status="ativo"
            familyName="Silva Santos"
            membersCount={6}
            location="Jardim Industrial"
          />
          <FamilyCard
            id="20248842"
            cpf="12345678900"
            status="ativo"
            familyName="Silva Santos"
            membersCount={6}
            location="Jardim Industrial"
          />
          <FamilyCard
            id="20248842"
            cpf="12345678900"
            status="ativo"
            familyName="Silva Santos"
            membersCount={6}
            location="Jardim Industrial"
          />
          <FamilyCard
            id="20248842"
            cpf="12345678900"
            status="ativo"
            familyName="Silva Santos"
            membersCount={6}
            location="Jardim Industrial"
          />
          <FamilyCard
            id="20248842"
            cpf="12345678900"
            status="ativo"
            familyName="Silva Santos"
            membersCount={6}
            location="Jardim Industrial"
          />
          <FamilyCard
            id="20248842"
            cpf="12345678900"
            status="ativo"
            familyName="Silva Santos"
            membersCount={6}
            location="Jardim Industrial"
          />
        </div>
      </Main>
    </>
  );
}
