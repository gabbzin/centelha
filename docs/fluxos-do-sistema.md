# Fluxos do Sistema — Centelha

---

## 1. Autenticação

### 1.1 Login

**Fluxo Principal — Login com sucesso**
1. Usuário acessa a tela de login
2. Sistema exibe formulário com campos de e-mail e senha, checkbox "Lembrar de Mim" e link "Esqueceu sua senha"
3. Usuário informa e-mail e senha
4. Usuário clica em "Entrar"
5. Sistema valida que e-mail e senha foram preenchidos
6. Sistema verifica as credenciais no banco de dados
7. Sistema verifica se o usuário está ativo (`ativo = true`)
8. Sistema autentica o usuário e cria sessão
9. Se "Lembrar de Mim" estiver marcado, sistema estende o tempo de sessão
10. Sistema redireciona: Gestor → `/gestao-sistema`; Operador → `/dashboard`

**Fluxo Alternativo — Credenciais inválidas**
1. No passo 6, sistema não encontra usuário com o e-mail informado OU senha incorreta
2. Sistema incrementa contador de tentativas do rate limit
3. Sistema exibe mensagem genérica: "Credenciais inválidas"
4. Sistema permanece na tela de login

**Fluxo Alternativo — Conta inativa**
1. No passo 7, sistema detecta que `ativo = false`
2. Sistema desautentica o usuário (se passou pela etapa 6)
3. Sistema exibe mensagem: "Conta desativada"
4. Sistema permanece na tela de login

**Fluxo de Exceção — Rate limit excedido**
1. Usuário excede 5 tentativas falhas consecutivas
2. Sistema bloqueia novas tentativas por tempo configurável
3. Sistema exibe mensagem informando quantos segundos/minutos restam para nova tentativa
4. Sistema dispara evento de Lockout para auditoria

---

### 1.2 Recuperação de Senha

**Fluxo Principal — Solicitação de redefinição**
1. Usuário clica em "Esqueceu sua senha"
2. Sistema redireciona para tela de solicitação
3. Usuário informa e-mail cadastrado
4. Sistema valida o e-mail
5. Sistema gera token único e temporário
6. Sistema persiste o token vinculado ao usuário com data de expiração
7. Sistema envia e-mail com link contendo o token
8. Sistema exibe mensagem: "Um link de redefinição será enviado se a conta existir"
9. Usuário acessa o link recebido
10. Sistema valida o token (existência, expiração, uso único)
11. Sistema exibe formulário de nova senha com confirmação
12. Usuário informa nova senha e confirma
13. Sistema valida senha (mínimo de caracteres obrigatório)
14. Sistema atualiza senha do usuário de forma criptografada
15. Sistema invalida o token (impede reuso)
16. Sistema exibe mensagem de sucesso e redireciona ao login

**Fluxo Alternativo — E-mail não encontrado**
1. No passo 4, o e-mail informado não existe no sistema
2. Sistema ainda exibe mensagem genérica "Um link de redefinição será enviado se a conta existir" (não revela existência do e-mail)
3. Fluxo é encerrado na tela de solicitação

**Fluxo de Exceção — Token expirado**
1. No passo 10, o token já excedeu o prazo de validade
2. Sistema exibe mensagem de token expirado
3. Sistema redireciona para nova solicitação de redefinição

**Fluxo de Exceção — Token já utilizado**
1. No passo 10, o token já foi utilizado anteriormente
2. Sistema exibe mensagem de token inválido
3. Sistema redireciona para nova solicitação de redefinição

---

### 1.3 Logout

**Fluxo Principal — Logout**
1. Usuário autenticado clica em "Sair"
2. Sistema invalida a sessão atual
3. Sistema remove o cookie de sessão
4. Sistema redireciona para a tela de login

---

## 2. Gestão de Famílias

### 2.1 Listagem e Busca

**Fluxo Principal — Visualizar listagem**
1. Usuário autenticado acessa `/family`
2. Sistema carrega famílias com endereço e contagem de membros
3. Sistema exibe cards com: nome do responsável, CPF (mascarado), status, bairro, quantidade de membros
4. Sistema exibe paginação no rodapé (6 registros por página)

