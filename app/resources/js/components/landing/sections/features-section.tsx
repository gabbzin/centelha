import { LucideIcon } from 'lucide-react';
import { FeatureCard } from '../feature-card';
interface FeaturesSectionProps {
  features: {
    title: string;
    description: string;
    Icon: LucideIcon;
  }[];
  ref: React.Ref<HTMLDivElement>;
}
export function FeaturesSection({ features, ref }: FeaturesSectionProps) {
  return (
    <section ref={ref} className="bg-surface">
      <div className="max-w-lm mx-auto w-full px-6 py-24 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-3">
          {features.map((item) => (
            <FeatureCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
