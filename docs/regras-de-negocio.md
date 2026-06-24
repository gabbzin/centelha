# Regras de Negócio — Centelha

## 1. Autenticação e Controle de Acesso

| ID | Título | Descrição |
| :---: | :--- | :--- |
| RN01 | Cadastro de Usuário | O sistema deve permitir o cadastro de usuários com e-mail único e senha. |
| RN02 | Autenticação de Acesso | O login deve ser realizado por meio de e-mail e senha válidos. |
| RN03 | Definição de Perfis | O sistema deve possuir dois perfis de usuário: Gestor (Administrador) e Operador. |
| RN04 | Controle de Permissões | O acesso às funcionalidades deve ser controlado conforme o perfil do usuário. |
| RN05 | Recuperação de Senha | O sistema deve permitir a recuperação de senha via e-mail, mediante envio de um token único e temporário. |
| RN06 | Validade do Token | O token de recuperação deve possuir prazo de expiração e só poderá ser utilizado uma única vez. |
| RN07 | Segurança de Credenciais | As senhas devem ser armazenadas de forma criptografada. |
| RN08 | Restrição de Auto-cadastro | O sistema não deve permitir o auto-cadastro de usuários na tela de login para garantir o controle de acesso institucional. |
| RN09 | Gestão de Usuários | A criação de novos usuários (Gestores ou Operadores) é uma funcionalidade exclusiva do perfil Gestor. |
| RN10 | Bloqueio de Inativos | Usuários inativos não conseguem realizar login, independentemente de credenciais corretas. |
| RN11 | Proteção contra Força Bruta | O login deve ser bloqueado temporariamente após 5 tentativas falhas consecutivas. |
| RN12 | Acesso a Configurações | Usuários do perfil Gestor podem acessar as páginas de configuração do sistema (gestão do sistema, aparência, configurações gerais); usuários Operadores não. |
| RN13 | Redirecionamento Pós-Login | Após o login, Gestores são redirecionados à gestão do sistema; Operadores são redirecionados ao dashboard. |

---

## 2. Centro Comunitário

| ID | Título | Descrição |
| :---: | :--- | :--- |
| RN14 | Instância Institucional | O sistema mantém um único centro comunitário, criado automaticamente na primeira configuração. |
| RN15 | Atributos do Centro | Um centro comunitário deve possuir nome, localização, slogan, texto de rodapé, família tipográfica e logos. |
| RN16 | Vínculo de Gestor | Um Gestor deve estar vinculado a pelo menos um centro comunitário. |
| RN17 | Edição Institucional | Apenas usuários do perfil Gestor podem cadastrar ou editar dados do centro comunitário. |
| RN18 | Personalização Visual | O sistema permite personalizar 13 propriedades de cor: primária, fundo, superfície, texto primário, texto secundário, texto desabilitado, hover, ativo, sucesso, erro, aviso, informação e botão. |
| RN19 | Logotipo Institucional | O logotipo aceita formatos SVG, PNG, JPG, JPEG e GIF, com tamanho máximo de 2 MB. |
| RN20 | Favicon do Sistema | O favicon aceita formatos PNG, JPG, JPEG, ICO e SVG, com tamanho máximo de 1 MB. |
| RN21 | Modo de Manutenção | O centro pode ser colocado em modo de manutenção, que restringe o acesso ao sistema. |
| RN22 | Gestão de Links Sociais | Os links para redes sociais são gerenciados de forma substitutiva — ao salvar, todos os links existentes são removidos e substituídos pelos novos. |

---

## 3. Cadastro de Famílias

