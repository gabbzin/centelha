import Heading from '@/components/layout/heading';
import { Main } from '@/components/layout/main';
import { Button } from '@/components/ui/button';
import { Head } from '@inertiajs/react';

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
      </Main>
    </>
  );
}
