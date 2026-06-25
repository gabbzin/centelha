# Regras de Negócio — Centelha

## 1. Autenticação e Controle de Acesso

**RN01.** O sistema deve permitir o cadastro de usuários com e-mail único e senha.

**RN02.** O login deve ser realizado por meio de e-mail e senha válidos.

**RN03.** O sistema deve possuir dois perfis de usuário: **Gestor** (Administrador) e **Operador**.

**RN04.** O acesso às funcionalidades deve ser controlado conforme o perfil do usuário.

**RN05.** O sistema deve permitir a recuperação de senha via e-mail, mediante envio de um token único e temporário.

**RN06.** O token de recuperação deve possuir prazo de expiração e só poderá ser utilizado uma única vez.

**RN07.** As senhas devem ser armazenadas de forma criptografada.

**RN08.** O sistema não deve permitir o auto-cadastro de usuários na tela de login para garantir o controle de acesso institucional.

**RN09.** A criação de novos usuários (Gestores ou Operadores) é uma funcionalidade exclusiva do perfil Gestor.

**RN10.** Usuários inativos não conseguem realizar login, independentemente de credenciais corretas.

**RN11.** O login deve ser bloqueado temporariamente após 5 tentativas falhas consecutivas.

**RN12.** Usuários do perfil Gestor podem acessar as páginas de configuração do sistema (gestão do sistema, aparência, configurações gerais); usuários Operadores não.

**RN13.** Após o login, Gestores são redirecionados à gestão do sistema; Operadores são redirecionados ao dashboard.

---

## 2. Centro Comunitário

**RN14.** O sistema mantém um único centro comunitário, criado automaticamente na primeira configuração.

**RN15.** Um centro comunitário deve possuir nome, localização, slogan, texto de rodapé, família tipográfica e logos.

**RN16.** Um Gestor deve estar vinculado a pelo menos um centro comunitário.

**RN17.** Apenas usuários do perfil Gestor podem cadastrar ou editar dados do centro comunitário.

**RN18.** O sistema permite personalizar 13 propriedades de cor: primária, fundo, superfície, texto primário, texto secundário, texto desabilitado, hover, ativo, sucesso, erro, aviso, informação e botão.

**RN19.** O logotipo aceita formatos SVG, PNG, JPG, JPEG e GIF, com tamanho máximo de 2 MB.

**RN20.** O favicon aceita formatos PNG, JPG, JPEG, ICO e SVG, com tamanho máximo de 1 MB.

**RN21.** O centro pode ser colocado em modo de manutenção, que restringe o acesso ao sistema.

**RN22.** Os links para redes sociais são gerenciados de forma substitutiva — ao salvar, todos os links existentes são removidos e substituídos pelos novos.

---

## 3. Cadastro de Famílias

**RN23.** Uma Família pode ter múltiplos integrantes, sendo um deles o responsável principal.

**RN24.** Não é permitido cadastrar uma família sem responsável principal.

**RN25.** Uma Família pode ser registrada com apenas um endereço.

**RN26.** O CPF do responsável familiar deve ser único no sistema. Não é permitido cadastrar duas famílias com o mesmo CPF.

**RN27.** O sistema deve permitir a ativação e desativação de uma família. A desativação não exclui os dados, apenas altera seu status.

**RN28.** O nome do responsável familiar e dos membros deve ter, no máximo, 100 caracteres.

**RN29.** O CPF (do responsável e dos membros) deve conter exatamente 11 dígitos numéricos. O sistema deve higienizar a entrada removendo caracteres não numéricos.

**RN30.** O telefone de contato do responsável familiar é obrigatório e deve conter entre 10 e 11 dígitos numéricos após higienização.

**RN31.** O e-mail do responsável familiar é opcional; contudo, se informado, deve ser um e-mail válido.

**RN32.** A data de nascimento do responsável e dos membros familiares é obrigatória e deve ser convertida e persistida no formato ISO (YYYY-MM-DD).

**RN33.** O sistema deve impedir o cadastro de responsáveis com menos de 18 anos.

**RN34.** Os campos Logradouro, Número, Bairro e Cidade são obrigatórios para o endereço da família.

**RN35.** A Unidade Federativa (UF) do endereço é obrigatória e deve conter exatamente 2 caracteres.

**RN36.** O CEP deve conter exatamente 8 dígitos numéricos após higienização.

**RN37.** O CEP informado deve conter exatamente 8 dígitos numéricos. O endereço é preenchido manualmente pelo usuário.

