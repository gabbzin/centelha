## **UC01 – Autenticação de Usuário (Login) – FP01 Realizar Login**

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---- | :---- | :---- | :---- | :---- |
| 1 | Sistema apresenta tela de Login | \- | \- | \- |
| 2 | Usuário informa e-mail e senha | FA01 | \- | \- |
| 3 | Sistema valida credenciais | FE01 | RN1 | \- |
| 4 | Sistema autentica usuário | \- | \- | MSG-01 |
| 5 | Redireciona para Dashboard | \- | \- | \- |
| 6 | Caso de uso finalizado | \- | \- | \- |

## 

## **UC02 – Recuperação de Senha**

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---- | :---- | :---- | :---- | :---- |
| 1 | Usuário seleciona Esqueceu sua senha | \- | \- | \- |
| 2 | Sistema apresenta recuperação | \- | \- | \- |
| 3 | Usuário informa e-mail | \- | \- | \- |
| 4 | Sistema valida e-mail | FE01 | RN004 | \- |
| 5 | Envia token temporário | \- | RN005 | MSG-05 |
| 6 | Usuário redefine senha | FE02 | RN006 | MSG-03 |

# 

# **UC03 – Gestão de Beneficiários (Listagem)**

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---- | :---- | :---- | :---- | :---- |
| 1 | O sistema apresenta a relação de famílias cadastradas | FA01 | \- | \- |
| 2 | O usuário informa um termo de pesquisa ou filtro | \- | \- | \- |
| 3 | O sistema processa os filtros informados | FA02 | RN15 | \- |
| 4 | O sistema exibe os resultados encontrados | \- | \- | \- |
| 5 | O usuário seleciona Ver Informações | FA03 | \- | \- |
| 6 | O sistema apresenta os dados completos da família | \- | RN09, RN10, RN11 | \- |
| 7 | O caso de uso é encerrado | \- | \- | \- |

# 

# **UC04 – Cadastro de Família**

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---- | :---- | :---- | :---- | :---- |
| 1 | A listagem de famílias é apresentada | FA01 | \- | \- |
| 2 | O usuário seleciona Nova Família | FA02 | RN15 | \- |
| 3 | Sistema apresenta Etapa 1 – Identificação | \- | RN09, RN10 | \- |
| 4 | Usuário informa dados do responsável e membros | \- | RN10 | \- |
| 5 | Usuário Seleciona Etapa 2 – Endereço |  |  |  |
| 6 | Usuário informa dados do endereço |  |  |  |
| 7 | Usuário Seleciona Etapa 3 – renda |  |  |  |
| 8 | Usuário informa dados do financeiro familiar |  |  |  |
| 9 | Sistema cadastra a nova família | \- | RN12 |  |
| 10 | Sistema atualiza a listagem de famílias | \- | \- | \- |
| 11 | Caso de uso encerrado | \- | \- | \- |

# 

# 

# **UC05 – Controle de Benefícios (Estoque)**

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---- | :---- | :---- | :---- | :---- |
| 1 | Sistema apresenta lista de benefícios | FA01 | RN16,RN17 | \- |
| 2 | Admin seleciona Adicionar Novo Benefício | FA02 | RN14 | \- |
| 3 | Sistema registra benefício no estoque | \- | RN17 | MSG013 |
| 4 | Sistema atualiza a listagem | \- | \- | \- |

# 

# 

# **UC06 – Histórico de Entregas**

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---- | :---- | :---- | :---- | :---- |
| 1 | Sistema apresenta histórico de entregas | FA01 | RN30 | \- |
| 2 | Usuário informa filtros | \- | \- | \- |
| 4 | Sistema processa filtros | FA02 | RN30 | \- |
| 7 | Sistema gera relatório solicitado | \- | RN31 |  |
| 8 | Caso de uso encerrado | \- | \- | \- |

