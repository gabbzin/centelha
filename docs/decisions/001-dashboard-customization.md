# Decisão 001 — Arquitetura do Painel de Customização (Dashboard)

## Contexto

Iniciando a implementação do **Painel de Customização por tela**, começando pelo
Dashboard como piloto (conforme `docs/superpowers/specs/2026-06-11-dashboard-customization.md`).

O objetivo é permitir que o Gestor altere textos, ative/desative widgets e
configure regras do Dashboard sem precisar de deploy.

## Arquitetura Geral

```
config/pages/{pageKey}.php              ← valores padrão (fallback)
config/pages/schemas/{pageKey}.php      ← schema do formulário de edição
         │
         ▼
HandleInertiaRequests (middleware)
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

## Decisões Tomadas

### 1. Onde salvar as settings?
No campo `settings` (JSON) da tabela `community_center`, na chave `$pageKey`.
Ex: `settings['dashboard']`, `settings['family']`, etc.
O model `CommunityCenter` já possui `$casts = ['settings' => 'array']`.

### 2. Endpoint de salvamento
`PUT /gestao-sistema/customizacao-tela/{pageKey}`
→ Controller salva em `community_center->settings[$pageKey] = $data`.

### 3. Rotas da página de customização
- `GET /gestao-sistema/customizacao-tela` → Página que lista telas disponíveis
  (inicialmente só Dashboard)
- `GET /gestao-sistema/customizacao-tela/{pageKey}` → Formulário com preview

### 4. PageKey mapping
```
'dashboard'  → 'dashboard'
```
Array de mapeamento fica no middleware `HandleInertiaRequests`.

### 5. Preview ao vivo
Usa os dados mockados do `DashboardController`, apenas trocando textos via
`pageSettings`. Preview reflete alterações em tempo real via estado local React.

### 6. Escopo inicial
Apenas Dashboard (piloto). Demais telas depois.

## Status da Implementação

### ✅ Concluído
- [x] `config/pages/dashboard.php` (valores padrão)
- [x] `config/pages/schemas/dashboard.php` (schema do formulário)
- [x] Modificar `HandleInertiaRequests` para carregar + fundir settings
- [x] Controller `PageCustomizationController` + 3 rotas (index, show, update)
- [x] Componente `SettingsForm` (React) — genérico, renderiza boolean/string/number
- [x] Página `customizacao-tela/index.tsx` — lista telas disponíveis
- [x] Página `customizacao-tela/edit.tsx` — formulário + preview ao vivo
- [x] Dashboard adaptado: usa `pageSettings` para textos e visibilidade condicional
- [x] Tipos TypeScript atualizados: `DashboardPageSettings`, `SchemaField`, `SchemaSection`, `PageSchema`, `SharedData.pageSettings`

### ⏳ Pendente
- [ ] Expandir para outras telas (futuro)
