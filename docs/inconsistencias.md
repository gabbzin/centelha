# Relatório de Inconsistências: Documentação vs. Design (Figma)

Este documento lista as discrepâncias encontradas entre a versão original do documento de requisitos (`documentacao.md`) e as telas desenhadas no Figma (armazenadas em `docs/telas/`). 

As divergências apontam detalhes que estavam descritos na documentação mas não existem no design, ou recursos que foram desenhados no Figma mas haviam sido esquecidos no texto.

### 1. Tela de Gestão de Famílias (Beneficiários)
* **Botão de Edição vs Visualização:** A documentação exigia um botão chamado "Editar" abaixo de cada família para visualizar e editar os dados. No Figma, esse botão foi projetado como **"VER INFORMAÇÕES"**.
* **Exclusão Rápida:** A tela do Figma apresenta um botão direto de lixeira (excluir) ao lado do botão de informações no próprio card da família. A documentação original não citava esse atalho de exclusão na listagem.
* **Filtros e Buscas:** A tela do Figma possui uma barra de busca robusta (por família, CPF ou protocolo) e um botão de filtro. A documentação não previa busca para essa tela.
* **Dados no Card:** O Figma inclui um "Protocolo" (ex: #2024-8842) e uma "Tag de Status" (Ativo, Aguardando, Inativo) para cada família. A documentação original não mencionava a existência de números de protocolo nem a exibição visual desse status na listagem.
* **Paginação:** O design inclui navegação por páginas no rodapé, o que não havia sido documentado.

### 2. Tela de Cadastro de Famílias
* **Detalhamento de Saúde, Educação e Trabalho:** O rascunho de requisitos em imagem (`Formulário de cadastrar familia.png`) exige dados minuciosos dos membros, como: deficiência, doenças crônicas, medicação, escolaridade, frequência escolar e renda/situação de trabalho individual. A documentação original em texto omitiu totalmente esses dados, pedindo apenas um "Resumo da família" e "Renda total".
* **Cadastro de Dependentes na Etapa 1:** A documentação não detalhava como os dependentes seriam adicionados. O Figma mostra que o cadastro de membros adicionais (com CPF e parentesco) ocorre logo na Etapa 1, junto aos dados do responsável, além de incluir um campo de "Observações".
* **Etapa de Anexos:** A barra lateral de navegação no Figma prevê uma etapa "03 Anexos". A documentação não mencionava o upload ou anexação de arquivos.

### 3. Tela de Controle de Benefícios
* **Botões de Ação na Tabela:** A documentação previa apenas dois botões na listagem de benefícios ("Editar" e "Excluir"). O Figma apresenta três botões: Visualizar (ícone de olho), Editar (lápis) e Excluir (lixeira).
* **Busca e Filtro:** O Figma possui uma barra de "Buscar por benefícios..." e um dropdown para filtrar por "Todas as Categorias", funcionalidades que não estavam descritas no texto original.

### 4. Tela de Administração
* **Estrutura Modular:** A documentação descrevia a administração de forma genérica num único parágrafo (alterar logo, cores, textos, gerenciar usuários). O Figma estrutura essa tela de forma modular em 4 painéis distintos (cards): 
    1. Configurações Gerais
    2. Aparência
    3. Usuários e Permissões
    4. Painel de Customização por tela.

### 5. Outros Apontamentos
* **Dashboard:** A documentação cita um painel "Dashboard" para acompanhamento de métricas. É necessário verificar se o design completo contempla essa tela com os gráficos esperados, pois nas imagens principais focadas nos formulários/listagens ela não tem o mesmo nível de detalhamento.
* **Login (Lembrar de Mim):** A documentação exige um checkbox "Lembrar de Mim" e link de "Esqueceu sua senha". Será necessário validar a tela de login final para garantir que esses elementos foram desenhados.