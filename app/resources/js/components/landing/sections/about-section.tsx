// interface AboutSectionProps {}

export function AboutSection() {
  return (
    <section className="bg-surface">
      <div className="mx-auto w-full max-w-5xl space-y-6 px-6 py-20 text-center lg:px-10">
        <h2 className="text-heading text-2xl font-bold tracking-tight lg:text-5xl">
          Chega de planilhas perdidas e processos manuais.
        </h2>
        <p className="text-muted-foreground mx-auto max-w-3xl text-base leading-relaxed lg:text-lg">
          O atraso e a falha tiram o foco do que realmente importa: as pessoas.
          O <span className="font-bold text-[#2E5F9E]">Centelha+</span> organiza
          sua operação para que você recupere seu tempo.
        </p>
      </div>
    </section>
  );
}
