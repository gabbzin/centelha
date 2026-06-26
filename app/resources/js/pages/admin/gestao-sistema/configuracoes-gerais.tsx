import { router, usePage } from '@inertiajs/react'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import GenericForm from '@/components/form/generic-form'
import { ConfigsGeraisForm } from '@/components/gestao-sistema/forms/configs-gerais-form'
import {
  configsGeraisSchema,
  type FormValues,
} from '@/components/gestao-sistema/schemas/configs-gerais-form'
import { toaster } from '@/components/toasters/toast-alert'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import type { FileWithPreview } from '@/hooks/inputs/use-file-upload'
import { LayoutBase } from '@/layouts/layout'
import type { SharedData } from '@/types'

// Componente principal
export default function ConfiguracoesGerais() {
  const { communityCenter } = usePage<SharedData>().props
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [faviconFile, setFaviconFile] = useState<File | null>(null)
  return (
    <LayoutBase
      descriptionPage="Gerencie a identidade da marca e as comunicações textuais da plataforma."
      tagTitle="Configurações Gerais"
      titlePage="Configurações Visuais e Textos"
    >
      <GenericForm
        defaultValues={{
          platformName: communityCenter?.name ?? '',
          slogan: communityCenter?.slogan ?? '',
          footerText: communityCenter?.rodape_text ?? '',
          font: communityCenter?.fontFamily ?? 'poppins',
          social_links:
            communityCenter?.social_links?.map((s) => ({
              value: s.value,
            })) ?? [],
          maintenance_mode: communityCenter?.maintenance_mode ?? false,
        }}
        needButtons={false}
        onSubmit={() => {}}
        schema={configsGeraisSchema}
      >
        <FormContent
          communityCenter={communityCenter}
          faviconFile={faviconFile}
          logoFile={logoFile}
          onFaviconChange={(files) =>
            setFaviconFile(
              files[0]?.file instanceof File ? files[0].file : null,
            )
          }
          onLogoChange={(files) =>
            setLogoFile(files[0]?.file instanceof File ? files[0].file : null)
          }
        />
      </GenericForm>
    </LayoutBase>
  )
}

// Componente interno
function FormContent({
  communityCenter,
  logoFile,
  faviconFile,
  onLogoChange,
  onFaviconChange,
}: {
  communityCenter: SharedData['communityCenter']
  logoFile: File | null
  faviconFile: File | null
  onLogoChange: (files: FileWithPreview[]) => void
  onFaviconChange: (files: FileWithPreview[]) => void
}) {
  // Contexto do Formulário
  const { getValues, trigger } = useFormContext<FormValues>()

  // Funções de envio
  const handleSave = async () => {
    const isValid = await trigger()
    if (!isValid) return
    const values = getValues()
    const formData = buildConfigsFormData(values, logoFile, faviconFile)

    // Chamada da API
    router.put(route('gestao-sistema.configuracoes-gerais.update'), formData, {
      preserveState: true,
      onSuccess: () => {
        toaster.createSuccess('Sucesso', 'Configurações salvas!')
        router.reload({ only: ['communityCenter'] })
      },
      onError: () => toaster.createError('Erro', 'Algo deu errado.'),
    })
  }
  return (
    <>
      <ConfigsGeraisForm
        currentFaviconUrl={communityCenter?.favicon_url}
        currentLogoUrl={communityCenter?.logo_url}
        onFaviconChange={onFaviconChange}
        onLogoChange={onLogoChange}
      />
      <Separator className="my-6" />
      <footer className="flex items-center justify-end gap-4">
        <Button variant="ghost">Cancelar</Button>
        <Button onClick={handleSave}>Salvar Alterações</Button>
      </footer>
    </>
  )
}

// Função para construir o FormData para envio
function buildConfigsFormData(
  values: FormValues,
  logoFile: File | null,
  faviconFile: File | null,
): FormData {
  const formData = new FormData()
  formData.append('name', values.platformName)
  formData.append('fontFamily', values.font)
  formData.append('maintenance_mode', values.maintenance_mode ? '1' : '0')
  if (values.slogan) formData.append('slogan', values.slogan)
  if (values.footerText) formData.append('rodape_text', values.footerText)
  if (values.social_links?.length) {
    formData.append('social_links', JSON.stringify(values.social_links))
  }
  if (logoFile) formData.append('logo', logoFile)
  if (faviconFile) formData.append('favicon', faviconFile)
  return formData
}
