import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { LayoutBase } from '@/layouts/layout';
import { SettingsForm } from '@/components/customization/settings-form';
import { toaster } from '@/components/toasters/toast-alert';
import { router } from '@inertiajs/react';
import type { PageSchema, DashboardPageSettings } from '@/types';
import { SaveIcon } from 'lucide-react';
import Dashboard from '@/pages/dashboard';
import Home from '@/pages/home';
import Login from '@/pages/auth/login';
interface EditProps {
  pageKey: string;
  schema: PageSchema;
  settings: DashboardPageSettings;
}
const PAGE_LABELS: Record<string, string> = {
  dashboard: 'Dashboard',
  home: 'Página Inicial',
  login: 'Login',
  familia: 'Gestão de Famílias',
  beneficios: 'Controle de Estoque',
};
const PREVIEW_MOCK = {
  dashboard: {
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
        alertLevel: 'warning',
      },
      {
        label: 'Gás',
        rest: 8,
        alertLevel: 'critical',
      },
      {
        label: 'Kit Higiene',
        rest: 5,
        alertLevel: 'critical',
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
  },
};
export default function CustomizacaoTelaEdit({
  pageKey,
  schema,
  settings: initialSettings,
}: EditProps) {
  const [liveSettings, setLiveSettings] = useState(initialSettings);
  const [saving, setSaving] = useState(false);
  const handleChange = useCallback((key: string, value: unknown) => {
    setLiveSettings((prev) => {
      const next = structuredClone(prev);
      const parts = key.split('.');
      let current: Record<string, unknown> = next as any;
      for (let i = 0; i < parts.length - 1; i++) {
        current = current[parts[i]] as Record<string, unknown>;
      }
      current[parts[parts.length - 1]] = value;
      return next;
    });
  }, []);
  const handleSave = () => {
    setSaving(true);
    const flat: Record<string, unknown> = {};
    for (const section of schema.sections) {
      for (const field of section.fields) {
        const parts = field.key.split('.');
        let current: unknown = liveSettings;
        for (const part of parts) {
          if (current && typeof current === 'object') {
            current = (current as Record<string, unknown>)[part];
          }
        }
        const flatKey = field.key.replace(/\./g, '_');
        flat[flatKey] = current;
      }
    }
    router.put(`/gestao-sistema/customizacao-tela/${pageKey}`, flat as never, {
      onSuccess: () => {
        toaster.createSuccess('Sucesso!', 'Configurações salvas com sucesso.');
        setSaving(false);
      },
      onError: () => {
        toaster.createError('Erro!', 'Ocorreu um erro ao salvar.');
        setSaving(false);
      },
    });
  };
  return (
    <LayoutBase
      description={`Personalize a tela "${PAGE_LABELS[pageKey] ?? pageKey}"`}
      rightComponent={
        <Button disabled={saving} onClick={handleSave}>
          <SaveIcon className="mr-2 size-4" />
          {saving ? 'Salvando...' : 'Publicar'}
        </Button>
      }
      tagTitle="Customização"
      titlePage={`Customizar: ${PAGE_LABELS[pageKey] ?? pageKey}`}
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-8">
        <aside className="col-span-2">
          <SettingsForm
            onChange={handleChange}
            schema={schema}
            settings={liveSettings as unknown as Record<string, unknown>}
          />
        </aside>

        <div className="max-h-[calc(100vh-12rem)] overflow-y-auto rounded-lg border bg-white p-4 col-span-6 hidden lg:block">
          <PreviewRenderer pageKey={pageKey} settings={liveSettings} />
        </div>
      </div>
    </LayoutBase>
  );
}
function PreviewRenderer({
  pageKey,
  settings,
}: {
  pageKey: string;
  settings: DashboardPageSettings;
}) {
  const previewSettings = settings as unknown as Record<string, unknown>;
  switch (pageKey) {
    case 'dashboard':
      return (
        <Dashboard
          alerts={PREVIEW_MOCK.dashboard.alerts as []}
          chartData={PREVIEW_MOCK.dashboard.chartData}
          previewSettings={previewSettings}
          statsCards={PREVIEW_MOCK.dashboard.statsCards}
          topItems={PREVIEW_MOCK.dashboard.topItems}
          hideHeader
        />
      );
    case 'home':
      return <Home previewSettings={previewSettings} />;
    case 'login':
      return (
        <Login  
          canResetPassword={false}
          previewSettings={previewSettings}
          status=""
        />
      );
    case 'familia':
      return <FamilyPreview previewSettings={previewSettings} />;
    case 'beneficios':
      return <BeneficiosPreview previewSettings={previewSettings} />;
    default:
      return (
        <p className="text-muted-foreground text-sm">Preview não disponível</p>
      );
  }
}
function FamilyPreview({
  previewSettings,
}: {
  previewSettings: Record<string, unknown>;
}) {
  const texts = (previewSettings?.texts as Record<string, string>) ?? {};
  return (
    <div className="space-y-4">
      <h1 className="text-heading text-xl font-bold">
        {texts.page_title ?? 'Gestão de Famílias'}
      </h1>
      <p className="text-muted-foreground text-sm">
        {texts.page_description} — Preview
      </p>
      <div className="bg-muted flex h-32 items-center justify-center rounded text-sm text-gray-400">
        [Listagem de famílias — preview]
      </div>
    </div>
  );
}
function BeneficiosPreview({
  previewSettings,
}: {
  previewSettings: Record<string, unknown>;
}) {
  const texts = (previewSettings?.texts as Record<string, string>) ?? {};
  return (
    <div className="space-y-4">
      <h1 className="text-heading text-xl font-bold">
        {texts.section_title ?? 'Controle de Estoque'}
      </h1>
      <p className="text-muted-foreground text-sm">
        {texts.section_subtitle} — Preview
      </p>
      <div className="bg-muted flex h-32 items-center justify-center rounded text-sm text-gray-400">
        [Tabela de benefícios — preview]
      </div>
    </div>
  );
}
