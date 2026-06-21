import { Head } from '@inertiajs/react'
import Heading from '@/components/layout/heading'
import { Main } from '@/components/layout/main'

interface LayoutBaseProps {
  children: React.ReactNode;
  descriptionPage?: string | React.ReactNode;
  titlePage: string;
  tagTitle?: string;
  description?: string | React.ReactNode;
  rightComponent?: React.ReactNode;
  hideHeader?: boolean;
}
export function LayoutBase({
  children,
  tagTitle: title,
  titlePage,
  description,
  rightComponent,
  hideHeader = false,
}: LayoutBaseProps) {
  return (
    <>
      <Head title={title} />
      <Main hideHeader={hideHeader}>
        <div className="flex items-center justify-between gap-4">
          <Heading description={description} title={titlePage} />
          {rightComponent}
        </div>

        <div className="flex flex-col">{children}</div>
      </Main>
    </>
  )
}