**RN38.** A condição de moradia é opcional e restrita aos valores: "própria", "alugada" ou "cedida".

**RN39.** A renda familiar total informada não pode assumir valores negativos, nem ultrapassar R$ 3.500,00.

**RN40.** O sistema armazena a renda familiar em centavos (multiplicada por 100) para precisão monetária.

**RN41.** O indicador de recebimento de auxílio governamental é opcional e restrito aos valores "sim" ou "não".

**RN42.** Cada integrante familiar deve possuir vínculo de parentesco definido (ex: pai, mãe, filho).

**RN43.** O CPF dos membros familiares é obrigatório no cadastro e opcional na edição.

**RN44.** Ao editar uma família, todos os membros existentes são substituídos pelos dados enviados no formulário (exclusão em lote + recriação).

**RN45.** O sistema deve permitir o registro de necessidades específicas e observações para a família por meio de tags gerenciáveis.

---

## 4. Cadastro de Benefícios

**RN46.** Os benefícios devem estar vinculados a um centro comunitário.

**RN47.** O sistema deve permitir a categorização de cada benefício. As categorias disponíveis são: Alimentação, Financeiro, Saúde, Vestuário e Educação.

**RN48.** Um benefício pode estar em um de três estados: Ativo, Revisão ou Inativo. Ao ser criado, assume automaticamente o status Ativo.

**RN49.** O código do benefício deve ser único no sistema e gerado automaticamente no formato "BNF-" seguido de um número sequencial de três dígitos.

**RN50.** O sistema permite controlar a quantidade disponível em estoque de cada benefício.

**RN51.** O estoque é um valor inteiro não negativo, cujo padrão é zero.

**RN52.** O benefício pode ter uma imagem associada nos formatos PNG, JPG, JPEG ou PDF, com tamanho máximo de 5 MB.

**RN53.** O sistema registra automaticamente qual usuário criou cada benefício.

**RN54.** Informações opcionais de doador e data de validade podem ser registradas.

---

## 5. Entrega e Distribuição de Benefícios

**RN55.** Uma Família pode receber múltiplos benefícios.

**RN56.** Os operadores podem vincular benefícios às famílias.

**RN57.** Um benefício somente poderá ser entregue se houver saldo disponível em estoque.

**RN58.** Toda entrega de benefício deve gerar um registro permanente no histórico.

**RN59.** O sistema deve registrar data, hora e usuário responsável por cada entrega.

**RN60.** Toda alteração de estoque deve gerar registro de auditoria.

**RN61.** O sistema deve impedir entregas duplicadas do mesmo benefício para a mesma família dentro de um período de 7 dias.

---

## 6. Integridade e Persistência de Dados

**RN62.** Todos os dados relevantes devem ser armazenados de forma persistente em banco de dados relacional.

**RN63.** Não é permitido excluir registros que estejam vinculados a outros (sem tratamento adequado). Endereço, membros familiares e necessidades específicas são excluídos juntamente com a família via código da aplicação.

**RN64.** O sistema deve registrar logs de autenticação para auditoria e segurança.

---

## 7. Interface e Experiência do Usuário

**RN65.** O sistema deve possuir interface simples, acessível e intuitiva.

**RN66.** As informações devem ser centralizadas para facilitar a gestão.

**RN67.** O cadastro de família é dividido em três etapas sequenciais: (1) identificação do responsável e composição familiar, (2) endereço e condições de moradia, (3) renda e situação econômica.

**RN68.** Cada etapa do formulário só pode ser avançada quando todos os campos obrigatórios da etapa atual forem preenchidos corretamente.

**RN69.** Todos os campos marcados com asterisco (*) são obrigatórios.

**RN70.** Campos como CPF, telefone, CEP e valor monetário devem possuir máscaras que formatam a digitação em tempo real.

**RN71.** A funcionalidade "Lembrar de Mim" deve possuir tempo máximo configurável de sessão.

**RN72.** A listagem de famílias permite busca textual pelo nome do responsável e é paginada em 6 registros por página.

**RN73.** A listagem de benefícios permite busca por nome, código ou categoria, com filtro específico por categoria, e é paginada em 8 registros por página, ordenados do mais recente ao mais antigo.

**RN74.** O sistema deve permitir a exportação de históricos em formato PDF.

---

## 8. Dashboard

**RN75.** O dashboard exibe indicadores de benefícios entregues, famílias atendidas e novos cadastros, incluindo variação percentual em relação ao período anterior.

