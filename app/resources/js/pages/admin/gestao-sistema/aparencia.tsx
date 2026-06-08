import { InputColor } from '@/components/inputs/input-color';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LayoutBase } from '@/layouts/layout';
import { HistoryIcon } from 'lucide-react';
export default function Aparencia() {
  return (
    <LayoutBase
      descriptionPage="Personalize as cores utilizadas na interface da plataforma Centelha."
      rightComponent={
        <Button className={'uppercase'} variant={'outline'}>
          <HistoryIcon />
          Restaurar Padrão
        </Button>
      }
      titlePage="Cores do sistema"
    >
      <div className="space-y-10">
        <section>
          <Card>
            <CardHeader className="pb-6">
              <CardTitle>Cores principais</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center w-full gap-5">
              <InputColor
                color={'#1558D6'}
                label="Cor primária"
                // setColor={setColor}
              />
              <InputColor
                color={'#FFFFFF'}
                label="Cor de Fundo"
                // setColor={setColor}
              />
              <InputColor
                color={'#F8F9FA'}
                label="Cor da Superfície"
                // setColor={setColor}
              />
            </CardContent>
          </Card>
        </section>
        <section className="flex items-center gap-2 *:flex-1">
          <Card>
            <CardHeader className="pb-6">
              <CardTitle>Tipografia</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center w-full gap-5">
              <InputColor
                color={'#191C1E'}
                label="Texto Principal"
                // setColor={setColor}
              />
              <InputColor
                color={'#959598'}
                label="Texto Secundário"
                // setColor={setColor}
              />
              <InputColor
                color={'#C5C6C7'}
                label="Texto desabilitado"
                // setColor={setColor}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-6">
              <CardTitle>Interação</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center w-full gap-5">
              <InputColor
                color={'#EFF6FF'}
                label="Cor de Hover"
                // setColor={setColor}
              />
              <InputColor
                color={'#1A5090'}
                label="Cor de Ativo"
                // setColor={setColor}
              />
            </CardContent>
          </Card>
        </section>

        <section>
          <Card>
            <CardHeader className="pb-6">
              <CardTitle>Status do Sistema</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center w-full gap-5">
              <InputColor
                color={'#4ADE80'}
                label="Sucesso"
                // setColor={setColor}
              />
              <InputColor
                color={'#EF4444'}
                label="Erro"
                // setColor={setColor}
              />
              <InputColor
                color={'#F59E0B'}
                label="Aviso"
                // setColor={setColor}
              />
              <InputColor
                color={'#3B82F6'}
                label="Informação"
                // setColor={setColor}
              />
            </CardContent>
          </Card>
        </section>
      </div>
    </LayoutBase>
  );
}
