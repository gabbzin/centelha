import { Header } from '@/components/layout/header';
import { Safari } from '@/components/ui/safari';
import Dashboard from '@/pages/dashboard';
import { Head } from '@inertiajs/react';
import { SaveIcon } from 'lucide-react';

// Componente Principal
export default function PainelCustomizacao() {
  return (
    <>
      <Head title="Painel de Customização" />
      <div className="flex h-screen w-full flex-col">
        <Header />
        <main className="flex h-full w-full items-start justify-start">
          <aside className="w-1/6 p-2 border-r border-b border-border z-10 px-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-sm font-bold uppercase">Personalizar Conteúdo</h2>
                <p className="text-xs">Editando Dashboard</p>
              </div>
              <SaveIcon className="size-6 text-button" />
            </div>
            <form></form>
          </aside>
          <div className="bg-blue-400 w-full h-full p-8">
            <Safari
              className="w-full h-full"
              mode="simple"
              url="https://instagram.com"
            >
              {/* <Dashboard
                alerts={dashboardMock.alerts}
                chartData={dashboardMock.chartData}
                showHeader={false}
                statsCards={dashboardMock.statsCards}
                topItems={dashboardMock.topItems}
               /> */}
            </Safari>
          </div>
        </main>
      </div>
    </>
  );
}
const dashboardMock = {
  statsCards: {
    benefitsDelivered: {
      value: 1240,
      percentageChange: 15,
    },
    familiesServed: {
      value: 850,
      percentageChange: 8,
    },
    newRegistrations: {
      value: 230,
      percentageChange: -6,
    },
  },
  alerts: [
    {
      label: 'Cestas básicas',
      rest: 12,
      alertLevel: 'warning' as const,
    },
    {
      label: 'Gás',
      rest: 8,
      alertLevel: 'critical' as const,
    },
    {
      label: 'Kit Higiene',
      rest: 5,
      alertLevel: 'critical' as const,
    },
  ],
  topItems: [
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
    {
      name: 'Kit Higiene',
      quantity: 90,
      percentage: 40,
    },
  ],
  chartData: [
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
    {
      name: 'Medicamentos',
      anterior: 100,
      atual: 180,
    },
  ],
};
