import { Header } from '@/components/layout/header';
import { SystemManagementCard } from '@/components/system-management-card';
import { Head } from '@inertiajs/react';
import { Command, Settings, Users } from 'lucide-react';

const systemCards = [
  {
    title: 'Configurações Gerais',
    description: 'Gestão de voluntários/agentes e vinculação de famílias para atendimento focado.',
    actionLabel: 'Configurar',
    href: '#',
    icon: Settings,
  },
  {
    title: 'Aparência',
    description: 'Personalize as cores utilizadas na interface da plataforma Centelha',
    actionLabel: 'Configurar',
    href: '#',
    icon: Command,
  },
  {
    title: 'Usuários e Permissões',
    description: 'Gerencie usuários, perfis de acesso e permissões da plataforma Centelha',
    actionLabel: 'Configurar',
    href: '#',
    icon: Users,
  },
  {
    title: 'Painel de Customização por tela',
    description: 'Painel de Customização da tela, onde pode ser alterado textos e informações de uma tela específica.',
    actionLabel: 'Selecionar tela',
    href: '#',
    icon: Settings,
  },
] as const;

export default function GestaoSistema() {
  return (
    <>
      <Head title="Gestão Global do Sistema" />

      <div className="bg-surface min-h-screen">
        <Header />

        <main className="max-w-lm mx-auto px-8 pt-8 pb-10">
          <section className="pb-6">
            <h1 className="text-heading text-2xl/8 font-bold tracking-[-0.02em] uppercase">GESTÃO GLOBAL DO SISTEMA</h1>
            <p className="text-foreground/75 mt-2 text-sm/5">
              Gerencie acessos, módulos e configurações fundamentais da plataforma Centelha.
            </p>
          </section>

          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {systemCards.map((card) => (
              <SystemManagementCard
                key={card.title}
                title={card.title}
                description={card.description}
                actionLabel={card.actionLabel}
                href={card.href}
                Icon={card.icon}
              />
            ))}
          </section>
        </main>
      </div>
    </>
  );
}
