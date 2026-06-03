import { AboutSection } from '@/components/landing/sections/about-section';
import { FeaturesSection } from '@/components/landing/sections/features-section';
import { FinalCardSection } from '@/components/landing/sections/final-card-section';
import { HeroSection } from '@/components/landing/sections/hero-section';
import { StepsSection } from '@/components/landing/sections/steps-section';
import { Logo } from '@/components/logo';
import { buttonVariants } from '@/components/ui/button';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { CalendarClock, HandCoins, HeartHandshake } from 'lucide-react';
import React, { useRef } from 'react';
import { SocialIcon } from 'react-social-icons';

const heroDashboardImage = 'https://www.figma.com/api/mcp/asset/fb9db903-00d7-45ee-9259-ff2b6076d32c';

const steps = [
  {
    step: '1',
    title: 'Cadastre sua comunidade em minutos.',
  },
  {
    step: '2',
    title: 'Organize seus fluxos e doacoes.',
  },
  {
    step: '3',
    title: 'Engaje voluntarios e familias.',
  },
  {
    step: '4',
    title: 'Acompanhe o impacto com dados reais.',
  },
];

const features = [
  {
    title: 'Gestao de Eventos Sem Caos',
    description:
      'Organize assembleias, cursos e distribuicoes com calendarios inteligentes que mantem todos em sincronia.',
    Icon: CalendarClock,
  },
  {
    title: 'Beneficios com Transparencia Total',
    description: 'Controle a entrega de cestas e vouchers com rastreabilidade absoluta e sem duplicidade.',
    Icon: HandCoins,
  },
  {
    title: 'Nenhuma Familia Esquecida',
    description: 'Receba alertas automaticos de familias desassistidas e garanta um atendimento justo e humanizado.',
    Icon: HeartHandshake,
  },
];

const footerColumns = [
  {
    title: 'Produto',
    links: ['Funcionalidades', 'Demonstração', 'Preços', 'Atualizações'],
  },
  {
    title: 'Empresa',
    links: ['Sobre Nós', 'Impacto Social', 'Contato', 'Blog'],
  },
  {
    title: 'Legal',
    links: ['Termos de Uso', 'Politica de Privacidade', 'Segurança de Dados'],
  },
];

const links = ['https://instagram.com', 'https://linkedin.com', 'https://twitter.com'];

export default function Home() {
  const { communityCenter } = usePage<SharedData>().props;
  const inicioRef = useRef<HTMLDivElement | null>(null);
  const beneficiosRef = useRef<HTMLDivElement | null>(null);
  const comoFuncionaRef = useRef<HTMLDivElement | null>(null);

  const scrollTo = (e: React.RefObject<HTMLDivElement | null>) => {
    if (e.current) {
      e.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { name: 'Inicio', ref: inicioRef },
    { name: 'Beneficios', ref: beneficiosRef },
    { name: 'Como Funciona', ref: comoFuncionaRef },
  ];

  return (
    <>
      <Head title={communityCenter?.name ?? 'Centelha'} />

      <main className="bg-background text-foreground min-h-screen scroll-smooth">
        <header className="bg-background sticky top-0 z-50 border-b border-zinc-200 backdrop-blur-lg">
          <div className="max-w-lm mx-auto flex w-full items-center justify-between px-2 py-2 lg:px-10">
            <Link href="#" className="flex items-center gap-3">
              <Logo />
              <p className="text-heading text-xl font-extrabold tracking-tight">{communityCenter?.name ?? 'Centelha'}</p>
            </Link>

            <nav className="hidden items-center gap-8 lg:flex">
              {navItems.map((item) => (
                <p
                  key={item.name}
                  className="hover:text-heading border-heading cursor-pointer text-sm transition duration-200 hover:border-b"
                  onClick={() => scrollTo(item.ref)}
                >
                  {item.name}
                </p>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href={route('login')}
                className={buttonVariants({ variant: 'ghost', className: 'hidden rounded-full sm:inline-flex' })}
              >
                Entrar
              </Link>
              <Link href={route('login')} className={buttonVariants({ variant: 'default', className: 'rounded-full' })}>
                Começar
              </Link>
            </div>
          </div>
        </header>

        <HeroSection imageUrl={heroDashboardImage} ref={inicioRef} />

        <AboutSection />

        <StepsSection steps={steps} ref={beneficiosRef} />

        <FeaturesSection features={features} ref={comoFuncionaRef} />

        <FinalCardSection />

        <footer className="bg-foreground text-white">
          <div className="mx-auto grid w-full max-w-7xl gap-12 px-2 py-16 md:grid-cols-2 lg:grid-cols-4 lg:px-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Logo width={32} height={32} />
                <p className="text-xl font-semibold tracking-tight">{communityCenter?.name ?? 'Centelha'}</p>
              </div>
              <p className="max-w-xs text-sm text-white/70">
                {communityCenter?.slogan ?? 'Tecnologia simples e poderosa para potencializar ações sociais e transformar comunidades.'}
              </p>
            </div>

            {footerColumns.map((column) => (
              <div key={column.title} className="space-y-3">
                <h3 className="text-sm font-semibold">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-white/70 transition hover:text-white">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-6 py-6 text-sm text-white/50 lg:flex-row lg:items-center lg:justify-between lg:px-10">
              <p>{communityCenter?.rodape_text ?? `© ${new Date().getFullYear()} Centelha. Todos os direitos reservados.`}</p>
              <div>
                {links.map((link) => (
                  <SocialIcon
                    key={link}
                    url={link}
                    bgColor="transparent"
                    style={{
                      width: 32,
                      height: 32,
                    }}
                    fgColor="#FFFFFF88"
                  />
                ))}
              </div>
              <p>
                Desenvolvido com <span className="text-white">💙</span> pela equipe {communityCenter?.name ?? 'Centelha'}
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
