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
interface StatsCardData {
  value: number;
  percentageChange: number;
}
interface AlertInfo {
  label: string;
  rest: number;
  alertLevel: 'warning' | 'critical';
}
interface TopItem {
  name: string;
  quantity: number;
  percentage: number;
}
interface ChartDataItem {
  name: string;
  anterior: number;
  atual: number;
}
interface DashboardProps {
  statsCards: {
    benefitsDelivered: StatsCardData;
    familiesServed: StatsCardData;
    newRegistrations: StatsCardData;
  };
  alerts: AlertInfo[];
  topItems: TopItem[];
  chartData: ChartDataItem[];
}
export default function Dashboard({
  statsCards,
  alerts,
  topItems,
  chartData,
}: DashboardProps) {
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
            percentageChange={statsCards.benefitsDelivered.percentageChange}
            title="Benefícios Entregues"
            value={statsCards.benefitsDelivered.value}
          />
          <StatsCard
            icon={<FamilyIcon />}
            percentageChange={statsCards.familiesServed.percentageChange}
            title="Familias Atendidas"
            value={statsCards.familiesServed.value}
          />
          <StatsCard
            icon={<UserAddIcon />}
            percentageChange={statsCards.newRegistrations.percentageChange}
            title="Novos Cadastros"
            value={statsCards.newRegistrations.value}
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
            <AlertCard infos={alerts} />
            <TopItensCard itens={topItems} />
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
              <SimpleBarChart data={chartData} />
            </CardContent>
          </Card>
        </section>
      </main>
    </LayoutBase>
  );
}
