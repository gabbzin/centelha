# Módulo de Customização de Tela

## Índice

- [Regras de Negócio (RNs)](#regras-de-negócio-rns)
- [Fluxo Principal 07 — Acessar painel de customização](#fluxo-principal-07--acessar-painel-de-customização)
- [Fluxo Principal 08 — Personalizar tela](#fluxo-principal-08--personalizar-tela)
  - [Fluxo Alternativo 11 — Página não encontrada](#fluxo-alternativo-11--página-não-encontrada)
  - [Fluxo de Exceção 05 — Erro de validação no formulário](#fluxo-de-exceção-05--erro-de-validação-no-formulário)
  - [Fluxo de Exceção 06 — Centro comunitário não configurado](#fluxo-de-exceção-06--centro-comunitário-não-configurado)

---

## Regras de Negócio (RNs)

| RN | Título | Descrição |
| :---: | :--- | :--- |
| RN12 | Acesso a Configurações | Usuários do perfil Gestor podem acessar as páginas de configuração do sistema (gestão do sistema, aparência, configurações gerais); usuários Operadores não. |
| RN82 | Customização por Tela | O sistema deve permitir ao Gestor personalizar textos, visibilidade de widgets e regras de negócio de cada tela do sistema individualmente. |
| RN83 | Preview em Tempo Real | As alterações realizadas no formulário de customização devem refletir imediatamente no preview ao lado, sem necessidade de salvar para visualizar. |
| RN84 | Publicação de Alterações | As configurações de customização só são efetivadas após o clique em "Publicar". Enquanto não publicadas, as alterações não persistem nem afetam os usuários. |
| RN85 | Fallback para Padrão | Caso uma chave de configuração não exista nas configurações salvas, o sistema deve utilizar o valor padrão definido no arquivo de configuração. |
| RN86 | Telas Customizáveis | As telas customizáveis são: Dashboard, Página Inicial, Tela de Login, Gestão de Famílias e Controle de Estoque. |

---

## Fluxo Principal 07 — Acessar painel de customização

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---: | :--- | :---: | :---: | :---: |
| 1 | Usuário Gestor acessa `/gestao-sistema` | | RN12 | |
| 2 | Sistema exibe cards das telas disponíveis: Dashboard, Página Inicial, Login, Gestão de Famílias, Controle de Estoque | | RN86 | |
| 3 | Cada card exibe label, descrição e botão "Personalizar" | | | |
| 4 | Usuário clica em "Personalizar" em uma das telas | FP08 | | |

---

## Fluxo Principal 08 — Personalizar tela

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---: | :--- | :---: | :---: | :---: |
| 1 | Sistema redireciona para `/gestao-sistema/customizacao-tela/{pageKey}` | FP07 | | |
| 2 | Sistema carrega o schema da tela (define campos, tipos, limites) | FA11 | RN85 | |
| 3 | Sistema carrega as configurações salvas (se houver) e faz merge com os valores padrão | | RN85 | |
| 4 | Sistema exibe layout de duas colunas: formulário à esquerda e preview ao vivo à direita | | | |
| 5 | Formulário exibe seções com campos conforme schema: | | | |
| 5a | Campos do tipo `boolean` exibidos como toggle (switch) | | | |
| 5b | Campos do tipo `string` exibidos como input de texto | | | |
| 5c | Campos do tipo `textarea` exibidos como área de texto | | | |
| 5d | Campos do tipo `number` exibidos como input numérico com min/max | | | |
| 6 | Usuário altera os campos desejados | | | |
| 7 | Sistema atualiza o preview em tempo real a cada alteração | | RN83 | |
| 8 | Usuário clica em "Publicar" | | | |
| 9 | Sistema valida os campos conforme regras do schema (tipo, tamanho máximo, min/max) | FE05 | | |
| 10 | Sistema envia dados para `PUT /gestao-sistema/customizacao-tela/{pageKey}` | | | |
| 11 | Backend persiste as configurações no JSON `settings` do centro comunitário | | RN84 | |
| 12 | Backend limpa o cache do centro comunitário | | | |
| 13 | Sistema exibe toast de sucesso: "Configurações salvas com sucesso." | | | MSG-26 |

### Fluxo Alternativo 11 — Página não encontrada

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---: | :--- | :---: | :---: | :---: |
| 1 | No passo 2 do FP08, `pageKey` não corresponde a nenhuma tela válida OU schema não encontrado | FP08 | | |
| 2 | Sistema retorna erro 404 | | | |
| 3 | Sistema exibe mensagem: "Página não encontrada." | | | |

### Fluxo de Exceção 05 — Erro de validação no formulário

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---: | :--- | :---: | :---: | :---: |
| 1 | No passo 9 do FP08, um ou mais campos não passam na validação (tipo inválido, tamanho excedido, valor fora do intervalo) | FP08 | | |
| 2 | Sistema exibe toast de erro: "Ocorreu um erro ao salvar." | | | MSG-27 |
| 3 | Sistema permanece na página com os dados preenchidos | | | |

### Fluxo de Exceção 06 — Centro comunitário não configurado

| ID | Passo | Fluxo | Regras de Negócio | Mensagem |
| :---: | :--- | :---: | :---: | :---: |
| 1 | No momento de persistir as configurações, sistema detecta que não há centro comunitário cadastrado | FP08 | RN14 | |
| 2 | Sistema retorna erro 503 | | | |
| 3 | Sistema exibe mensagem: "Centro comunitário não configurado." | | | |

---

## Anexo — Mapa de Telas Customizáveis

| Tela | pageKey | Seções do Schema | Campos |
| :--- | :--- | :--- | :--- |
| Dashboard | `dashboard` | Visibilidade dos Widgets, Textos da Página, Regras de Negócio | 13 campos |
| Página Inicial | `home` | Textos, Funcionalidades, Passos, Navegação e Rodapé | 30 campos |
| Login | `login` | Textos da Tela de Login | 9 campos |
| Gestão de Famílias | `familia` | Textos da Gestão de Famílias | 7 campos |
| Controle de Estoque | `beneficios` | Textos do Controle de Estoque | 5 campos |
