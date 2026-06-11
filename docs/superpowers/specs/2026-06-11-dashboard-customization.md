# Dashboard Customization — Design Document

> **Piloto do sistema de customização dinâmica de telas.**
> Implementa o painel de customização para o Dashboard, validando a arquitetura
> antes de expandir para as demais telas.

## Arquitetura Geral

```
config/pages/{pageKey}.php          ← valores padrão (fallback)
config/pages/schemas/{pageKey}.php  ← schema do formulário de edição
         │
         ▼
HandleInertiaRequestsMiddleware
  → Lê route name → descobre pageKey
  → Carrega defaults + funde com community_centers.settings[$pageKey]
  → Compartilha via SharedData como pageSettings
         │
         ▼
React (usePage<SharedData>().props.pageSettings)
  → Renderização condicional (widgets.*)
  → Textos dinâmicos (texts.*)
  → Regras injetadas (rules.*)
```

### Fluxo de Customização

```
Admin acessa /gestao-sistema → "Painel de Customização por tela"
  → Seleciona "Dashboard"
  → Sidebar com formulário gerado pelo schema (live edit)
  → Preview do Dashboard reflete alterações em tempo real
  → "Publicar" → PUT/PATCH salva settings no banco
```

## 1. Config Defaults

**Arquivo:** `config/pages/dashboard.php`

```php
<?php

return [
    'widgets' => [
        'metrics_cards' => true,
        'heat_map' => true,
        'stock_alerts' => true,
        'comparison_chart' => true,
        'period_selector' => true,
    ],
    'texts' => [
        'main_title' => 'Visão Geral do Dashboard',
        'subtitle' => 'Acompanhamento estratégico das operações da Centelha',
        'label_card_1' => 'Benefícios Entregues',
        'label_card_2' => 'Famílias Atendidas',
        'label_card_3' => 'Novos Cadastros',
        'map_title' => 'Mapa de Distribuição',
        'alert_card_title' => 'Alertas de baixo estoque',
        'top_items_title' => 'Top itens em estoque',
        'chart_title' => 'Comparativo de Entregas por Categoria (Mês Atual x Anterior)',
        'chart_label_previous' => 'Mês anterior',
        'chart_label_current' => 'Mês atual',
    ],
    'rules' => [
        'low_stock_limit' => 50,
    ],
];
```

## 2. Schema do Formulário

**Arquivo:** `config/pages/schemas/dashboard.php`

```php
<?php

return [
    'sections' => [
        [
            'title' => 'Visibilidade dos Widgets',
            'description' => 'Ativa ou desativa seções inteiras do Dashboard',
            'fields' => [
                [
                    'key' => 'widgets.metrics_cards',
                    'label' => 'Cards de métricas',
                    'type' => 'boolean',
                ],
                [
                    'key' => 'widgets.heat_map',
                    'label' => 'Mapa de distribuição',
                    'type' => 'boolean',
                ],
                [
                    'key' => 'widgets.stock_alerts',
                    'label' => 'Alertas de baixo estoque',
                    'type' => 'boolean',
                ],
                [
                    'key' => 'widgets.comparison_chart',
                    'label' => 'Gráfico comparativo',
                    'type' => 'boolean',
                ],
            ],
        ],
        [
            'title' => 'Textos da Página',
            'fields' => [
                ['key' => 'texts.main_title', 'label' => 'Título principal', 'type' => 'string', 'max' => 100],
                ['key' => 'texts.subtitle', 'label' => 'Subtítulo', 'type' => 'string', 'max' => 200],
                ['key' => 'texts.label_card_1', 'label' => 'Card Benefícios', 'type' => 'string', 'max' => 50],
                ['key' => 'texts.label_card_2', 'label' => 'Card Famílias', 'type' => 'string', 'max' => 50],
                ['key' => 'texts.label_card_3', 'label' => 'Card Cadastros', 'type' => 'string', 'max' => 50],
                ['key' => 'texts.map_title', 'label' => 'Título do mapa', 'type' => 'string', 'max' => 100],
                ['key' => 'texts.chart_title', 'label' => 'Título do gráfico', 'type' => 'string', 'max' => 100],
                ['key' => 'texts.chart_label_previous', 'label' => 'Label mês anterior', 'type' => 'string', 'max' => 50],
                ['key' => 'texts.chart_label_current', 'label' => 'Label mês atual', 'type' => 'string', 'max' => 50],
            ],
        ],
        [
            'title' => 'Regras de Negócio',
            'fields' => [
                [
                    'key' => 'rules.low_stock_limit',
                    'label' => 'Limite para alerta de estoque baixo',
                    'type' => 'number',
                    'min' => 1,
                    'max' => 999,
                ],
            ],
        ],
    ],
];
```

## 3. Middleware — HandleInertiaRequests

Modificar o middleware existente para:

1. Descobrir a `pageKey` a partir do route name (ex: `dashboard` → `dashboard`, `family` → `familia`)
2. Carregar os defaults de `config/pages/{pageKey}.php`
3. Ler `community_centers.settings[$pageKey]` do banco
4. Fundir (banco sobrescreve defaults)
5. Compartilhar como `pageSettings` no SharedData

**Caso o route name não seja mapeado:** não compartilha nada (evita erro em páginas não-customizáveis).

## 4. Model — CommunityCenter

Adicionar cast no modelo se ainda não existir:

```php
protected function settings(): Attribute
{
    return Attribute::make(
        get: fn ($value) => json_decode($value ?? '{}', true),
        set: fn ($value) => json_encode($value),
    );
}
```

## 5. Frontend — Componente SettingsForm

Componente React genérico que recebe um schema e renderiza os campos:

- `boolean` → Toggle/Switch
- `string` → Input text (com maxLength)
- `number` → Input number (com min/max)

Opera sobre um estado local (`liveSettings`), permitindo preview instantâneo.
Ao salvar, envia apenas a seção alterada (ex: `dashboard`) via PUT para o backend.

## 6. Frontend — Dashboard adaptado

O `dashboard.tsx` passa a usar `usePage<SharedData>().props.pageSettings`:

```tsx
const { pageSettings } = usePage<SharedData>().props;
const { widgets, texts, rules } = pageSettings;

// Renderização condicional
{widgets.metrics_cards && (
  <section>...<StatsCard title={texts.label_card_1} ... /></section>
)}
{widgets.heat_map && (
  <Card><CardTitle>{texts.map_title}</CardTitle><Map /></Card>
)}
```

## 7. Próximos passos

Após o piloto do Dashboard validado:
1. Criar schemas para as demais telas (Benefícios, Família, Login, Home)
2. Adaptar cada página para usar `pageSettings`
3. Implementar endpoint de salvamento (PUT /settings/{pageKey})

## Arquivos envolvidos

| Arquivo | Ação |
|---------|------|
| `config/pages/dashboard.php` | CRIAR |
| `config/pages/schemas/dashboard.php` | CRIAR |
| `config/pages/schemas/_fields.php` | CRIAR (constantes de tipos, se necessário) |
| `app/Http/Middleware/HandleInertiaRequests.php` | MODIFICAR |
| `app/Models/CommunityCenter.php` | MODIFICAR (cast settings) |
| `app/resources/js/types/index.ts` | MODIFICAR (adicionar pageSettings ao SharedData) |
| `app/resources/js/pages/dashboard.tsx` | MODIFICAR (usar pageSettings) |
| `app/resources/js/components/customization/settings-form.tsx` | CRIAR |
| `app/resources/js/components/dashboard/alert-card.tsx` | MODIFICAR (usar limit do settings) |