**Fluxo Alternativo — Buscar por nome**
1. Usuário digita no campo de busca
2. Sistema aguarda 400ms (debounce)
3. Sistema dispara requisição com parâmetro `search`
4. Backend filtra por `responsible_name LIKE %termo%`
5. Sistema atualiza a listagem com os resultados
6. Sistema preserva o termo de busca na URL

**Fluxo Alternativo — Alternar exibição de sobrenome**
1. Usuário clica no botão de alternância
2. Sistema passa a exibir apenas os dois últimos nomes do responsável
3. Novo clique reverte para o nome completo

**Fluxo de Exceção — Nenhuma família encontrada**
1. A busca não retorna resultados
2. Sistema exibe listagem vazia

---

### 2.2 Cadastro (Formulário Multi-etapas)

#### Etapa 1 — Identificação do Responsável e Composição Familiar

**Fluxo Principal — Preenchimento e avanço**
1. Usuário acessa `/family/register`
2. Sistema exibe primeira etapa com campos: Nome, CPF, Telefone, E-mail (opcional), Data de Nascimento
3. Usuário preenche os campos
4. Usuário pode adicionar membros familiares clicando em "+ Adicionar novo membro", que insere dinamicamente campos de Nome, CPF, Data de Nascimento e Relação de Parentesco (dropdown: Pai/Mãe/Filho(a))
5. Usuário pode remover membros adicionados clicando no ícone de lixeira
6. Usuário clica em "Próximo Passo"
7. Sistema valida campos obrigatórios da etapa (Nome, CPF, Telefone, Data de Nascimento, e dados de cada membro adicionado)
8. Se válido, sistema avança para Etapa 2

**Fluxo Alternativo — Remover membro**
1. Usuário clica no ícone de lixeira de um membro
2. Sistema remove o membro da lista dinâmica
3. Sistema atualiza o contador "Membros adicionados: X"

**Fluxo de Exceção — Validação falhou**
1. No passo 7, algum campo obrigatório está inválido
2. Sistema exibe toast de erro com a mensagem do primeiro campo inválido
3. Sistema permanece na etapa atual

**Regras de validação da Etapa 1:**
- Nome: obrigatório, máximo 100 caracteres
- CPF: obrigatório, 11 dígitos após remover não numéricos, único no sistema
- Telefone: obrigatório, 10-11 dígitos após remover não numéricos
- E-mail: opcional, se preenchido deve ser válido
- Data de nascimento: obrigatório, deve ser anterior a 18 anos atrás
- Membros (se adicionados): Nome obrigatório (100 max), CPF obrigatório (11 dígitos), Data de nascimento obrigatória, Relação de parentesco obrigatória (pai/mae/filho)

---

#### Etapa 2 — Endereço e Condições de Moradia

**Fluxo Principal — Preenchimento e avanço**
1. Sistema exibe campos: CEP, Logradouro, Número, Cidade, UF, Bairro
2. Usuário informa o CEP
3. Sistema consulta ViaCEP automaticamente ao atingir 8 dígitos
4. Se CEP encontrado, sistema preenche automaticamente Logradouro, Bairro, Cidade e UF e desabilita edição
5. Usuário informa Número
6. Usuário seleciona Condição de Moradia (radio: Própria/Alugada/Cedida — opcional)
7. Usuário clica em "Próximo Passo"
8. Sistema valida campos obrigatórios (CEP, Logradouro, Número, Bairro, Cidade, UF)
9. Se válido, sistema avança para Etapa 3

**Fluxo Alternativo — CEP não encontrado**
1. No passo 3, ViaCEP retorna erro (CEP inexistente)
2. Sistema exibe erro no campo CEP: "CEP não encontrado"
3. Sistema habilita edição manual de Logradouro, Bairro, Cidade e UF
4. Usuário preenche manualmente

**Fluxo Alternativo — CEP inválido**
1. No passo 3, ocorre erro de conexão com ViaCEP
2. Sistema exibe erro no campo CEP: "Erro ao buscar CEP. Preencha manualmente"
3. Sistema habilita edição manual dos campos
4. Usuário preenche manualmente

**Fluxo Alternativo — Logradouro manual**
1. Se CEP não é informado ou é inválido, usuário pode digitar Logradouro, Bairro, Cidade e UF manualmente (campos ficam habilitados)

