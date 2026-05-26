export default function Heading({ title, description }: { title: string; description?: string }) {
  return (
    <div className="space-y-0.5">
      <h2 className="font-heading text-heading text-2xl font-bold tracking-tight uppercase">{title}</h2>
      {description && <p className="text-muted-foreground text-sm">{description}</p>}
    </div>
  );
}