| ID | Título | Descrição |
| :---: | :--- | :--- |
| RN23 | Estrutura Familiar | Uma Família pode ter múltiplos integrantes, sendo um deles o responsável principal. |
| RN24 | Responsável Obrigatório | Não é permitido cadastrar uma família sem responsável principal. |
| RN25 | Unicidade de Endereço | Uma Família pode ser registrada com apenas um endereço. |
| RN26 | Unicidade de CPF | O CPF do responsável familiar deve ser único no sistema. Não é permitido cadastrar duas famílias com o mesmo CPF. |
| RN27 | Status Familiar | O sistema deve permitir a ativação e desativação de uma família. A desativação não exclui os dados, apenas altera seu status. |
| RN28 | Limite de Caracteres | O nome do responsável familiar e dos membros deve ter, no máximo, 100 caracteres. |
| RN29 | Higienização de CPF | O CPF (do responsável e dos membros) deve conter exatamente 11 dígitos numéricos. O sistema deve higienizar a entrada removendo caracteres não numéricos. |
| RN30 | Contato Telefônico | O telefone de contato do responsável familiar é obrigatório e deve conter entre 10 e 11 dígitos numéricos após higienização. |
| RN31 | E-mail de Contato | O e-mail do responsável familiar é opcional; contudo, se informado, deve ser um e-mail válido. |
| RN32 | Formatação de Datas | A data de nascimento do responsável e dos membros familiares é obrigatória e deve ser convertida e persistida no formato ISO (YYYY-MM-DD). |
| RN33 | Idade Mínima | O sistema deve impedir o cadastro de responsáveis com menos de 18 anos. |
| RN34 | Dados de Localização | Os campos Logradouro, Número, Bairro e Cidade são obrigatórios para o endereço da família. |
| RN35 | Unidade Federativa | A Unidade Federativa (UF) do endereço é obrigatória e deve conter exatamente 2 caracteres. |
| RN36 | Formatação de CEP | O CEP deve conter exatamente 8 dígitos numéricos após higienização. |
| RN37 | Validação de CEP | O CEP informado deve conter exatamente 8 dígitos numéricos. O endereço é preenchido manualmente pelo usuário. |
| RN38 | Condição de Moradia | A condição de moradia é opcional e restrita aos valores: "própria", "alugada" ou "cedida". |
| RN39 | Teto de Renda | A renda familiar total informada não pode assumir valores negativos, nem ultrapassar R$ 3.500,00. |
| RN40 | Precisão Monetária | O sistema armazena a renda familiar em centavos (multiplicada por 100) para precisão monetária. |
| RN41 | Auxílio Governamental | O indicador de recebimento de auxílio governamental é opcional e restrito aos valores "sim" ou "não". |
| RN42 | Grau de Parentesco | Cada integrante familiar deve possuir vínculo de parentesco definido (ex: pai, mãe, filho). |
| RN43 | CPF de Dependentes | O CPF dos membros familiares é obrigatório no cadastro e opcional na edição. |
| RN44 | Edição em Lote | Ao editar uma família, todos os membros existentes são substituídos pelos dados enviados no formulário (exclusão em lote + recriação). |
| RN45 | Tags de Necessidade | O sistema deve permitir o registro de necessidades específicas e observações para a família por meio de tags gerenciáveis. |

---

## 4. Cadastro de Benefícios

| ID | Título | Descrição |
| :---: | :--- | :--- |
| RN46 | Vínculo de Benefícios | Os benefícios devem estar vinculados a um centro comunitário. |
| RN47 | Categorização | O sistema deve permitir a categorização de cada benefício (Alimentação, Financeiro, Saúde, Vestuário e Educação). |
| RN48 | Ciclo de Vida do Benefício | Um benefício pode estar em: Ativo, Revisão ou Inativo. Ao ser criado, assume automaticamente o status Ativo. |
| RN49 | Código Identificador | O código do benefício deve ser único e gerado automaticamente no formato "BNF-" seguido de um número sequencial de três dígitos. |
| RN50 | Controle de Inventário | O sistema permite controlar a quantidade disponível em estoque de cada benefício. |
| RN51 | Saldo de Estoque | O estoque é um valor inteiro não negativo, cujo padrão é zero. |
| RN52 | Anexos de Benefício | O benefício pode ter uma imagem associada (PNG, JPG, JPEG ou PDF), com tamanho máximo de 5 MB. |
| RN53 | Rastreabilidade | O sistema registra automaticamente qual usuário criou cada benefício. |
| RN54 | Dados de Origem e Validade | Informações opcionais de doador e data de validade podem ser registradas. |

---

## 5. Entrega e Distribuição de Benefícios

