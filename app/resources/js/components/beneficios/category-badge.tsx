import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { BenefitCategory } from './types';
const CATEGORY_STYLES: Record<BenefitCategory, string> = {
  Alimentação: 'bg-blue-50 text-blue-700 border-blue-200',
  Financeiro: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Saúde: 'bg-amber-50 text-amber-700 border-amber-200',
  Vestuário: 'bg-purple-50 text-purple-700 border-purple-200',
  Educação: 'bg-pink-50 text-pink-700 border-pink-200',
};
interface BenefitCategoryBadgeProps {
  category: BenefitCategory;
}
export function BenefitCategoryBadge({ category }: BenefitCategoryBadgeProps) {
  return (
    <Badge
      className={cn('uppercase', CATEGORY_STYLES[category])}
      variant="outline"
    >
      {category}
    </Badge>
  );
}
