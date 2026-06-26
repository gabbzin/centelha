import { Head, Link, usePage } from '@inertiajs/react'
import { CalendarClock, HandCoins, HeartHandshake } from 'lucide-react'
import type React from 'react'
import { useRef } from 'react'
import { SocialIcon } from 'react-social-icons'
import { AboutSection } from '@/components/landing/sections/about-section'
import { FeaturesSection } from '@/components/landing/sections/features-section'
import { FinalCardSection } from '@/components/landing/sections/final-card-section'
import { HeroSection } from '@/components/landing/sections/hero-section'
import { StepsSection } from '@/components/landing/sections/steps-section'
import { Logo } from '@/components/logo'
import { buttonVariants } from '@/components/ui/button'
import type { SharedData } from '@/types'

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
]
const features = [
  {
    title: 'Gestao de Eventos Sem Caos',
    description:
      'Organize assembleias, cursos e distribuicoes com calendarios inteligentes que mantem todos em sincronia.',
    Icon: CalendarClock,
  },
  {
    title: 'Beneficios com Transparencia Total',
    description:
      'Controle a entrega de cestas e vouchers com rastreabilidade absoluta e sem duplicidade.',
    Icon: HandCoins,
  },
  {
    title: 'Nenhuma Familia Esquecida',
    description:
      'Receba alertas automaticos de familias desassistidas e garanta um atendimento justo e humanizado.',
    Icon: HeartHandshake,
  },
]
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
]
export default function Home({
  previewSettings,
}: {
  previewSettings?: Record<string, unknown>
}) {
  const { communityCenter, pageSettings: sharedSettings } =
    usePage<SharedData>().props
  const pageSettings = previewSettings ?? sharedSettings
  const texts = (pageSettings?.texts as Record<string, string>) ?? {}
  const t = (key: string, fallback: string) => texts[key] ?? fallback

  const inicioRef = useRef<HTMLElement>(null)
  const beneficiosRef = useRef<HTMLElement>(null)
  const comoFuncionaRef = useRef<HTMLElement>(null)

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const navItems = [
    { name: t('nav_inicio', 'Início'), ref: inicioRef },
    { name: t('nav_beneficios', 'Benefícios'), ref: beneficiosRef },
    { name: t('nav_como_funciona', 'Como funciona'), ref: comoFuncionaRef },
  ]

  const steps = [
    {
      step: '1',
      title: t('step_1_title', 'Cadastre sua comunidade em minutos.'),
    },
    { step: '2', title: t('step_2_title', 'Organize seus fluxos e doacoes.') },
    { step: '3', title: t('step_3_title', 'Engaje voluntarios e familias.') },
    {
      step: '4',
      title: t('step_4_title', 'Acompanhe o impacto com dados reais.'),
    },
  ]
  const features = [
    {
      title: t('feature_1_title', 'Gestao de Eventos Sem Caos'),
      description: t(
        'feature_1_desc',
        'Organize assembleias, cursos e distribuicoes com calendarios inteligentes que mantem todos em sincronia.',
      ),
      Icon: CalendarClock,
    },
    {
      title: t('feature_2_title', 'Beneficios com Transparencia Total'),
      description: t(
        'feature_2_desc',
        'Controle a entrega de cestas e vouchers com rastreabilidade absoluta e sem duplicidade.',
      ),
      Icon: HandCoins,
    },
    {
      title: t('feature_3_title', 'Nenhuma Familia Esquecida'),
      description: t(
        'feature_3_desc',
        'Receba alertas automaticos de familias desassistidas e garanta um atendimento justo e humanizado.',
      ),
      Icon: HeartHandshake,
    },
  ]
  const footerColumns = [
    {
      title: t('footer_product', 'Produto'),
      links: [
        t('footer_product_1', 'Funcionalidades'),
        t('footer_product_2', 'Demonstração'),
        t('footer_product_3', 'Preços'),
        t('footer_product_4', 'Atualizações'),
      ],
    },
    {
      title: t('footer_company', 'Empresa'),
      links: [
        t('footer_company_1', 'Sobre Nós'),
        t('footer_company_2', 'Impacto Social'),
        t('footer_company_3', 'Contato'),
        t('footer_company_4', 'Blog'),
      ],
    },
    {
      title: t('footer_legal', 'Legal'),
      links: [
        t('footer_legal_1', 'Termos de Uso'),
        t('footer_legal_2', 'Política de Privacidade'),
        t('footer_legal_3', 'Segurança de Dados'),
      ],
    },
  ]
  return (
    <>
      <Head title={communityCenter?.name ?? 'Centelha'} />

      <main className="bg-background text-foreground min-h-screen scroll-smooth">
        <header className="bg-background sticky top-0 z-50 border-b border-zinc-200 backdrop-blur-lg">
          <div className="max-w-lm mx-auto flex w-full items-center justify-between px-2 py-2 lg:px-10">
            <Link className="flex items-center gap-3" href={route('home')}>
              <Logo />
              <p className="text-heading text-xl font-extrabold tracking-tight">
                {communityCenter?.name ?? 'Centelha'}
              </p>
            </Link>

            <nav className="hidden items-center gap-8 lg:flex">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  className="hover:text-heading border-heading cursor-pointer text-sm transition duration-200 hover:border-b"
                  onClick={() => scrollTo(item.ref)}
                  type="button"
                >
                  {item.name}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                className={buttonVariants({
                  variant: 'ghost',
                  className: 'hidden rounded-full sm:inline-flex',
                })}
                href={route('login')}
              >
                {t('login_button', 'Entrar')}
              </Link>
              <Link
                className={buttonVariants({
                  variant: 'default',
                  className: 'rounded-full',
                })}
                href={route('login')}
              >
                {t('cta_button', 'Começar')}
              </Link>
            </div>
          </div>
        </header>

        <HeroSection ref={inicioRef} imageUrl={'/family.png'} />

        <AboutSection />

        <StepsSection ref={beneficiosRef} steps={steps} />

        <FeaturesSection ref={comoFuncionaRef} features={features} />

        <FinalCardSection />

        <footer className="bg-foreground text-white">
          <div className="mx-auto grid w-full max-w-7xl gap-12 px-2 py-16 md:grid-cols-2 lg:grid-cols-4 lg:px-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Logo height={32} width={32} />
                <p className="text-xl font-semibold tracking-tight">
                  {communityCenter?.name ?? 'Centelha'}
                </p>
              </div>
              <p className="max-w-xs text-sm text-white/70">
                {t(
                  'slogan',
                  communityCenter?.slogan ??
                    'Tecnologia simples e poderosa para potencializar ações sociais e transformar comunidades.',
                )}
              </p>
            </div>

            {footerColumns.map((column) => (
              <div key={column.title} className="space-y-3">
                <h3 className="text-sm font-semibold">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        className="text-sm text-white/70 transition hover:text-white"
                        href="#"
                        target="_blank"
                        rel="noopener"
                      >
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
              <p>
                © {new Date().getFullYear()}{' '}
                {communityCenter?.name ?? 'Centelha'}.{' '}
                {t('footer_rights', 'Todos os direitos reservados.')}
              </p>
              <div>
                {communityCenter?.social_links?.map((link) => (
                  <SocialIcon
                    key={link.value}
                    bgColor="transparent"
                    fgColor="#FFFFFF88"
                    style={{
                      width: 32,
                      height: 32,
                    }}
                    url={link.value}
                  />
                ))}
              </div>
              <p>
                {t('footer_credit', 'Desenvolvido com 💙 pela equipe')}{' '}
                {communityCenter?.name ?? 'Centelha'}
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