| ID | Título | Descrição |
| :---: | :--- | :--- |
| RN55 | Multiplicidade de Entrega | Uma Família pode receber múltiplos benefícios. |
| RN56 | Atribuição Operacional | Os operadores podem vincular benefícios às famílias. |
| RN57 | Disponibilidade de Saldo | Um benefício somente poderá ser entregue se houver saldo disponível em estoque. |
| RN58 | Histórico de Distribuição | Toda entrega de benefício deve gerar um registro permanente no histórico. |
| RN59 | Auditoria de Entrega | O sistema deve registrar data, hora e usuário responsável por cada entrega. |
| RN60 | Auditoria de Estoque | Toda alteração de estoque deve gerar registro de auditoria. |
| RN61 | Prevenção de Duplicidade | O sistema deve impedir entregas duplicadas do mesmo benefício para a mesma família dentro de um período de 7 dias. |

---

## 6. Integridade e Persistência de Dados

| ID | Título | Descrição |
| :---: | :--- | :--- |
| RN62 | Persistência de Dados | Todos os dados relevantes devem ser armazenados de forma persistente em banco de dados relacional. |
| RN63 | Integridade Referencial | Endereço, membros familiares e necessidades específicas são excluídos juntamente com a família via código da aplicação. |
| RN64 | Logs de Segurança | O sistema deve registrar logs de autenticação para auditoria e segurança. |

---

## 7. Interface e Experiência do Usuário

| ID | Título | Descrição |
| :---: | :--- | :--- |
| RN65 | Usabilidade | O sistema deve possuir interface simples, acessível e intuitiva. |
| RN66 | Centralização de Dados | As informações devem ser centralizadas para facilitar a gestão. |
| RN67 | Fluxo de Cadastro | O cadastro de família é dividido em três etapas sequenciais: (1) Identificação, (2) Endereço e (3) Renda. |
| RN68 | Validação Progressiva | Cada etapa do formulário só pode ser avançada com o preenchimento correto dos campos obrigatórios. |
| RN69 | Sinalização de Campos | Todos os campos marcados com asterisco (*) são obrigatórios. |
| RN70 | Auxílio de Digitação | Campos como CPF, telefone, CEP e valor monetário devem possuir máscaras em tempo real. |
| RN71 | Persistência de Sessão | A funcionalidade "Lembrar de Mim" deve possuir tempo máximo configurável de sessão. |
| RN72 | Paginação de Famílias | Listagem de famílias com busca textual e paginação de 6 registros. |
| RN73 | Paginação de Benefícios | Listagem de benefícios com filtros e paginação de 8 registros (ordenados pelo mais recente). |
| RN74 | Exportação de Dados | O sistema deve permitir a exportação de históricos em formato PDF. |

---

## 8. Dashboard

| ID | Título | Descrição |
| :---: | :--- | :--- |
| RN75 | Monitoramento Estatístico | O dashboard exibe indicadores de entregas, famílias atendidas e variação percentual. |
| RN76 | Alertas de Inventário | Benefícios com estoque baixo são destacados com níveis de alerta (atenção ou crítico). |
| RN77 | Ranking de Distribuição | O sistema apresenta ranking dos benefícios mais distribuídos com suas respectivas quantidades. |

---

## 9. Entrega de Benefícios

| ID | Título | Descrição |
| :---: | :--- | :--- |
| RN78 | Código de Entrega | O código da entrega deve ser único e gerado automaticamente no formato "ENT-" seguido de número sequencial de 4 dígitos (ex.: ENT-0001). |
| RN79 | Local de Retirada | O local de retirada é de preenchimento obrigatório no momento da entrega. |
| RN80 | Comprovante de Entrega | A entrega pode ter um comprovante anexado nos formatos PNG, JPG ou PDF, com tamanho máximo de 5 MB. |
| RN81 | Irretratabilidade de Entrega | Uma entrega não pode ser editada nem excluída após registrada. Ajustes de estoque devem ser feitos manualmente. |

---

## 10. Customização de Tela

| ID | Título | Descrição |
| :---: | :--- | :--- |
| RN82 | Customização por Tela | O sistema deve permitir ao Gestor personalizar textos, visibilidade de widgets e regras de negócio de cada tela do sistema individualmente. |
| RN83 | Preview em Tempo Real | As alterações realizadas no formulário de customização devem refletir imediatamente no preview ao lado, sem necessidade de salvar para visualizar. |
| RN84 | Publicação de Alterações | As configurações de customização são salvas e efetivadas imediatamente ao clicar em "Publicar". Não há estado de rascunho. |
| RN85 | Fallback para Padrão | Caso uma chave de configuração não exista nas configurações salvas, o sistema deve utilizar o valor padrão definido no arquivo de configuração. |
| RN86 | Telas Customizáveis | As telas customizáveis são: Dashboard, Página Inicial, Tela de Login, Gestão de Famílias e Controle de Estoque. |

