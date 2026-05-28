# Arquitetura de Customização Dinâmica (White-label e Page Builder)

Este documento descreve a arquitetura definida para a funcionalidade de personalização de telas do sistema Centelha, permitindo que cada Centro Comunitário ajuste a interface (textos, visibilidade de componentes e regras de negócio) de acordo com sua realidade.

## 1. Visão Geral
A customização tem impacto **Global** por Centro Comunitário. Ou seja, as alterações feitas pelo Gestor refletem para todos os usuários (Operadores e Gestores) vinculados àquela instituição. O objetivo é garantir a padronização da comunicação interna daquele centro.

## 2. Modelagem de Dados (Banco de Dados)
Foi escolhida a **Abordagem JSON** devido à sua flexibilidade e adequação ao uso combinado do frontend em JavaScript (React) com o backend em Laravel.

*   **Tabela Alvo:** Tabela do Centro Comunitário (ex: `community_centers`).
*   **Nova Coluna:** `settings` (tipo `json`, nullable).

### Exemplo de Estrutura do JSON:
```json
{
  "theme": {
    "primary_color": "#0056b3",
    "logo_url": null
  },
  "dashboard": {
    "widgets": {
      "metrics_cards": true,
      "heat_map": true,
      "stock_alerts": true,
      "comparison_chart": true
    },
    "texts": {
      "main_title": "Visão Geral do Dashboard",
      "subtitle": "Acompanhamento estratégico das operações da Centelha.",
      "label_card_1": "Benefícios Entregues",
      "label_card_2": "Famílias Atendidas",
      "label_card_3": "Novos Cadastros",
      "map_title": "Mapa de Distribuição",
      "chart_title": "Comparativo por Categoria"
    },
    "rules": {
      "low_stock_limit": 50
    }
  }
}
```

## 3. Comportamento do Backend (Laravel)
O Laravel facilita a manipulação de JSON utilizando o recurso de **Eloquent Casting**.

*   **Model:** O modelo do Centro Comunitário deve conter o cast para tratar o campo como array no PHP:
    ```php
    protected $casts = [
        'settings' => 'array',
    ];
    ```
*   **Padrão de Fábrica (Fallback):** O backend deve possuir um arquivo de configuração com o array padrão (Default Settings). Quando o frontend requisitar a tela, o Laravel faz o *merge* das configurações salvas no banco com o padrão de fábrica. Assim, se uma chave não existir no banco, o sistema não quebra e exibe o padrão.
*   **Ações:**
    *   `Publicar Alterações`: Recebe o objeto JSON do React e atualiza a coluna `settings`.
    *   `Restaurar Padrão`: Limpa os dados do JSON referente àquela tela no banco de dados, forçando o sistema a usar o Padrão de Fábrica.

## 4. Comportamento do Frontend (React / Inertia.js)
O frontend deixará de utilizar textos e renderizações fixas ("chumbadas") no código para as telas customizáveis.

*   A página receberá o objeto de configurações via `props` do Inertia.
*   **Textos Dinâmicos:** Exemplo: `<h1>{settings.dashboard.texts.main_title}</h1>`.
*   **Renderização Condicional:** Exemplo: `{settings.dashboard.widgets.heat_map && <HeatMapComponent />}`.
*   **Regras de Negócio Injetadas:** Exemplo, passar o limite de estoque para o componente de alerta: `<StockAlert limit={settings.dashboard.rules.low_stock_limit} />`.
## 5. Arquitetura de "Live Preview" no Frontend

A interface de customização adotará uma arquitetura de "Live Preview" nativa, onde as alterações feitas pelo Gestor refletem em tempo real na tela, antes de serem publicadas.

### Características Principais
*   **Sem Bibliotecas Externas ou Iframes:** A solução **não** utilizará ferramentas de terceiros (como construtores de páginas/Page Builders) ou elementos `<iframe>` para isolamento de contexto.
*   **Gerenciamento de Estado Nativo:** Toda a sincronização de dados entre o formulário de edição e a visualização acontecerá nativamente via React State (`useState`).
*   **Componente Pai Integrador:** Existirá um componente pai (Wrapper) responsável por deter o estado atual das configurações (um espelho do JSON editável). Este estado é repassado simultaneamente para dois elementos da interface:
    *   **Sidebar (Controles):** Formulário de controles onde o usuário edita textos, cores, chaves booleanas e visibilidade de componentes.
    *   **Painel de Preview (Visualização):** Área que reutiliza os componentes reais do sistema (Dashboard, Tela de Famílias, etc.), injetando o estado recém-alterado para refletir as mudanças instantaneamente.
*   **Renderização Dinâmica:** A alternância de qual tela está sendo exibida/editada no preview será feita por renderização dinâmica.

### Exemplo Conceitual (React)

```jsx
import React, { useState } from 'react';
import SidebarEditor from './SidebarEditor';
import DashboardScreen from '../screens/Dashboard';
import FamilyScreen from '../screens/Family';
import LoginScreen from '../screens/Login';

export default function CustomizationBuilder({ defaultSettings }) {
  // Estado que guarda as alterações em tempo real
  const [liveSettings, setLiveSettings] = useState(defaultSettings);
  
  // Controle de qual tela está sendo editada/visualizada no momento
  const [currentScreen, setCurrentScreen] = useState('dashboard');

  // Função dinâmica para renderizar a tela selecionada no painel de preview
  const renderPreview = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <DashboardScreen settings={liveSettings.dashboard} />;
      case 'familia':
        return <FamilyScreen settings={liveSettings.familia} />;
      case 'login':
        return <LoginScreen settings={liveSettings.login} />;
      default:
        return <div>Selecione uma tela para editar</div>;
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar com formulários de edição passados por props */}
      <div className="w-1/4 bg-gray-100 p-4 border-r">
        <SidebarEditor 
          currentScreen={currentScreen}
          onChangeScreen={setCurrentScreen}
          settings={liveSettings} 
          onUpdateSettings={setLiveSettings} 
        />
      </div>

      {/* Painel de Preview renderizando os componentes originais */}
      <div className="w-3/4 p-8 bg-gray-300 overflow-y-auto">
        <div className="bg-white shadow-xl border rounded">
          {renderPreview()}
        </div>
      </div>
    </div>
  );
}
```
