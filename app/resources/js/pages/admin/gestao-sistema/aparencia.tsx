import { useForm, usePage } from '@inertiajs/react' // Se for usar o form do Inertia para salvar
import { HistoryIcon, SaveIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { InputColor } from '@/components/inputs/input-color'
import { toaster } from '@/components/toasters/toast-alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LayoutBase } from '@/layouts/layout'
import type { SharedData } from '@/types'

// Interface para tipar o nosso JSON de cores
interface SystemColors {
  primary: string
  background: string
  surface: string
  text_primary: string
  text_secondary: string
  text_disabled: string
  hover: string
  active: string
  success: string
  error: string
  warning: string
  info: string
  button: string
}

// Componente Principal
export default function Aparencia() {
  const { communityCenter } = usePage<SharedData>().props
  const colors = communityCenter?.colors

  // Valores padrões
  const defaultColors: SystemColors = {
    primary: '#1558D6',
    background: '#FFFFFF',
    surface: '#F8F9FA',
    text_primary: '#191C1E',
    text_secondary: '#959598',
    text_disabled: '#C5C6C7',
    hover: '#EFF6FF',
    active: '#1A5090',
    success: '#4ADE80',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
    button: '#094785',
  }

  // Form do Inertia
  const { data, setData, put, processing } = useForm<SystemColors>({
    ...defaultColors,
    ...colors,
  })

  // Atualiza as variáveis CSS no root sempre que os dados mudarem
  useEffect(() => {
    const root = document.documentElement
    root.style.setProperty('--primary', data.primary)
    root.style.setProperty('--background', data.background)
    root.style.setProperty('--surface', data.surface)
    root.style.setProperty('--foreground', data.text_primary)
    root.style.setProperty('--muted-foreground', data.text_secondary)
    root.style.setProperty('--disabled', data.text_disabled)
    root.style.setProperty('--accent', data.hover)
    root.style.setProperty('--secondary', data.active)
    root.style.setProperty('--success', data.success)
    root.style.setProperty('--destructive', data.error)
    root.style.setProperty('--warning', data.warning)
    root.style.setProperty('--info', data.info)
    root.style.setProperty('--button', data.button)
  }, [data])

  // Funções de envio e reset
  const handleSave = () => {
    put(route('admin.appearance.update'), {
      onSuccess: () => {
        toaster.createSuccess('Sucesso', 'Cores atualizadas com sucesso!')
      },
      onError: () => {
        toaster.createError('Erro', 'Algo deu errado!')
      },
    })
  }
  const handleReset = () => {
    setData(defaultColors)
  }
  return (
    <LayoutBase
      descriptionPage="Personalize as cores utilizadas na interface da plataforma Centelha."
      rightComponent={
        <div className="flex gap-2">
          <Button className="uppercase" onClick={handleReset} variant="outline">
            <HistoryIcon className="w-4 h-4 mr-2" />
            Restaurar Padrão
          </Button>
          <Button
            className="uppercase"
            disabled={processing}
            onClick={handleSave}
          >
            <SaveIcon className="w-4 h-4 mr-2" />
            {processing ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </div>
      }
      tagTitle="Aparência"
      titlePage="Cores do sistema"
    >
      <div className="space-y-10">
        {/* SEÇÃO CORES PRINCIPAIS */}
        <section>
          <SectionCardAppearance title="Cores principais">
            <InputColor
              color={data.primary}
              label="Cor primária"
              setColor={(color) => setData('primary', color)}
            />
            <InputColor
              color={data.background}
              label="Cor de Fundo"
              setColor={(color) => setData('background', color)}
            />
            <InputColor
              color={data.surface}
              label="Cor da Superfície"
              setColor={(color) => setData('surface', color)}
            />
          </SectionCardAppearance>
        </section>

        {/* SEÇÃO TIPOGRAFIA E INTERAÇÕES */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SectionCardAppearance columnDirection title="Tipografia">
            <InputColor
              color={data.text_primary}
              label="Texto Principal"
              setColor={(color) => setData('text_primary', color)}
            />
            <InputColor
              color={data.text_secondary}
              label="Texto Secundário"
              setColor={(color) => setData('text_secondary', color)}
            />
            <InputColor
              color={data.text_disabled}
              label="Texto desabilitado"
              setColor={(color) => setData('text_disabled', color)}
            />
          </SectionCardAppearance>

          <SectionCardAppearance columnDirection title="Interações">
            <InputColor
              color={data.hover}
              label="Cor de Hover"
              setColor={(color) => setData('hover', color)}
            />
            <InputColor
              color={data.active}
              label="Cor de Ativo"
              setColor={(color) => setData('active', color)}
            />
            <InputColor
              color={data.button}
              label="Cor de Botão ou Primário forte"
              setColor={(color) => setData('button', color)}
            />
          </SectionCardAppearance>
        </section>

        {/* SEÇÃO STATUS */}
        <section>
          <SectionCardAppearance title="Status do Sistema">
            <InputColor
              color={data.success}
              label="Sucesso"
              setColor={(color) => setData('success', color)}
            />
            <InputColor
              color={data.error}
              label="Erro"
              setColor={(color) => setData('error', color)}
            />
            <InputColor
              color={data.warning}
              label="Aviso"
              setColor={(color) => setData('warning', color)}
            />
            <InputColor
              color={data.info}
              label="Informação"
              setColor={(color) => setData('info', color)}
            />
          </SectionCardAppearance>
        </section>
      </div>
    </LayoutBase>
  )
}

// Componente interno para organizar as seções
function SectionCardAppearance({
  title,
  columnDirection = false,
  children,
}: {
  title: string
  columnDirection?: boolean
  children: React.ReactNode
}) {
  return (
    <Card variant={'basic'}>
      <CardHeader className="pb-6">
        <CardTitle className="text-xs font-semibold uppercase text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent
        className={`flex ${columnDirection ? 'flex-col' : 'flex-row'} items-center w-full gap-5`}
      >
        {children}
      </CardContent>
    </Card>
  )
}
