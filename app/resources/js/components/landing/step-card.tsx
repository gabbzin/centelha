type StepCardProps = {
  step: string;
  title: string;
};

export function StepCard({ step, title }: StepCardProps) {
  return (
    <div className="flex h-full flex-col items-center gap-6 px-2 py-2 text-center">
      <div className="bg-foreground/10 text-primary font-jakarta-plus flex size-10 items-center justify-center rounded-full text-sm font-semibold">
        {step}
      </div>
      <h3 className="text-heading text-sm leading-6 font-bold lg:text-base">{title}</h3>
    </div>
  );
}
