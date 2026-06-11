import Heading from '@/components/layout/heading';
import { Main } from '@/components/layout/main';
import { Head } from '@inertiajs/react';
interface LayoutBaseProps {
  children: React.ReactNode;
  descriptionPage?: string | React.ReactNode;
  titlePage: string;
  tagTitle?: string;
  description?: string | React.ReactNode;
  rightComponent?: React.ReactNode;
  showHeader?: boolean;
}
export function LayoutBase({
  children,
  tagTitle: title,
  titlePage,
  description,
  rightComponent,
  showHeader = true,
}: LayoutBaseProps) {
  return (
    <>
      <Head title={title} />
      {/* O Header já está dentro do Main */}
      <Main>
        {showHeader && (
          <div className="flex items-center justify-between gap-4">
            <Heading description={description} title={titlePage} />
            {rightComponent}
          </div>
        )}

        <div className="flex flex-col">{children}</div>
      </Main>
    </>
  );
}
