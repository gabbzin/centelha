import { StockControlSection } from '@/components/beneficios/stock-control-section';
import { Header } from '@/components/layout/header';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { Head } from '@inertiajs/react';

export default function Beneficios() {
=======
=======
>>>>>>> Stashed changes
import { Head, usePage } from '@inertiajs/react';
import type { PaginatedBenefits } from '@/components/beneficios/types';
import type { SharedData } from '@/types';

interface BeneficiosPageProps {
  benefits: PaginatedBenefits;
  previewSettings?: Record<string, unknown>;
}

export default function Beneficios({ benefits, previewSettings }: BeneficiosPageProps) {
  const { pageSettings: sharedSettings } = usePage<SharedData>().props;
  const pageSettings = previewSettings ?? sharedSettings;
  const texts = (pageSettings?.texts as Record<string, string>) ?? {};

<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
  return (
    <>
      <Head title={texts.page_title ?? 'Benefícios'} />
      <div className="bg-surface min-h-screen">
        <Header />
        <main className="max-w-lm mx-auto w-full px-8 pt-8 pb-12">
<<<<<<< Updated upstream
<<<<<<< Updated upstream
          <StockControlSection />
=======
          <StockControlSection benefits={benefits} texts={texts} />
>>>>>>> Stashed changes
=======
          <StockControlSection benefits={benefits} texts={texts} />
>>>>>>> Stashed changes
        </main>
      </div>
    </>
  );
}
