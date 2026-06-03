import SettingsPanelCard from '@/components/gestao-sistema/settings-panel-card';
import { SocialInputRow } from '@/components/gestao-sistema/social-input-row';
import { InputSelect } from '@/components/inputs/input-select';
import Uploader1 from '@/components/inputs/uploader1';
import Uploader2 from '@/components/inputs/uploader2';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { LayoutBase } from '@/layouts/layout';
import { BrushIcon, Plus, Share2Icon, WrenchIcon } from 'lucide-react';
import { TtIcon } from './Tt-icon';
const options = [
  {
    value: 'geist',
    label: 'Geist',
  },
  {
    value: 'inter',
    label: 'Inter',
  },
  {
    value: 'roboto',
    label: 'Roboto',
  },
];
export default function ConfiguracoesGerais() {
  const classIcons = 'size-5';
  return (
    <LayoutBase
      descriptionPage="Gerencie a identidade da marca e as comunicações textuais da plataforma."
      titlePage="Configurações Visuais e Textos"
    >
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SettingsPanelCard
            icon={<BrushIcon className={classIcons} />}
            title="Identidade Visual"
          >
            <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-5">
              <div className="md:col-span-3">
                <Uploader2 />
              </div>

              <div className="space-y-8 md:col-span-2">
                <div className="space-y-2">
                  <Label>Ícone do Navegador (Favicon)</Label>
                  <div>
                    <Uploader1 />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Fonte da Plataforma</Label>
                  <InputSelect options={options} />
                </div>
              </div>
            </div>
          </SettingsPanelCard>
        </div>
        <div className="col-span-1">
          <SettingsPanelCard icon={<TtIcon />} title="Textos da Interface">
            <div className="space-y-4">
              <div>
                <Label>NOME DA PLATAFORMA</Label>
                <Input
                  className="border-border mt-2 border"
                  placeholder="Centelha Administrative System"
                />
              </div>

              <div>
                <Label>SLOGAN / DESCRIÇÃO CURTA</Label>
                <Textarea
                  className="border-border mt-2 resize-none border"
                  placeholder="Gestão inteligente e eficiente de dados."
                />
              </div>

              <div>
                <Label>TEXTO RODAPÉ</Label>
                <Textarea
                  className="border-border mt-2 resize-none border"
                  placeholder="© 2026 Centelha Administrative System. Todos os direitos reservados."
                />
              </div>
            </div>
          </SettingsPanelCard>
        </div>
      </section>
      <div className="mt-4">
        <SettingsPanelCard
          icon={<Share2Icon className={classIcons} />}
          title="Redes Sociais"
        >
          <div className="space-y-3">
            <SocialInputRow
              network="instagram"
              placeholder="https://instagram.com/centelha"
            />
            <SocialInputRow
              network="linkedin"
              placeholder="https://linkedin.com/company/centelha"
            />
            <SocialInputRow network="youtube" placeholder="URL do YouTube" />

            <Button
              className="mt-2 inline-flex items-center gap-2"
              variant="ghost"
            >
              <Plus className="h-4 w-4" /> ADICIONAR REDE SOCIAL
            </Button>
          </div>
        </SettingsPanelCard>
      </div>

      <div className="mt-4">
        <Card variant={'basic'}>
          <CardContent className="flex items-start gap-4">
            <div className="bg-destructive/40 flex items-center justify-center rounded-md p-2">
              <WrenchIcon
                className={`${classIcons} text-destructive scale-x-[-1]`}
              />
            </div>
            <div className="grid w-full max-w-full items-start gap-1 pb-2">
              <h3 className="text-heading text-lg font-semibold">
                Manutenção da Plataforma
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground/75 text-sm">
                    Ative esta opção para suspender temporariamente o acesso de
                    usuários comuns à plataforma.
                    <br />
                    Administradores ainda poderão fazer login.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-foreground/60 text-sm">
                    MODO DE MANUTENÇÃO
                  </span>
                  <Switch />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-6" />

      <footer className="flex items-center justify-end gap-4">
        <Button variant="ghost">Cancelar</Button>
        <Button>Salvar Alterações</Button>
      </footer>
    </LayoutBase>
  );
}
