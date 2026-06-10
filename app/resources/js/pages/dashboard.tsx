import { FamilyIcon } from '@/components/dashboard/icons/family-icon';
import { HandWithHeartIcon } from '@/components/dashboard/icons/hand-with-heart-icon';
import { UserAddIcon } from '@/components/dashboard/icons/user-add-icon';
import { StatsCard } from '@/components/dashboard/stats-card';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
const OPTIONSSELECT = [
  {
    value: 'maio_2026',
    label: 'Maio 2026',
  },
  {
    value: 'junho_2026',
    label: 'Junho 2026',
  },
];
import { LayoutBase } from '@/layouts/layout';
import { Map } from '@/components/dashboard/map';
import { AlertCard } from '@/components/dashboard/cards/alert-card';
import { TopItensCard } from '@/components/dashboard/cards/top-itens-card';
import SimpleBarChart from '@/components/dashboard/simple-bar-chart';
export default function Dashboard() {
  return (
    <LayoutBase
      descriptionPage="Acompanhamento estratégico das operações da Centelha"
      rightComponent={
        <Select defaultValue={OPTIONSSELECT[0].value}>
          <SelectTrigger className={'border-border border'}>
            <SelectValue className={'capitalize'}>
              {
                OPTIONSSELECT.find(
                  (option) => option.value === OPTIONSSELECT[0].value,
                )?.label
              }
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {OPTIONSSELECT.map((option) => (
              <SelectItem
                key={option.value}
                className={'capitalize'}
                value={option.value}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      }
      tagTitle="Dashboard"
      titlePage="Visão Geral do Dashboard"
    >
      <main className="space-y-8">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsCard
            icon={<HandWithHeartIcon />}
            percentageChange={15}
            title="Benefícios Entregues"
            value={1240}
          />
          <StatsCard
            icon={<FamilyIcon />}
            percentageChange={8}
            title="Familias Atendidas"
            value={850}
          />
          <StatsCard
            icon={<UserAddIcon />}
            percentageChange={-6}
            title="Novos Cadastros"
            value={1240}
          />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="font-bold text-lg uppercase font-heading">
                Mapa de Distribuição
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Map />
            </CardContent>
          </Card>
          <div className="flex flex-col items-center justify-between">
            <AlertCard
              infos={[
                {
                  label: 'Cestas básicas',
                  rest: 12,
                  alertLevel: 'warning',
                },
                {
                  label: 'Gás',
                  rest: 8,
                  alertLevel: 'critical',
                },
              ]}
            />
            <TopItensCard
              itens={[
                {
                  name: 'Cestas básicas',
                  quantity: 270,
                  percentage: 75,
                },
                {
                  name: 'Gás',
                  quantity: 150,
                  percentage: 60,
                },
              ]}
            />
          </div>
        </section>

        <section>
          <Card>
            <CardHeader className="flex items-center justify-between border-b">
              <CardTitle className="font-bold text-lg uppercase font-heading">
                Comparativo de Entregas por Categoria (Mes Atual x Anterior)
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="size-2 bg-chart-5" />
                  Mês anterior (maio)
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-2 bg-chart-3" />
                  Mês atual (junho)
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <SimpleBarChart data={data} />
            </CardContent>
          </Card>
        </section>
      </main>
    </LayoutBase>
  );
}
const data = [
  {
    name: 'Kit Higiene',
    anterior: 250,
    atual: 320,
  },
  {
    name: 'Cestas básicas',
    anterior: 300,
    atual: 270,
  },
  {
    name: 'Gás',
    anterior: 200,
    atual: 150,
  },
];
