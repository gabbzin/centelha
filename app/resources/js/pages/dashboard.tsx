import { HandWithHeartIcon } from '@/components/dashboard/icons/hand-with-heart-icon';
import { StatsCard } from '@/components/dashboard/stats-card';
import { LayoutBase } from '@/layouts/layout';
export default function Dashboard() {
  return (
    <LayoutBase
      descriptionPage="Acompanhamento estratégico das operações da Centelha"
      titlePage="Visão Geral do Dashboard"
    >
      <section>
        <StatsCard 
          icon={HandWithHeartIcon()}
          percentageChange={15} 
          title="Benefícios Entregues" 
          value={1240}
        />
      </section>
    </LayoutBase>
  );
}
