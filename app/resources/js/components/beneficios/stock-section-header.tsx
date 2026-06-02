interface StockSectionHeaderProps {
  title: string;
  subtitle: string;
}

export function StockSectionHeader({ title, subtitle }: StockSectionHeaderProps) {
  return (
    <div>
      <h2 className="text-heading text-lg font-semibold uppercase">{title}</h2>
      <p className="text-foreground/75 text-sm">{subtitle}</p>
    </div>
  );
}
