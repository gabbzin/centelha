# Módulo de Dashboard

## Índice

- [Regras de Negócio (RNs)](#regras-de-negócio-rns)
- [Fluxo Principal 09 — Visualizar Dashboard](#fluxo-principal-09--visualizar-dashboard)
  - [Seção 1 — Cards de Métricas](#seção-1--cards-de-métricas)
  - [Seção 2 — Mapa de Distribuição](#seção-2--mapa-de-distribuição)
  - [Seção 3 — Gráfico Comparativo](#seção-3--gráfico-comparativo)
  - [Seção 4 — Alertas de Estoque](#seção-4--alertas-de-estoque)
  - [Seção 5 — Top Itens em Estoque](#seção-5--top-itens-em-estoque)
- [Fluxo Alternativo 12 — Selecionar período](#fluxo-alternativo-12--selecionar-período)
- [Fluxo de Exceção 07 — Widget desabilitado na customização](#fluxo-de-exceção-07--widget-desabilitado-na-customização)

---

## Regras de Negócio (RNs)

| RN | Título | Descrição |
| :---: | :--- | :--- |
| RN75 | Monitoramento Estatístico | O dashboard exibe indicadores de entregas, famílias atendidas e variação percentual. |
| RN76 | Alertas de Inventário | Benefícios com estoque baixo são destacados com níveis de alerta (atenção ou crítico). |
| RN77 | Ranking de Distribuição | O sistema apresenta ranking dos benefícios mais distribuídos com suas respectivas quantidades. |
| RN87 | Seletor de Período | O dashboard permite ao usuário selecionar o mês de referência para visualização dos dados. |
| RN88 | Mapa de Distribuição | O dashboard exibe um mapa geográfico indicando a distribuição das famílias atendidas. |
| RN89 | Gráfico Comparativo | O dashboard exibe gráfico comparativo de entregas por categoria entre o mês atual e o mês anterior. |

---

## Fluxo Principal 09 — Visualizar Dashboard

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---: | :--- | :---: | :---: | :---: |
| 1 | Usuário autenticado acessa `/dashboard` | | RN13 | |
| 2 | Sistema carrega as configurações de customização da tela de Dashboard | | RN85 | |
| 3 | Sistema carrega os dados dos indicadores (cards, alertas, gráfico, top itens) | | RN62 | |
| 4 | Sistema renderiza o dashboard respeitando a visibilidade dos widgets configurada na customização | FE07 | RN82 | |
| 5 | Sistema exibe seletor de período no topo da página (dropdown com meses disponíveis) | | RN87 | |

### Seção 1 — Cards de Métricas

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---: | :--- | :---: | :---: | :---: |
| 1 | Sistema exibe três cards lado a lado (empilhados em mobile): | | | |
| 1a | Card "Benefícios Entregues" com valor total e variação percentual | | RN75 | |
| 1b | Card "Famílias Atendidas" com valor total e variação percentual | | RN75 | |
| 1c | Card "Novos Cadastros" com valor total e variação percentual | | RN75 | |
| 2 | Variação percentual exibida em verde (positiva) ou vermelho (negativa) | | | |

### Seção 2 — Mapa de Distribuição

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---: | :--- | :---: | :---: | :---: |
| 1 | Sistema exibe card com título configurável (padrão: "Mapa de Distribuição") | | RN88 | |
| 2 | Sistema renderiza mapa geográfico com marcadores das famílias atendidas | | | |

### Seção 3 — Gráfico Comparativo

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---: | :--- | :---: | :---: | :---: |
| 1 | Sistema exibe card com título configurável e legenda (Mês Anterior / Mês Atual) | | RN89 | |
| 2 | Sistema renderiza gráfico de barras comparando entregas por categoria entre os dois períodos | | | |

### Seção 4 — Alertas de Estoque

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---: | :--- | :---: | :---: | :---: |
| 1 | Sistema exibe card "Alertas de baixo estoque" | | RN76 | |
| 2 | Sistema lista benefícios com quantidade abaixo do limite configurado: | | | |
| 2a | Nível "atenção" (badge amarelo) — quantidade próxima do limite | | | |
| 2b | Nível "crítico" (badge vermelho) — quantidade muito abaixo do limite | | | |

### Seção 5 — Top Itens em Estoque

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---: | :--- | :---: | :---: | :---: |
| 1 | Sistema exibe card "Top itens em estoque" com ranking dos benefícios mais distribuídos | | RN77 | |
| 2 | Cada item exibe nome, quantidade e barra de progresso percentual | | | |

---

## Fluxo Alternativo 12 — Selecionar período

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---: | :--- | :---: | :---: | :---: |
| 1 | Usuário clica no seletor de período no topo da página | FP09 | | |
| 2 | Sistema exibe dropdown com lista de meses disponíveis | | | |
| 3 | Usuário seleciona um mês | | | |
| 4 | Sistema recarrega os dados dos indicadores para o período selecionado | | RN87 | |
| 5 | Sistema atualiza todos os widgets com os novos dados | | | |

---

## Fluxo de Exceção 07 — Widget desabilitado na customização

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---: | :--- | :---: | :---: | :---: |
| 1 | No passo 4 do FP09, um ou mais widgets estão desabilitados nas configurações de customização | FP09 | RN82 | |
| 2 | Sistema não renderiza o widget desabilitado | | | |
| 3 | Os demais widgets ajustam-se dinamicamente no layout para ocupar o espaço | | | |

---

## Anexo — Mapa de Widgets do Dashboard

| Widget | Chave | Tipo | Padrão | Descrição |
| :--- | :--- | :--- | :---: | :--- |
| Cards de Métricas | `widgets.metrics_cards` | boolean | `true` | Exibe/oculta os 3 cards de indicadores |
| Mapa de Distribuição | `widgets.heat_map` | boolean | `true` | Exibe/oculta o mapa geográfico |
| Alertas de Estoque | `widgets.stock_alerts` | boolean | `true` | Exibe/oculta os alertas de baixo estoque |
| Gráfico Comparativo | `widgets.comparison_chart` | boolean | `true` | Exibe/oculta o gráfico de barras |
| Seletor de Período | `widgets.period_selector` | boolean | `true` | Exibe/oculta o dropdown de seleção de mês |
