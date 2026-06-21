# Módulo de Entrega de Benefício

## Índice

- [Regras de Negócio (RNs)](#regras-de-negócio-rns)
- [Mensagens (MSGs)](#mensagens-msgs)
- [Fluxo Principal 04 — Visualizar Histórico de Entregas](#fluxo-principal-04--visualizar-histórico-de-entregas)
  - [Fluxo Alternativo 05 — Buscar entrega por texto](#fluxo-alternativo-05--buscar-entrega-por-texto)
  - [Fluxo Alternativo 06 — Filtrar por período](#fluxo-alternativo-06--filtrar-por-período)
  - [Fluxo Alternativo 07 — Exportar PDF da listagem](#fluxo-alternativo-07--exportar-pdf-da-listagem)
- [Fluxo Principal 05 — Registrar nova entrega](#fluxo-principal-05--registrar-nova-entrega)
  - [Fluxo Alternativo 08 — Beneficiário não encontrado](#fluxo-alternativo-08--beneficiário-não-encontrado)
  - [Fluxo Alternativo 09 — Estoque insuficiente](#fluxo-alternativo-09--estoque-insuficiente)
  - [Fluxo de Exceção 03 — Entrega duplicada no período](#fluxo-de-exceção-03--entrega-duplicada-no-período)
  - [Fluxo de Exceção 04 — Arquivo de comprovante inválido](#fluxo-de-exceção-04--arquivo-de-comprovante-inválido)
- [Fluxo Principal 06 — Visualizar detalhes da entrega](#fluxo-principal-06--visualizar-detalhes-da-entrega)
  - [Fluxo Alternativo 10 — Exportar PDF individual](#fluxo-alternativo-10--exportar-pdf-individual)

---

## Regras de Negócio (RNs)

| RN | Título | Descrição |
| :---: | :--- | :--- |
| RN55 | Multiplicidade de Entrega | Uma Família pode receber múltiplos benefícios. |
| RN56 | Atribuição Operacional | Os operadores podem vincular benefícios às famílias. |
| RN57 | Disponibilidade de Saldo | Um benefício somente poderá ser entregue se houver saldo disponível em estoque. |
| RN58 | Histórico de Distribuição | Toda entrega de benefício deve gerar um registro permanente no histórico. |
| RN59 | Auditoria de Entrega | O sistema deve registrar data, hora e usuário responsável por cada entrega. |
| RN60 | Auditoria de Estoque | Toda alteração de estoque deve gerar registro de auditoria. |
| RN61 | Prevenção de Duplicidade | O sistema deve impedir entregas duplicadas do mesmo benefício para a mesma família em período configurável. |
| RN78 | Código de Entrega | O código da entrega deve ser único e gerado automaticamente no formato "ENT-" seguido de número sequencial de 4 dígitos (ex.: ENT-0001). |
| RN79 | Local de Retirada | O local de retirada é de preenchimento obrigatório no momento da entrega. |
| RN80 | Comprovante de Entrega | A entrega pode ter um comprovante anexado nos formatos PNG, JPG ou PDF, com tamanho máximo de 5 MB. |
| RN81 | Irretratabilidade de Entrega | Uma entrega não pode ser editada nem excluída após registrada. Ajustes de estoque devem ser feitos manualmente. |

---

## Mensagens (MSGs)

| Código | Mensagem Exibida ao Usuário |
| :---: | :--- |
| **MSG-20** | Entrega confirmada com sucesso! |
| **MSG-21** | Estoque insuficiente para este benefício. |
| **MSG-22** | Esta família já recebeu este benefício no período vigente. |
| **MSG-23** | Nenhum beneficiário encontrado para a busca. |
| **MSG-24** | Nenhuma entrega encontrada no período selecionado. |
| **MSG-25** | Arquivo inválido. Formatos aceitos: PNG, JPG, PDF (máx. 5MB). |

---

## Fluxo Principal 04 — Visualizar Histórico de Entregas

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---: | :--- | :---: | :---: | :---: |
| 1 | Usuário autenticado acessa a página de entregas | | RN04, RN56 | |
| 2 | Sistema carrega entregas com dados da família, benefício e responsável | | RN73 | |
| 3 | Sistema exibe tabela com colunas: Nº Entrega, Data, Benefício, Quantidade, Local de Retirada, Status, Entregue Por | | | |
| 4 | Sistema exibe campo de busca textual com placeholder "Buscar por benefício, data, local..." | FA05 | | |
| 5 | Sistema exibe filtro de período com dois date pickers: "Período De / Até" | FA06 | | |
| 6 | Sistema exibe botão dropdown "Exportar PDF" com opções "Mês Atual" e "Período Selecionado" | FA07 | RN74 | |
| 7 | Sistema exibe paginação no rodapé (8 registros por página) | | RN73 | |

### Fluxo Alternativo 05 — Buscar entrega por texto

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---: | :--- | :---: | :---: | :---: |
| 1 | Usuário digita no campo de busca | FP04 | | |
| 2 | Sistema filtra entregas por benefício, data ou local | | | |
| 3 | Sistema atualiza a listagem com os resultados | | | |
| 4 | Se nenhum resultado encontrado, sistema exibe listagem vazia | | | MSG-24 |

### Fluxo Alternativo 06 — Filtrar por período

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---: | :--- | :---: | :---: | :---: |
| 1 | Usuário seleciona datas nos campos "De" e "Até" | FP04 | | |
| 2 | Sistema filtra entregas pelo intervalo de datas informado | | | |
| 3 | Sistema atualiza a listagem com os resultados | | | |
| 4 | Se nenhuma entrega encontrada no período, sistema exibe listagem vazia | | | MSG-24 |

### Fluxo Alternativo 07 — Exportar PDF da listagem

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---: | :--- | :---: | :---: | :---: |
| 1 | Usuário clica no botão "Exportar PDF" | FP04 | | |
| 2 | Sistema exibe dropdown com opções "Mês Atual" e "Período Selecionado" | | | |
| 3 | Usuário seleciona uma das opções | | | |
| 4 | Sistema gera arquivo PDF com os dados filtrados | | RN74 | |
| 5 | Sistema realiza download do arquivo | | | |

---

## Fluxo Principal 05 — Registrar nova entrega

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---: | :--- | :---: | :---: | :---: |
| 1 | Usuário clica em "Nova Entrega" | | RN56 | |
| 2 | Sistema exibe modal com formulário de cadastro | | | |
| 3 | Usuário informa busca no campo "Seleção do Beneficiário" por CPF, Nome ou NIS | | | |
| 4 | Sistema exibe resultados da busca | FA08 | | |
| 5 | Usuário seleciona o beneficiário desejado | | | |
| 6 | Usuário seleciona "Tipo de Benefício" no campo select | | | |
| 7 | Usuário informa a "Quantidade" utilizando stepper numérico (padrão: 1) | | RN57 | |
| 8 | Usuário informa a "Data da Entrega" no date picker | | | |
| 9 | Usuário seleciona o "Local de Retirada" no campo select | | RN79 | |
| 10 | Sistema preenche automaticamente o campo "Responsável pela Entrega" com o usuário logado (não editável) | | RN59 | |
| 11 | Usuário pode preencher "Observações Adicionais" (campo opcional) | | | |
| 12 | Usuário pode anexar "Comprovante de Entrega" (PNG, JPG ou PDF, máx. 5MB) | FE04 | RN80 | |
| 13 | Usuário clica em "Confirmar Entrega" | | | |
| 14 | Sistema valida todos os campos obrigatórios | | | |
| 15 | Sistema verifica disponibilidade em estoque | FA09 | RN57 | |
| 16 | Sistema verifica se já existe entrega do mesmo benefício para a mesma família no período configurado | FE03 | RN61 | |
| 17 | Sistema persiste a entrega no banco de dados | | RN58 | |
| 18 | Sistema decrementa a quantidade do estoque do benefício | | RN60 | |
| 19 | Sistema exibe toast de sucesso | | | MSG-20 |
| 20 | Sistema atualiza a listagem de entregas | FP04 | | |

### Fluxo Alternativo 08 — Beneficiário não encontrado

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---: | :--- | :---: | :---: | :---: |
| 1 | No passo 4 do FP05, a busca não retorna nenhum resultado | FP05 | | |
| 2 | Sistema exibe mensagem informativa | | | MSG-23 |
| 3 | Usuário pode refinar a busca ou cancelar a operação | | | |

### Fluxo Alternativo 09 — Estoque insuficiente

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---: | :--- | :---: | :---: | :---: |
| 1 | No passo 15 do FP05, sistema detecta que a quantidade solicitada excede o estoque disponível | FP05 | RN57 | |
| 2 | Sistema exibe mensagem de erro | | | MSG-21 |
| 3 | Sistema permanece no modal com os dados preenchidos | | | |

### Fluxo de Exceção 03 — Entrega duplicada no período

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---: | :--- | :---: | :---: | :---: |
| 1 | No passo 16 do FP05, sistema detecta que o mesmo benefício já foi entregue à mesma família no período configurado | FP05 | RN61 | |
| 2 | Sistema exibe mensagem de erro | | | MSG-22 |
| 3 | Sistema permanece no modal com os dados preenchidos | | | |

### Fluxo de Exceção 04 — Arquivo de comprovante inválido

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---: | :--- | :---: | :---: | :---: |
| 1 | No passo 12 do FP05, usuário anexa arquivo em formato não permitido ou acima do tamanho máximo | FP05 | RN80 | |
| 2 | Sistema exibe mensagem de erro | | | MSG-25 |
| 3 | Sistema permanece no modal com os demais dados preservados | | | |

---

## Fluxo Principal 06 — Visualizar detalhes da entrega

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---: | :--- | :---: | :---: | :---: |
| 1 | Usuário clica em uma linha da listagem de entregas | FP04 | | |
| 2 | Sistema exibe modal de detalhes da entrega | | | |
| 3 | Sistema exibe cabeçalho com número da entrega (#ENT-XXXX), data e hora de realização | | RN78 | |
| 4 | Sistema exibe card "Família Beneficiária" com nome, protocolo, endereço completo e membros vinculados | | | |
| 5 | Sistema exibe card "Status da Operação" com badge de status e nome do responsável | | RN59 | |
| 6 | Sistema exibe tabela "Itens da Entrega" com colunas: Cód. Item, Descrição do Benefício, Quantidade, Local de Retirada | | | |
| 7 | Sistema exibe seção "Observações do Agente" com texto registrado | | | |
| 8 | Sistema exibe rodapé com data da última atualização e responsável | | RN59 | |
| 9 | Sistema exibe botão "Imprimir PDF" no topo direito do modal | FA10 | RN74 | |
| 10 | Sistema exibe botão "Fechar" | | | |

### Fluxo Alternativo 10 — Exportar PDF individual

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---: | :--- | :---: | :---: | :---: |
| 1 | No modal de detalhes, usuário clica em "Imprimir PDF" | FP06 | | |
| 2 | Sistema gera arquivo PDF com os dados completos da entrega | | RN74 | |
| 3 | Sistema realiza download do arquivo | | | |