**Fluxo de Exceção — Validação falhou**
1. Campo obrigatório não preenchido
2. Sistema exibe toast indicando o primeiro erro
3. Sistema permanece na etapa

**Regras de validação da Etapa 2:**
- CEP: obrigatório, 8 dígitos após remover não numéricos
- Logradouro: obrigatório, máximo 255 caracteres
- Número: obrigatório, máximo 20 caracteres
- Bairro: obrigatório, máximo 100 caracteres
- Cidade: obrigatório, máximo 100 caracteres
- UF: obrigatório, exatamente 2 caracteres
- Moradia: aceita apenas "propria", "alugada" ou "cedida" (opcional)

---

#### Etapa 3 — Renda e Situação Econômica

**Fluxo Principal — Preenchimento e finalização**
1. Sistema exibe campos: Fonte de Renda Principal (radio), Renda Familiar (com máscara monetária), Categorias de Benefícios (combobox múltipla), Recebe Auxílio? (sim/não)
2. Usuário preenche a fonte de renda (emprego formal, emprego informal, benefícios sociais, outra fonte, sem renda)
3. Usuário informa a renda familiar total (máximo R$ 3.500,00)
4. Usuário seleciona se recebe auxílio
5. Se "Sim", sistema exibe campo "Qual auxílio/benefício recebe?"
6. Usuário preenche a descrição
7. Usuário clica em "Finalizar Cadastro"
8. Sistema valida todos os campos da etapa
9. Sistema submete o formulário completo via POST para `/family`
10. Backend persiste família, endereço e membros em transação
11. Sistema exibe toast de sucesso
12. Sistema redireciona para listagem de famílias

**Fluxo Alternativo — "Não" recebe auxílio**
1. No passo 5, usuário seleciona "Não"
2. Campo de descrição de auxílio não é exibido

**Fluxo de Exceção — Renda acima do limite**
1. Usuário informa renda superior a R$ 3.500,00
2. Validação falha com mensagem de erro
3. Sistema permanece na etapa

**Fluxo de Exceção — CPF duplicado**
1. Backend detecta que o CPF do responsável já existe
2. Sistema exibe toast de erro: "Este CPF já está cadastrado no sistema"
3. Sistema permanece na etapa 1 (os dados preenchidos são preservados)

**Regras de validação da Etapa 3:**
- Fonte de renda: opcional, máximo 50 caracteres
- Renda familiar: opcional, valor entre 0 e 3500
- Recebe auxílio: opcional, aceita apenas "sim" ou "não"
- Descrição do auxílio: opcional, máximo 255 caracteres (exibido condicionalmente)

---

### 2.3 Edição

**Fluxo Principal — Editar informações**
1. Usuário acessa detalhes da família em `/family/details/{id}`
2. Usuário clica em "Editar Informações"
3. Sistema redireciona para `/family/{id}/edit`
4. Sistema carrega dados existentes da família e pré-preenche o formulário nas 3 etapas
5. Sistema converte renda de centavos para reais (divide por 100)
6. Sistema converte datas ISO para objetos Date
7. Usuário modifica os campos desejados
8. Usuário navega entre as etapas (mesmo fluxo do cadastro)
9. Usuário clica em "Atualizar Cadastro" na última etapa
10. Sistema submete via PUT para `/family/{id}`
11. Backend atualiza dados da família, endereço (upsert) e substitui membros (deleta todos + recria)
12. Sistema exibe toast: "Informações da família atualizadas com sucesso"
13. Sistema redireciona para `/family/details/{id}`

**Fluxo Alternativo — Nenhuma alteração**
1. Usuário acessa edição mas não modifica nenhum dado
2. Usuário clica em "Atualizar Cadastro"
3. Sistema submete os dados existentes (mesmo sem alterações)
4. Backend atualiza com os mesmos valores
5. Fluxo continua normalmente

**Fluxo de Exceção — CPF já pertence a outra família**
1. Backend detecta conflito de CPF (excluindo a família atual)
2. Sistema exibe toast: "Este CPF já está cadastrado para outra família"
3. Sistema permanece no formulário com dados preservados

**Regras da edição:**
- CPF do membro familiar passa a ser opcional (nullable no backend)
- Endereço usa `updateOrCreate` (cria se não existe, atualiza se existe)
- Membros antigos são deletados e recriados (operação atômica em transação)
- Renda é convertida de centavos para reais no pré-preenchimento

