import Heading from '@/components/layout/heading';
import { Main } from '@/components/layout/main';
import { Head } from '@inertiajs/react';
interface LayoutBaseProps {
  children: React.ReactNode;
  descriptionPage?: string | React.ReactNode;
  tagTitle?: string;
  titlePage: string;
}
export function LayoutBase({
  children,
  tagTitle: title,
  titlePage,
  descriptionPage: description,
}: LayoutBaseProps) {
  return (
    <>
      <Head title={title} />
      {/* O Header já está dentro do Main */}
      <Main>
        <div className="flex items-center justify-between gap-4">
          <Heading description={description} title={titlePage} />
        </div>

        <div className="flex flex-col">{children}</div>
      </Main>
    </>
  );
}
