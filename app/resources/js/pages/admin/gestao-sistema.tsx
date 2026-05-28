import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { SystemManagementCard } from '@/components/laravel/system-management-card';
import { LayoutBase } from '@/layouts/layout';
import { Command, Settings, Users } from 'lucide-react';

export default function GestaoSistema() {
  const { communityCenter } = usePage<SharedData>().props;
  const name = communityCenter?.name ?? 'Centelha';

  const systemCards = [
    {
      title: 'Configurações Gerais',
      description: 'Gestão de voluntários/agentes e vinculação de famílias para atendimento focado.',
      actionLabel: 'Configurar',
      href: '/admin/configuracoes-gerais',
      icon: Settings,
    },
    {
      title: 'Aparência',
      description: `Personalize as cores utilizadas na interface da plataforma ${name}`,
      actionLabel: 'Configurar',
      href: '#',
      icon: Command,
    },
    {
      title: 'Usuários e Permissões',
      description: `Gerencie usuários, perfis de acesso e permissões da plataforma ${name}`,
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

  return (
    <LayoutBase
      tagTitle="Gestão Global do Sistema"
      titlePage="Gestão Global do Sistema"
      description={`Gerencie acessos, módulos e configurações fundamentais da plataforma ${name}.`}
    >
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
    </LayoutBase>
  );
}