---

### 2.4 Visualização de Detalhes

**Fluxo Principal — Exibir detalhes**
1. Usuário clica em "Ver Informações" em um card da listagem
2. Sistema redireciona para `/family/details/{id}`
3. Sistema carrega família com endereço, membros e necessidades específicas
4. Sistema exibe seção de Informações Pessoais (nome, CPF, status, telefone)
5. Sistema exibe seção de Dados Socioeconômicos (auxílio, moradia, renda, fonte de renda)
6. Sistema exibe seção de Endereço (logradouro, bairro, CEP, cidade/UF)
7. Sistema exibe seção de Composição Familiar (lista de membros com nome e idade)
8. Sistema exibe seção de Histórico de Benefícios (mockado)

**Regras de exibição:**
- CPF exibido com máscara: `***.XXX.XXX-**`
- Telefone formatado: `(99) 99999-9999`
- CEP formatado: `99999-999`
- Renda formatada em moeda BRL
- Status exibido como badge "Ativo" (verde) ou "Inativo" (vermelho)

---

### 2.5 Ativação/Desativação

**Fluxo Principal — Desativar família**
1. Usuário acessa detalhes da família
2. Usuário clica em "Desativar Família"
3. Sistema exibe diálogo de confirmação: "Tem certeza que deseja desativar esta família? Esta ação pode ser desfeita"
4. Usuário confirma clicando em "Desativar"
5. Sistema envia PATCH para `/family/{id}/deactivate`
6. Backend atualiza `is_active = false`
7. Sistema exibe toast: "Família desativada com sucesso"
8. Sistema redireciona para listagem

**Fluxo Alternativo — Ativar família**
1. Usuário acessa detalhes de uma família inativa
2. Botão exibe "Ativar Família"
3. Fluxo análogo, envia PATCH para `/family/{id}/activate`
4. Backend atualiza `is_active = true`

**Fluxo Alternativo — Cancelar**
1. No diálogo de confirmação, usuário clica em "Cancelar"
2. Diálogo é fechado, nenhuma ação é executada

---

## 3. Gestão de Benefícios

### 3.1 Listagem e Busca

**Fluxo Principal — Visualizar listagem**
1. Usuário acessa `/beneficios`
2. Sistema carrega benefícios com criador
3. Sistema exibe tabela com: código, nome, categoria, quantidade em estoque
4. Sistema exibe ações: Visualizar, Editar, Excluir
5. Sistema exibe paginação (8 registros por página, ordenados do mais recente)
6. Sistema exibe "Mostrando X a Y de Z registros"

**Fluxo Alternativo — Buscar**
1. Usuário digita no campo de busca
2. Sistema filtra por nome, código ou categoria (ILIKE)
3. Sistema atualiza resultados

**Fluxo Alternativo — Filtrar por categoria**
1. Usuário seleciona uma categoria no filtro
2. Sistema filtra benefícios pela categoria selecionada
3. Opção "Todas" remove o filtro

---

### 3.2 Cadastro

**Fluxo Principal — Criar benefício**
1. Usuário clica em "Adicionar novo benefício"
2. Sistema exibe modal com campos: Nome, Categoria (dropdown), Quantidade em Estoque, Doador (opcional), Validade (opcional), Observações (opcional), Imagem (opcional)
3. Usuário preenche os campos
4. Se informar imagem, sistema valida formato (PNG, JPG, JPEG, PDF) e tamanho (máx. 5MB)
5. Usuário clica em "Salvar Cadastro"
6. Sistema envia POST para `/beneficios`
7. Backend persiste o benefício com status "Ativo" e `created_by = usuário logado`
8. Backend gera código no formato `BNF-XXX` (ex: `BNF-001`)
9. Se informou imagem, sistema armazena em `storage/app/public/benefits/`
10. Sistema exibe toast de sucesso
11. Sistema redireciona para listagem

**Fluxo de Exceção — Arquivo inválido**
1. Usuário anexa imagem em formato não permitido ou acima do tamanho
2. Sistema exibe erro de validação
3. Sistema permanece no modal

---

### 3.3 Edição

