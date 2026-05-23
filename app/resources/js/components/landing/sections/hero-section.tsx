import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import React from 'react';

interface HeroSectionProps {
  imageUrl: string;
  ref: React.Ref<HTMLDivElement> | null;
}

export function HeroSection({ imageUrl, ref }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-white" ref={ref}>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(176.51% 121.35% at 100% 0%, rgba(46, 95, 158, 0.05) 0%, rgba(46, 95, 158, 0.00) 50%)',
        }}
      />
      <div className="max-w-lm relative mx-auto grid w-full gap-6 px-6 py-16 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">
        <div className="space-y-6">
          <h1 className="text-heading max-w-xl text-4xl leading-14 font-bold tracking-tighter lg:text-6xl">
            Transforme a gestão
            <br />
            do seu centro
            <br />
            comunitário em
            <br />
            <span className="text-primary">impacto real.</span>
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-[#4B5563] lg:text-lg">
            Centralize dados, organize doações e multiplique sua capacidade de ajudar com a plataforma mais simples e
            poderosa do setor social.
          </p>
          <Button className="gap-2 rounded-full border-0 py-6 shadow-xl">
            Começar Agora
            <ArrowRightIcon className="size-4" />
          </Button>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="absolute -inset-6 rounded-[32px] bg-[radial-gradient(circle_at_center,rgba(45,87,142,0.16),transparent_65%)] blur-xl" />
          <div className="border-border/70 relative overflow-hidden rounded-2xl border bg-white p-2 shadow-[0_24px_50px_-12px_rgba(16,24,36,0.22)]">
            <div className="border-border/50 hidden overflow-hidden rounded-2xl border bg-white md:block">
              <img src={imageUrl} alt="Dashboard da Plataforma Centelha" className="block h-auto w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
