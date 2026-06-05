import { FamilyIcon } from '@/components/dashboard/icons/family-icon';
import { HandWithHeartIcon } from '@/components/dashboard/icons/hand-with-heart-icon';
import { UserAddIcon } from '@/components/dashboard/icons/user-add-icon';
import { StatsCard } from '@/components/dashboard/stats-card';
import { Card, CardContent } from '@/components/ui/card';
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
export default function Dashboard() {
  return (
    <LayoutBase
      descriptionPage="Acompanhamento estratégico das operações da Centelha"
      rightComponent={
        <Select defaultValue={OPTIONSSELECT[0].value}>
          <SelectTrigger className={'border-border border'}>
            <SelectValue className={'capitalize'} />
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

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardContent>
              <Map />
            </CardContent>
          </Card>
          <Card>
            <CardContent>Outro card</CardContent>
          </Card>
        </section>
      </main>
    </LayoutBase>
  );
}
