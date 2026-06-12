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
<<<<<<< Updated upstream
  showHeader?: boolean;
=======
  hideHeader?: boolean;
>>>>>>> Stashed changes
}
export function LayoutBase({
  children,
  tagTitle: title,
  titlePage,
  description,
  rightComponent,
<<<<<<< Updated upstream
  showHeader = true,
=======
  hideHeader = false,
>>>>>>> Stashed changes
}: LayoutBaseProps) {
  return (
    <>
      <Head title={title} />
<<<<<<< Updated upstream
      {/* O Header já está dentro do Main */}
      <Main>
        {showHeader && (
          <div className="flex items-center justify-between gap-4">
            <Heading description={description} title={titlePage} />
            {rightComponent}
          </div>
        )}
=======
      <Main hideHeader={hideHeader}>
        <div className="flex items-center justify-between gap-4">
          <Heading description={description} title={titlePage} />
          {rightComponent}
        </div>
>>>>>>> Stashed changes

        <div className="flex flex-col">{children}</div>
      </Main>
    </>
  );
}