---

## 11. Dashboard

| ID | Título | Descrição |
| :---: | :--- | :--- |
| RN87 | Seletor de Período | O dashboard permite ao usuário selecionar o mês de referência para visualização dos dados através de um seletor de período. |
| RN88 | Mapa de Distribuição | O dashboard exibe um mapa geográfico indicando a distribuição das famílias atendidas. |
| RN89 | Gráfico Comparativo | O dashboard exibe gráfico comparativo de entregas por categoria entre o mês atual e o mês anterior. |

---

## 12. Usuários e Tags de Benefício (PENDENTE)

> **Atenção:** Este módulo ainda não foi implementado. As RNs abaixo estão documentadas como especificação futura.

| ID | Título | Descrição |
| :---: | :--- | :--- |
| RN90 | Tela Unificada | A gestão de usuários e tags de benefício deve estar em uma única tela, dividida em duas seções independentes. |
| RN91 | Cadastro de Usuário | O cadastro de usuário deve conter: nome, tipo de usuário, data de nascimento, e-mail e senha do administrador logado para confirmação. |
| RN92 | Exclusão de Usuário | A exclusão de um usuário é uma funcionalidade exclusiva do perfil Gestor e deve solicitar confirmação antes de ser executada. |
| RN93 | Tags de Benefício | O sistema deve permitir o gerenciamento de tags de benefício com nome, descrição, cor e ícone representativo. |
| RN94 | Cor da Tag | Cada tag de benefício deve possuir uma cor selecionável a partir de uma paleta predefinida de 8 cores. |
| RN95 | Ícone da Tag | Cada tag de benefício pode possuir um ícone representativo selecionado a partir de uma lista de ícones disponíveis. |

---

## 13. Configurações de Usuário (Perfil)

| ID | Título | Descrição |
| :---: | :--- | :--- |
| RN96 | Editar Perfil | O sistema deve permitir que o usuário edite seu próprio nome e e-mail na página de configurações de perfil. |
| RN97 | Alterar Senha | O sistema deve permitir que o usuário altere sua própria senha mediante confirmação da senha atual. |
| RN98 | Excluir Conta | O sistema deve permitir que o usuário exclua sua própria conta após confirmar a senha. |

---

## 14. Aparência e Tema

| ID | Título | Descrição |
| :---: | :--- | :--- |
| RN99 | Alternador de Tema | O sistema deve oferecer alternância entre os temas claro, escuro e automático (segue o sistema operacional), armazenando a preferência no navegador. |

---

## 15. Infraestrutura e Armazenamento

| ID | Título | Descrição |
| :---: | :--- | :--- |
| RN100 | Cache com Invalidação por Versão | O sistema deve utilizar cache de dados com mecanismo de invalidação por versão, incrementada a cada alteração nos dados cacheados. |
| RN101 | Armazenamento S3/MinIO | O sistema deve armazenar arquivos (imagens de benefícios, comprovantes de entrega) em storage S3-compatível (MinIO), com fallback para disco local quando indisponível. |

---

## 16. APIs e Integrações

| ID | Título | Descrição |
| :---: | :--- | :--- |
| RN102 | Endpoint de Busca JSON | O sistema deve expor um endpoint JSON para busca de famílias por nome ou CPF para autocomplete, limitado a 20 resultados e apenas famílias ativas. |

---

## 17. Relatórios e Exportação

| ID | Título | Descrição |
| :---: | :--- | :--- |
| RN103 | PDF com Identidade Visual | Os PDFs gerados pelo sistema (comprovantes de entrega, relatórios) devem aplicar a identidade visual do centro comunitário (logotipo, cores, fontes). |

---

## 18. Auditoria

| ID | Título | Descrição |
| :---: | :--- | :--- |
| RN104 | Registro Polimórfico de Auditoria | O sistema deve registrar movimentações de estoque com referência polimórfica (tipo e ID do registro originador) e motivo da movimentação. |
