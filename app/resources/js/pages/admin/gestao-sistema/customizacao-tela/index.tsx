import { router } from '@inertiajs/react'
import { Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LayoutBase } from '@/layouts/layout'

interface AvailablePage {
  key: string
  label: string
  description: string
}

interface IndexProps {
  availablePages: AvailablePage[]
}

export default function CustomizacaoTelaIndex({ availablePages }: IndexProps) {
  return (
    <LayoutBase
      description="Selecione uma tela para personalizar seus textos, widgets e regras."
      tagTitle="Customização por Tela"
      titlePage="Painel de Customização por Tela"
    >
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {availablePages.map((page) => (
          <Card key={page.key} variant="basic">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Settings className="size-5" />
                {page.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-muted-foreground text-sm">
                {page.description}
              </p>
              <Button
                onClick={() =>
                  router.visit(`/gestao-sistema/customizacao-tela/${page.key}`)
                }
                variant="primary"
              >
                Personalizar
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </LayoutBase>
  )
}
