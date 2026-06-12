import { StockControlSection } from '@/components/beneficios/stock-control-section';
import { Header } from '@/components/layout/header';
import { Head } from '@inertiajs/react';
import type { PaginatedBenefits } from '@/components/beneficios/types';

interface BeneficiosPageProps {
  benefits: PaginatedBenefits;
}

export default function Beneficios({ benefits }: BeneficiosPageProps) {
  return (
    <>
      <Head title="Benefícios" />
      <div className="bg-surface min-h-screen">
        <Header />
        <main className="max-w-lm mx-auto w-full px-8 pt-8 pb-12">
          <StockControlSection benefits={benefits} />
        </main>
      </div>
    </>
  );
}
