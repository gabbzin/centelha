import { Button } from '@/components/ui/button';
export function FinalCardSection() {
  return (
    <section className="bg-background px-6 py-8 lg:px-10 lg:py-24">
      <div className="text-primary-foreground relative mx-auto flex w-full max-w-5xl flex-col items-center gap-5 overflow-hidden rounded-[24px] px-6 py-16 text-center shadow-2xl shadow-black/20 lg:px-16">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2E5F9E] to-[#1E406F]" />
        <div className="absolute -top-20 -right-20 size-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 size-80 rounded-full bg-white/10 blur-3xl" />
        <div className="relative space-y-4">
          <h2 className="font-jakarta-plus text-3xl font-bold tracking-tight lg:text-5xl">
            Pronto para modernizar seu centro social?
          </h2>
          <p className="text-primary-foreground/90 mx-auto max-w-3xl text-base lg:text-lg">
            Junte-se a organizações que já otimizaram sua gestão e ampliaram seu
            impacto na comunidade.
          </p>
        </div>
        <Button
          className="text-primary bg-background hover:bg-background/90 relative gap-2 rounded-full px-6 shadow-xl"
          size="lg"
        >
          Cadastrar Meu Centro Agora
        </Button>
        <p className="text-primary-foreground/80 relative text-sm">
          Sem necessidade de cartão de crédito. Teste grátis por 14 dias.
        </p>
      </div>
    </section>
  );
}
