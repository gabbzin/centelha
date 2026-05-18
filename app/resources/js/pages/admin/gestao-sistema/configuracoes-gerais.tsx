import { Header } from '@/components/layout/header';
import SettingsPanelCard from '@/components/settings-panel-card';
import SocialInputRow from '@/components/social-input-row';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Toggle } from '@/components/ui/toggle';
import { Head } from '@inertiajs/react';
import { ArrowLeftIcon, Plus } from 'lucide-react';

export default function ConfiguracoesGerais() {
  return (
    <>
      <Head title="Configurações Visuais e Textos" />

      <div className="bg-surface min-h-screen">
        <Header />

        <main className="max-w-lm mx-auto px-8 pt-8 pb-10">
          <section className="pb-6">
            <div className="flex items-center gap-2">
              <Button size={'icon-lg'} variant={'destructive'}>
                <ArrowLeftIcon fontWeight={800} className='size-6' />
              </Button>
              <h1 className="text-heading text-2xl/8 font-bold tracking-[-0.02em] uppercase">
                CONFIGURAÇÕES VISUAIS E TEXTOS
              </h1>
            </div>
            <p className="text-foreground/75 mt-2 text-sm/5">
              Gerencie a identidade da marca e as comunicações textuais da plataforma.
            </p>
          </section>

          <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <SettingsPanelCard title="Identidade Visual" icon={<svg className="h-4 w-4" />}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="md:col-span-2">
                    <div className="border-border rounded-md border border-dashed p-6 text-center">
                      <div className="text-muted mb-4">Arraste uma imagem ou clique para selecionar</div>
                      <Button variant="secondary">ALTERAR LOGO</Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Ícone do Navegador (Favicon)</Label>
                      <Button className="mt-2" variant="outline">
                        Carregar Ícone
                      </Button>
                    </div>

                    <div>
                      <Label>Fonte da Plataforma</Label>
                      <Input className="mt-2" placeholder="Inter" />
                    </div>
                  </div>
                </div>
              </SettingsPanelCard>

              <div className="mt-4">
                <SettingsPanelCard title="Redes Sociais" icon={<svg className="h-4 w-4" />}>
                  <div className="space-y-3">
                    <SocialInputRow placeholder="https://instagram.com/centelha" />
                    <SocialInputRow placeholder="https://linkedin.com/company/centelha" />
                    <SocialInputRow placeholder="URL do YouTube" />

                    <Button variant="ghost" className="mt-2 inline-flex items-center gap-2">
                      <Plus className="h-4 w-4" /> ADICIONAR REDE SOCIAL
                    </Button>
                  </div>
                </SettingsPanelCard>
              </div>

              <div className="mt-4">
                <SettingsPanelCard title="Manutenção da Plataforma" icon={<svg className="h-4 w-4" />}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-foreground/75 text-sm/5">
                        Ative esta opção para suspender temporariamente o acesso de usuários comuns à plataforma.
                        Administradores ainda poderão fazer login.
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-foreground/60 text-sm/5">MODO DE MANUTENÇÃO</span>
                      <Toggle />
                    </div>
                  </div>
                </SettingsPanelCard>
              </div>
            </div>

            <div>
              <SettingsPanelCard title="Textos da Interface" icon={<svg className="h-4 w-4" />}>
                <div className="space-y-4">
                  <div>
                    <Label>NOME DA PLATAFORMA</Label>
                    <Input className="mt-2" placeholder="Centelha Administrative System" />
                  </div>

                  <div>
                    <Label>SLOGAN / DESCRIÇÃO CURTA</Label>
                    <Input className="mt-2" placeholder="Gestão inteligente e eficiente de dados." />
                  </div>

                  <div>
                    <Label>TEXTO RODAPÉ</Label>
                    <Input
                      className="mt-2"
                      placeholder="© 2024 Centelha Administrative System. Todos os direitos reservados."
                    />
                  </div>
                </div>
              </SettingsPanelCard>
            </div>
          </section>

          <Separator className="my-6" />

          <footer className="flex items-center justify-end gap-4">
            <Button variant="ghost">Cancelar</Button>
            <Button>Salvar Alterações</Button>
          </footer>
        </main>
      </div>
    </>
  );
}
