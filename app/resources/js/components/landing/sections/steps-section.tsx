import { StepCard } from '../step-card';

interface StepsSectionProps {
  steps: {
    step: string;
    title: string;
  }[];

  ref: React.Ref<HTMLDivElement>;
}

export function StepsSection({ steps, ref }: StepsSectionProps) {
  return (
    <section className="bg-background" ref={ref}>
      <div className="max-w-lm mx-auto w-full space-y-10 px-6 py-24 lg:px-10">
        <h2 className="text-center text-3xl font-semibold tracking-tight lg:text-5xl">
          Quatro passos para uma gestão de excelência.
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((item) => (
            <StepCard key={item.step} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
