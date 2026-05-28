import Heading from '@/components/layout/heading';
import { Main } from '@/components/layout/main';
import { Head } from '@inertiajs/react';

interface LayoutBaseProps {
  children: React.ReactNode;
  titlePage: string;
  tagTitle?: string;
  description?: string | React.ReactNode;
}

export function LayoutBase({ children, tagTitle: title, titlePage, description }: LayoutBaseProps) {
  return (
    <>
      <Head title={title} />
      {/* O Header já está dentro do Main */}
      <Main>
        <div className="flex items-center justify-between gap-4">
          <Heading title={titlePage} description={description} />
        </div>

        {children}
      </Main>
    </>
  );
}
