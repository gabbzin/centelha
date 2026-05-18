import { Logo } from '@/components/logo';
import { SystemManagementCard } from '@/components/system-management-card';
import { Button } from '@/components/ui/button';
import { Head } from '@inertiajs/react';
import { Bell, Command, Menu, Moon, Settings, Users } from 'lucide-react';

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
        <header className="border-b border-border bg-muted">
          <div className="max-w-lm mx-auto flex items-center justify-between px-8 py-2">
            <a href="#" className="flex items-center gap-[14px]">
              <Logo width={42} height={46} />
              <span className="text-heading text-[22px] font-bold tracking-[0.01em]">Centelha</span>
            </a>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon-sm"
                className="h-9 w-10 rounded-[4px] border-foreground/40 bg-transparent text-foreground hover:bg-background"
              >
                <Moon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon-sm"
                className="h-9 w-10 rounded-[4px] border-foreground/40 bg-transparent text-foreground hover:bg-background"
              >
                <Bell className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon-sm"
                className="h-9 w-10 rounded-[4px] border-foreground/40 bg-transparent text-foreground hover:bg-background"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        <main className="max-w-lm mx-auto px-8 pt-8 pb-10">
          <section className="pb-6">
            <h1 className="text-heading text-2xl/8 font-bold tracking-[-0.02em] uppercase">GESTÃO GLOBAL DO SISTEMA</h1>
            <p className="mt-2 text-sm/5 text-foreground/75">
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
