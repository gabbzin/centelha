import { Textarea } from '@headlessui/react'
import { BrushIcon, Plus, Share2Icon, WrenchIcon } from 'lucide-react'
import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from 'react-hook-form'
import { InputSelect } from '@/components/inputs/input-select'
import Uploader1 from '@/components/inputs/uploader1'
import Uploader2 from '@/components/inputs/uploader2'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import type { FileWithPreview } from '@/hooks/inputs/use-file-upload'
import { FONT_SELECT_OPTIONS } from '@/settings/fonts'
import { TtIcon } from '@/pages/admin/gestao-sistema/Tt-icon'
import SettingsPanelCard from '../settings-panel-card'
import { SocialInputRow } from '../social-input-row'
interface ConfigsGeraisFormProps {
  onLogoChange?: (files: FileWithPreview[]) => void
  onFaviconChange?: (files: FileWithPreview[]) => void
  currentLogoUrl?: string
  currentFaviconUrl?: string
}

// Render
export function ConfigsGeraisForm({
  onLogoChange,
  onFaviconChange,
  currentLogoUrl,
  currentFaviconUrl,
}: ConfigsGeraisFormProps) {
  // Form Context
  const { control, register } = useFormContext()

  // Criando novos fields
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'social_links',
  })

  // Assistindo os fields
  const socialLinksWatch = useWatch({
    control,
    name: 'social_links',
  })

  // Classe repetida
  const classIcons = 'size-5'
  return (
    <>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SettingsPanelCard
            icon={<BrushIcon className={classIcons} />}
            title="Identidade Visual"
          >
            <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-5">
              <div className="md:col-span-3">
                <Uploader2
                  currentLogoUrl={currentLogoUrl}
                  onFilesChange={onLogoChange}
                />
              </div>
              <div className="space-y-8 md:col-span-2">
                <div className="space-y-2">
                  <Label>Ícone do Navegador (Favicon)</Label>
                  <div>
                    <Uploader1
                      currentFaviconUrl={currentFaviconUrl}
                      onFilesChange={onFaviconChange}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Fonte da Plataforma</Label>
                  <InputSelect
                    control={control}
                    name="font"
                    options={FONT_SELECT_OPTIONS}
                  />
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
                  {...register('platformName')}
                />
              </div>
              <div>
                <Label>SLOGAN / DESCRIÇÃO CURTA</Label>
                <Textarea
                  className="border-border mt-2 resize-none border w-full"
                  placeholder="Gestão inteligente e eficiente de dados."
                  {...register('slogan')}
                />
              </div>
              <div>
                <Label>TEXTO RODAPÉ</Label>
                <Textarea
                  className="border-border mt-2 resize-none border w-full"
                  placeholder="© 2026 Centelha Administrative System. Todos os direitos reservados."
                  {...register('footerText')}
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
            {fields.map((field, index) => {
              const currentValue = socialLinksWatch?.[index]?.value || ''
              return (
                <SocialInputRow
                  key={field.id}
                  onDelete={() => remove(index)}
                  placeholder={'Digite a url da rede social'}
                  value={currentValue}
                  {...register(`social_links.${index}.value`)}
                />
              )
            })}
            <Button
              className="mt-2 inline-flex items-center gap-2"
              onClick={() =>
                append({
                  value: '',
                })
              }
              type="button"
              variant="ghost"
            >
              <Plus className="size-4" /> ADICIONAR REDE SOCIAL
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
                  <Controller
                    control={control}
                    name="maintenance_mode"
                    render={({ field }) => (
                      <Switch
                        checked={field.value ?? false}
                        onCheckedChange={(val) => field.onChange(val)}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