**RN76.** Benefícios com estoque baixo são destacados com níveis de alerta (atenção ou crítico).

**RN77.** O sistema apresenta ranking dos benefícios mais distribuídos com suas respectivas quantidades.

---

## 9. Entrega de Benefícios

**RN78.** O código da entrega deve ser único e gerado automaticamente no formato "ENT-" seguido de número sequencial de 4 dígitos (ex.: ENT-0001).

**RN79.** O local de retirada é de preenchimento obrigatório no momento da entrega.

**RN80.** A entrega pode ter um comprovante anexado nos formatos PNG, JPG ou PDF, com tamanho máximo de 5 MB.

**RN81.** Uma entrega não pode ser editada nem excluída após registrada. Ajustes de estoque devem ser feitos manualmente.

---

## 10. Customização de Tela

**RN82.** O sistema deve permitir ao Gestor personalizar textos, visibilidade de widgets e regras de negócio de cada tela do sistema individualmente.

**RN83.** As alterações realizadas no formulário de customização devem refletir imediatamente no preview ao lado, sem necessidade de salvar para visualizar.

**RN84.** As configurações de customização são salvas e efetivadas imediatamente ao clicar em "Publicar". Não há estado de rascunho.

**RN85.** Caso uma chave de configuração não exista nas configurações salvas, o sistema deve utilizar o valor padrão definido no arquivo de configuração.

**RN86.** As telas customizáveis são: Dashboard, Página Inicial, Tela de Login, Gestão de Famílias e Controle de Estoque.

---

## 11. Dashboard

**RN87.** O dashboard permite ao usuário selecionar o mês de referência para visualização dos dados através de um seletor de período.

**RN88.** O dashboard exibe um mapa geográfico indicando a distribuição das famílias atendidas.

**RN89.** O dashboard exibe gráfico comparativo de entregas por categoria entre o mês atual e o mês anterior.

---

## 12. Usuários e Tags de Benefício (PENDENTE)

> **Atenção:** Este módulo ainda não foi implementado. As RNs abaixo estão documentadas como especificação futura.

**RN90.** A gestão de usuários e tags de benefício deve estar em uma única tela, dividida em duas seções independentes.

**RN91.** O cadastro de usuário deve conter: nome, tipo de usuário, data de nascimento, e-mail e senha do administrador logado para confirmação.

**RN92.** A exclusão de um usuário é uma funcionalidade exclusiva do perfil Gestor e deve solicitar confirmação antes de ser executada.

**RN93.** O sistema deve permitir o gerenciamento de tags de benefício com nome, descrição, cor e ícone representativo.

**RN94.** Cada tag de benefício deve possuir uma cor selecionável a partir de uma paleta predefinida de 8 cores.

**RN95.** Cada tag de benefício pode possuir um ícone representativo selecionado a partir de uma lista de ícones disponíveis.

---

## 13. Configurações de Usuário (Perfil)

**RN96.** O sistema deve permitir que o usuário edite seu próprio nome e e-mail na página de configurações de perfil.

**RN97.** O sistema deve permitir que o usuário altere sua própria senha mediante confirmação da senha atual.

**RN98.** O sistema deve permitir que o usuário exclua sua própria conta após confirmar a senha.

---

## 14. Aparência e Tema

**RN99.** O sistema deve oferecer alternância entre os temas claro, escuro e automático (segue o sistema operacional), armazenando a preferência no navegador.

---

## 15. Infraestrutura e Armazenamento

**RN100.** O sistema deve utilizar cache de dados com mecanismo de invalidação por versão, incrementada a cada alteração nos dados cacheados.

**RN101.** O sistema deve armazenar arquivos (imagens de benefícios, comprovantes de entrega) em storage S3-compatível (MinIO), com fallback para disco local quando indisponível.

---

## 16. APIs e Integrações

**RN102.** O sistema deve expor um endpoint JSON para busca de famílias por nome ou CPF para autocomplete, limitado a 20 resultados e apenas famílias ativas.

---

## 17. Relatórios e Exportação

**RN103.** Os PDFs gerados pelo sistema (comprovantes de entrega, relatórios) devem aplicar a identidade visual do centro comunitário (logotipo, cores, fontes).

---

## 18. Auditoria

**RN104.** O sistema deve registrar movimentações de estoque com referência polimórfica (tipo e ID do registro originador) e motivo da movimentação.