**Fluxo Principal — Editar benefício**
1. Usuário clica em "Editar" em um benefício
2. Sistema exibe modal com dados preenchidos
3. Usuário altera campos desejados
4. Opcionalmente, usuário pode substituir ou remover a imagem
5. Usuário salva
6. Sistema envia PUT para `/beneficios/{id}`
7. Backend atualiza os campos alterados
8. Se imagem removida, arquivo anterior é deletado do disco
- Se nova imagem enviada, arquivo anterior é deletado e novo é armazenado
9. Sistema redireciona para listagem

---

### 3.4 Exclusão

**Fluxo Principal — Excluir benefício**
1. Usuário clica em "Excluir" em um benefício
2. Sistema exibe diálogo de confirmação
3. Usuário confirma
4. Sistema envia requisição DELETE
5. Backend deleta imagem do disco (se houver)
6. Backend deleta o registro
7. Sistema redireciona para listagem

---

## 4. Configurações do Sistema

### 4.1 Configurações Gerais

**Fluxo Principal — Atualizar configurações**
1. Usuário Gestor acessa `/gestao-sistema/configuracoes-gerais`
2. Sistema exibe formulário com campos: Nome, Slogan, Texto do Rodapé, Fonte, Logotipo, Favicon, Links Sociais, Modo de Manutenção
3. Usuário altera campos desejados
4. Se novo logotipo/favicon, sistema valida formato e tamanho
5. Usuário informa links sociais em formato JSON
6. Usuário salva
7. Sistema persiste alterações
8. Sistema substitui links sociais (deleta todos + recria)
9. Sistema exibe toast de sucesso

**Fluxo de Exceção — Arquivo de logotipo inválido**
1. Formato não aceito ou tamanho excede 2MB
2. Sistema exibe erro de validação
3. Sistema permanece no formulário

**Fluxo de Exceção — Arquivo de favicon inválido**
1. Formato não aceito ou tamanho excede 1MB
2. Sistema exibe erro de validação
3. Sistema permanece no formulário

---

### 4.2 Aparência (Cores)

**Fluxo Principal — Personalizar cores**
1. Usuário Gestor acessa `/gestao-sistema/aparencia`
2. Sistema exibe formulário com 13 campos de cor (hexadecimal)
3. Usuário ajusta as cores desejadas
4. Usuário salva
5. Sistema persiste as cores no centro comunitário
6. Sistema exibe toast de sucesso
7. Alterações refletem imediatamente na interface

**Fluxo de Exceção — Cor inválida**
1. Usuário informa valor que não é uma cor hexadecimal válida
2. Sistema exibe erro de validação
3. Sistema permanece no formulário

---

## 5. Dashboard

### 5.1 Visualização de Indicadores

**Fluxo Principal — Acessar dashboard**
1. Usuário autenticado acessa `/dashboard`
2. Sistema exibe cards com indicadores: Benefícios Entregues, Famílias Atendidas, Novos Cadastros
3. Cada card exibe valor atual e variação percentual em relação ao período anterior
4. Sistema exibe alertas de estoque baixo (níveis: atenção, crítico)
5. Sistema exibe gráfico comparativo de distribuição por tipo de benefício

**Nota:** Atualmente todos os dados do dashboard são mockados (estáticos).

---

## 6. Regras Transversais

### 6.1 Exclusão em Cascata

| Entidade | Impacto |
|---|---|
| Exclusão de Família | Remove endereço, membros, vínculos com necessidades específicas |
| Exclusão de Benefício | Remove imagem do disco e registro |
| Exclusão de Centro Comunitário | Remove links sociais |

### 6.2 Transações

As operações de criação e atualização de famílias são executadas dentro de transações do banco de dados. Se qualquer etapa falhar (família, endereço ou membros), todas as alterações são revertidas.

### 6.3 Mascaramento de CPF

O CPF é armazenado com 11 dígitos, mas exibido com máscara `***.XXX.XXX-**` em todas as telas de listagem e detalhes. A exibição completa ocorre apenas nos formulários de edição.

### 6.4 Conversão de Renda

A renda informada no formulário (em reais, ex: R$ 1.250,00) é convertida para centavos no backend (125000) e armazenada como inteiro. Na exibição e edição, o valor é convertido de volta para reais.
