# Módulo — Usuários e Tags de Benefício

## Índice

- [Regras de Negócio (RNs)](#regras-de-negócio-rns)
- [Mensagens (MSGs)](#mensagens-msgs)
- [Fluxo Principal 10 — Visualizar tela de Usuários e Tags](#fluxo-principal-10--visualizar-tela-de-usuários-e-tags)
  - [Seção 1 — Usuários Cadastrados](#seção-1--usuários-cadastrados)
  - [Seção 2 — Tags de Benefício](#seção-2--tags-de-benefício)
- [Fluxo Principal 11 — Cadastrar novo usuário](#fluxo-principal-11--cadastrar-novo-usuário)
  - [Fluxo Alternativo 13 — Buscar usuário por nome ou e-mail](#fluxo-alternativo-13--buscar-usuário-por-nome-ou-e-mail)
  - [Fluxo Alternativo 14 — Filtrar usuários por perfil](#fluxo-alternativo-14--filtrar-usuários-por-perfil)
  - [Fluxo de Exceção 08 — E-mail já cadastrado](#fluxo-de-exceção-08--e-mail-já-cadastrado)
  - [Fluxo de Exceção 09 — Senha do administrador incorreta](#fluxo-de-exceção-09--senha-do-administrador-incorreta)
- [Fluxo Principal 12 — Editar usuário](#fluxo-principal-12--editar-usuário)
- [Fluxo Principal 13 — Excluir usuário](#fluxo-principal-13--excluir-usuário)
- [Fluxo Principal 14 — Cadastrar nova tag de benefício](#fluxo-principal-14--cadastrar-nova-tag-de-benefício)
- [Fluxo Principal 15 — Editar tag de benefício](#fluxo-principal-15--editar-tag-de-benefício)
- [Fluxo Principal 16 — Excluir tag de benefício](#fluxo-principal-16--excluir-tag-de-benefício)

---

## Regras de Negócio (RNs)

| RN | Título | Descrição |
| :---: | :--- | :--- |
| RN03 | Definição de Perfis | O sistema deve possuir dois perfis de usuário: Gestor (Administrador) e Operador. |
| RN08 | Restrição de Auto-cadastro | O sistema não deve permitir o auto-cadastro de usuários na tela de login. |
| RN09 | Gestão de Usuários | A criação de novos usuários (Gestores ou Operadores) é uma funcionalidade exclusiva do perfil Gestor. |
| RN12 | Acesso a Configurações | Usuários do perfil Gestor podem acessar as páginas de configuração do sistema; usuários Operadores não. |
| RN90 | Tela Unificada | A gestão de usuários e tags de benefício deve estar em uma única tela chamada "Usuários e Tags", dividida em duas seções independentes. |
| RN91 | Cadastro de Usuário | O cadastro de usuário deve conter: nome, tipo de usuário, data de nascimento, e-mail e senha do administrador logado para confirmação. |
| RN92 | Exclusão de Usuário | A exclusão de um usuário é uma funcionalidade exclusiva do perfil Gestor e deve solicitar confirmação antes de ser executada. |
| RN93 | Tags de Benefício | O sistema deve permitir o gerenciamento de tags de benefício com nome, descrição, cor e ícone representativo, em seção nomeada "Tags de Benefício". |
| RN94 | Cor da Tag | Cada tag de benefício deve possuir uma cor selecionável a partir de uma paleta predefinida de 8 cores. |
| RN95 | Ícone da Tag | Cada tag de benefício pode possuir um ícone representativo selecionado a partir de uma lista de ícones disponíveis. |

---

## Mensagens (MSGs)

| Código | Mensagem Exibida ao Usuário |
| :---: | :--- |
| **MSG-28** | Cadastro concluído com sucesso! |
| **MSG-29** | E-mail já cadastrado no sistema. |
| **MSG-30** | Senha do administrador incorreta. |
| **MSG-31** | Todos os campos marcados com * são obrigatórios. |
| **MSG-32** | Usuário excluído com sucesso. |
| **MSG-33** | Tag excluída com sucesso. |

---

## Fluxo Principal 10 — Visualizar tela de Usuários e Tags

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---: | :--- | :---: | :---: | :---: |
| 1 | Usuário Gestor acessa a tela de Usuários e Tags | | RN09, RN12 | |
| 2 | Sistema exibe a tela dividida em duas seções independentes | | RN90 | |
| 3 | Sistema carrega listagem de usuários cadastrados | | | |
| 4 | Sistema carrega grid de tags de benefício | | RN93 | |

### Seção 1 — Usuários Cadastrados

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---: | :--- | :---: | :---: | :---: |
| 1 | Sistema exibe tabela com colunas: Usuário (avatar + nome + ID), E-mail, Perfil, Status, Último Acesso, Ações | | | |
| 2 | Sistema exibe badge de perfil (ex.: "Administrador", "Agente de Saúde") | | RN03 | |
| 3 | Sistema exibe badge de status: verde para "Ativo", laranja para "Inativo" | | | |
| 4 | Sistema exibe ícones de ação: editar (✏️) e excluir (🗑️) por linha | | | |
| 5 | Sistema exibe campo de busca textual com placeholder "Buscar por nomes ou e-mail..." | FA13 | | |
| 6 | Sistema exibe dropdown de filtro "Todos os perfis" | FA14 | | |
| 7 | Sistema exibe botão "+ Novo usuário" no topo direito | FP11 | RN09 | |

### Seção 2 — Tags de Benefício

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---: | :--- | :---: | :---: | :---: |
| 1 | Sistema exibe grid de cards de tags de benefício | | RN93 | |
| 2 | Cada card exibe: ícone colorido, nome da tag, descrição curta truncada | | | |
| 3 | Cada card exibe ícones de ação: editar (✏️) e excluir (🗑️) | | | |
| 4 | Sistema exibe botão "+ Nova Tag" no topo direito | FP14 | RN93 | |

---

## Fluxo Principal 11 — Cadastrar novo usuário

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---: | :--- | :---: | :---: | :---: |
| 1 | Usuário Gestor clica em "+ Novo usuário" | FP10 | RN09 | |
| 2 | Sistema exibe modal com formulário de cadastro | | | |
| 3 | Usuário preenche "Nome do Usuário" (texto, obrigatório) | | RN91 | |
| 4 | Usuário seleciona "Tipo de Usuário" (select, obrigatório) | | RN03 | |
| 5 | Usuário informa "Data de Nascimento" (date picker, obrigatório) | | RN91 | |
| 6 | Usuário informa "E-mail do Usuário" (e-mail, obrigatório) | | RN91 | |
| 7 | Usuário informa "Senha do Administrador" (senha, obrigatório — confirma identidade) | | RN91 | |
| 8 | Se algum campo obrigatório estiver vazio, sistema exibe mensagem de validação no formulário | | | MSG-31 |
| 9 | Usuário clica em "+ Adicionar novo usuário" | | | |
| 10 | Sistema valida se o e-mail informado já está cadastrado | FE08 | | |
| 11 | Sistema valida se a senha do administrador está correta | FE09 | | |
| 12 | Sistema persiste o novo usuário no banco de dados | | RN62 | |
| 13 | Sistema exibe toast de sucesso | | | MSG-28 |
| 14 | Sistema atualiza a listagem de usuários | | | |

### Fluxo Alternativo 13 — Buscar usuário por nome ou e-mail

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---: | :--- | :---: | :---: | :---: |
| 1 | Usuário digita no campo de busca textual | FP10 | | |
| 2 | Sistema filtra usuários por nome ou e-mail | | | |
| 3 | Sistema atualiza a listagem com os resultados | | | |

### Fluxo Alternativo 14 — Filtrar usuários por perfil

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---: | :--- | :---: | :---: | :---: |
| 1 | Usuário seleciona um perfil no dropdown de filtro | FP10 | | |
| 2 | Sistema filtra usuários pelo perfil selecionado | | | |
| 3 | Sistema atualiza a listagem com os resultados | | | |
| 4 | Opção "Todos os perfis" remove o filtro | | | |

### Fluxo de Exceção 08 — E-mail já cadastrado

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---: | :--- | :---: | :---: | :---: |
| 1 | No passo 10 do FP11, sistema detecta que o e-mail informado já pertence a outro usuário | FP11 | | |
| 2 | Sistema exibe mensagem de erro | | | MSG-29 |
| 3 | Sistema permanece no modal com os dados preenchidos | | | |

### Fluxo de Exceção 09 — Senha do administrador incorreta

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---: | :--- | :---: | :---: | :---: |
| 1 | No passo 11 do FP11, sistema detecta que a senha informada não corresponde à senha do administrador logado | FP11 | | |
| 2 | Sistema exibe mensagem de erro | | | MSG-30 |
| 3 | Sistema permanece no modal com os dados preenchidos | | | |

---

## Fluxo Principal 12 — Editar usuário

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---: | :--- | :---: | :---: | :---: |
| 1 | Usuário Gestor clica no ícone de editar (✏️) em um registro da listagem | FP10 | RN09 | |
| 2 | Sistema exibe modal com formulário pré-preenchido com dados do usuário | | | |
| 3 | Usuário altera os campos desejados | | | |
| 4 | Usuário informa "Senha do Administrador" para confirmar a alteração | | RN91 | |
| 5 | Usuário salva as alterações | | | |
| 6 | Sistema valida e persiste as alterações | | | |
| 7 | Sistema exibe toast de sucesso | | | MSG-28 |
| 8 | Sistema atualiza a listagem | | | |

---

## Fluxo Principal 13 — Excluir usuário

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---: | :--- | :---: | :---: | :---: |
| 1 | Usuário Gestor clica no ícone de excluir (🗑️) em um registro da listagem | FP10 | RN09, RN92 | |
| 2 | Sistema exibe diálogo de confirmação | | | |
| 3 | Usuário confirma a exclusão | | | |
| 4 | Sistema remove o usuário do banco de dados | | | |
| 5 | Sistema exibe toast de sucesso | | | MSG-32 |
| 6 | Sistema atualiza a listagem | | | |

---

## Fluxo Principal 14 — Cadastrar nova tag de benefício

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---: | :--- | :---: | :---: | :---: |
| 1 | Usuário Gestor clica em "+ Nova Tag" | FP10 | RN93 | |
| 2 | Sistema exibe modal com formulário de cadastro | | | |
| 3 | Usuário preenche "Nome da Tag" (texto, obrigatório, placeholder: "Ex: Kit Higiene, Kit Gás, Cesta Básica...") | | RN93 | |
| 4 | Usuário preenche "Descrição / Critérios de Entrega" (textarea, opcional) | | | |
| 5 | Usuário seleciona "Esquema de Cor" em paleta de 8 cores (obrigatório) | | RN94 | |
| 6 | Usuário seleciona "Ícone Representativo" em seletor de 6 ícones (opcional) | | RN95 | |
| 7 | Se campo obrigatório estiver vazio, sistema exibe mensagem de validação | | | MSG-31 |
| 8 | Usuário clica em "Salvar Tag" | | | |
| 9 | Sistema persiste a nova tag no banco de dados | | RN62 | |
| 10 | Sistema exibe toast de sucesso | | | MSG-28 |
| 11 | Sistema atualiza o grid de tags | | | |

---

## Fluxo Principal 15 — Editar tag de benefício

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---: | :--- | :---: | :---: | :---: |
| 1 | Usuário Gestor clica no ícone de editar (✏️) em um card de tag | FP10 | RN93 | |
| 2 | Sistema exibe modal com formulário pré-preenchido | | | |
| 3 | Usuário altera os campos desejados | | | |
| 4 | Usuário salva as alterações | | | |
| 5 | Sistema persiste as alterações | | | |
| 6 | Sistema exibe toast de sucesso | | | MSG-28 |
| 7 | Sistema atualiza o grid de tags | | | |

---

## Fluxo Principal 16 — Excluir tag de benefício

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---: | :--- | :---: | :---: | :---: |
| 1 | Usuário Gestor clica no ícone de excluir (🗑️) em um card de tag | FP10 | RN93 | |
| 2 | Sistema exibe diálogo de confirmação | | | |
| 3 | Usuário confirma a exclusão | | | |
| 4 | Sistema remove a tag do banco de dados | | | |
| 5 | Sistema exibe toast de sucesso | | | MSG-33 |
| 6 | Sistema atualiza o grid de tags | | | |
