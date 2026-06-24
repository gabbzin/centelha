# Requisitos do Sistema — Centelha

## Requisitos Funcionais

### 1. Autenticação e Controle de Acesso

**RF01.** O sistema deve permitir o cadastro de usuários operadores (Gestor e Operador).
**RF02.** O sistema deve permitir a autenticação de usuários via e-mail e senha.
**RF03.** O sistema deve permitir a recuperação de senha via e-mail com token temporário.
**RF04.** O sistema deve controlar o acesso às funcionalidades conforme o perfil do usuário (Gestor ou Operador).
**RF05.** O sistema deve bloquear temporariamente o login após 5 tentativas falhas consecutivas.
**RF06.** O sistema deve permitir que o usuário edite seu próprio nome, e-mail e senha.
**RF07.** O sistema deve permitir que o usuário exclua sua própria conta.
**RF08.** O sistema deve permitir que usuários Gestores criem, editem e desativem outros usuários.
**RF09.** O sistema não deve permitir o auto-cadastro de usuários na tela de login.

### 2. Centro Comunitário

**RF10.** O sistema deve permitir o cadastro do centro comunitário (único por instância).
**RF11.** O sistema deve permitir a edição dos dados do centro comunitário (nome, localização, slogan, rodapé, logos).
**RF12.** O sistema deve permitir a personalização de identidade visual (cores, tipografia, logotipo).
**RF13.** O sistema deve permitir colocar o centro em modo de manutenção.
**RF14.** O sistema deve vincular usuários a um centro comunitário.
**RF15.** Apenas usuários do perfil Gestor podem cadastrar ou editar dados do centro comunitário.

### 3. Famílias

**RF16.** O sistema deve permitir o cadastro de famílias com responsável principal e seus membros.
**RF17.** O sistema deve permitir a edição das informações das famílias (substituição em lote dos membros).
**RF18.** O sistema deve permitir a visualização das famílias cadastradas com busca e paginação.
**RF19.** O sistema deve permitir ativar ou desativar uma família (desativação não exclui dados).
**RF20.** O sistema deve impedir o cadastro de famílias duplicadas pelo CPF do responsável.
**RF21.** O sistema deve registrar dados socioeconômicos da família (renda, condição de moradia, auxílio governamental, necessidades específicas).

### 4. Membros Familiares

**RF22.** O sistema deve permitir o cadastro de membros familiares vinculados a uma família.
**RF23.** O sistema deve permitir a edição de membros familiares.
**RF24.** O sistema deve permitir a exclusão de membros familiares.
**RF25.** O sistema deve identificar o responsável familiar (obrigatório no cadastro).
**RF26.** O sistema deve registrar o grau de parentesco de cada membro.

### 5. Endereço

**RF27.** O sistema deve permitir o cadastro de endereços.
**RF28.** O sistema deve vincular cada família a um único endereço.
**RF29.** O sistema deve permitir a atualização de dados do endereço.
**RF30.** O endereço é excluído juntamente com a família via código da aplicação.

### 6. Benefícios

**RF31.** O sistema deve permitir o cadastro de benefícios com categorias (Alimentação, Financeiro, Saúde, Vestuário, Educação).
**RF32.** O sistema deve permitir a edição das informações dos benefícios.
**RF33.** O sistema deve permitir a exclusão de benefícios.
**RF34.** O sistema deve controlar a quantidade disponível em estoque de cada benefício (valor inteiro não negativo).
**RF35.** O sistema deve gerar código único automaticamente para cada benefício (formato "BNF-" + sequencial de 3 dígitos).
**RF36.** O sistema deve permitir associar imagem, doador e data de validade ao benefício.
**RF37.** O sistema deve registrar o usuário que criou cada benefício.

### 7. Entrega e Distribuição de Benefícios

**RF38.** O sistema deve registrar a entrega de benefícios às famílias.
**RF39.** O sistema deve permitir a consulta do histórico de entregas.
**RF40.** O sistema deve gerar código único para cada entrega (formato "ENT-" + sequencial de 4 dígitos).
**RF41.** O sistema deve impedir entregas sem saldo disponível em estoque.
**RF42.** O sistema deve impedir entregas duplicadas do mesmo benefício para a mesma família em até 7 dias.
**RF43.** O sistema deve registrar data, hora e usuário responsável por cada entrega.
**RF44.** O sistema deve permitir anexar comprovante à entrega.
**RF45.** Uma entrega não pode ser editada nem excluída após registrada.
**RF46.** O sistema deve registrar local de retirada obrigatório no momento da entrega.

### 8. Dashboard e Relatórios

**RF47.** O sistema deve exibir dashboard com indicadores (benefícios entregues, famílias atendidas, novos cadastros).
**RF48.** O sistema deve destacar benefícios com estoque baixo (níveis de alerta).
**RF49.** O sistema deve exibir ranking dos benefícios mais distribuídos.
**RF50.** O sistema deve exibir mapa geográfico da distribuição das famílias.
**RF51.** O sistema deve exibir gráfico comparativo de entregas por categoria entre meses.
**RF52.** O sistema deve permitir exportação de históricos em formato PDF com identidade visual do centro.

### 9. Auditoria e Logs

**RF53.** O sistema deve registrar logs de autenticação para auditoria e segurança.
**RF54.** O sistema deve registrar movimentações de estoque com referência polimórfica e motivo.
**RF55.** O sistema deve registrar data, hora e autor de cada operação de cadastro, edição e exclusão de benefícios e entregas.

### 10. Customização e Configuração

**RF56.** O sistema deve permitir ao Gestor personalizar textos, visibilidade de widgets e regras de negócio de cada tela.
**RF57.** As alterações de customização devem refletir em preview em tempo real.
**RF58.** O sistema deve oferecer alternância entre temas claro, escuro e automático.
**RF59.** O sistema deve gerenciar redes sociais do centro comunitário (substituição em lote).
**RF60.** O sistema deve gerenciar tags de benefício (nome, descrição, cor, ícone).

---

## Requisitos Não Funcionais

### Segurança

**RNF01.** O sistema deve armazenar senhas de forma criptografada (hash seguro).
**RNF02.** O sistema deve utilizar tokens seguros para recuperação de senha com tempo de expiração.
**RNF03.** O token de recuperação deve possuir tempo de expiração e uso único.
**RNF04.** O sistema deve bloquear login temporariamente após 5 tentativas falhas consecutivas.
**RNF05.** O sistema deve controlar o acesso por perfil (RBAC), garantindo que usuários não autorizados não acessem funcionalidades restritas.
**RNF06.** O sistema deve higienizar entradas do usuário para prevenir ataques de injeção (SQL, XSS).

### Mensageria

**RNF07.** O sistema deve centralizar todas as mensagens exibidas ao usuário em um catálogo único com códigos identificadores (MSG-01 a MSG-N).
**RNF08.** Cada mensagem deve possuir tipo associado (success, error, info, warning) para definir o ícone e estilo do toast exibido.
**RNF09.** As mensagens devem ser definidas em constantes sincronizadas entre backend (PHP) e frontend (TypeScript).
**RNF10.** O sistema deve exibir mensagens ao usuário via toasts (SweetAlert2) disparados automaticamente a partir de flash data da sessão ou diretamente do frontend.
**RNF11.** Mensagens de erro de rede devem ser capturadas globalmente e exibir MSG-08.

### Privacidade e LGPD

**RNF12.** O sistema deve permitir a exclusão lógica de dados pessoais de famílias conforme direito do titular.
**RNF13.** O sistema não deve expor dados pessoais (CPF, telefone, e-mail) em URLs ou logs não criptografados.

### Performance

**RNF14.** O sistema deve responder às requisições CRUD em até 500ms.
**RNF15.** O sistema deve responder às requisições de relatório/dashboard em até 3 segundos.
**RNF16.** O sistema deve suportar múltiplos acessos simultâneos sem degradação significativa.

### Disponibilidade e Confiabilidade

**RNF17.** O sistema deve armazenar dados de forma persistente em banco de dados relacional.
**RNF18.** O sistema deve utilizar cache com mecanismo de invalidação por versão.
**RNF19.** O sistema deve armazenar arquivos em storage S3-compatível com fallback para disco local.
**RNF20.** O sistema deve realizar backup periódico dos dados.

### Usabilidade e Acessibilidade

**RNF21.** O sistema deve possuir interface responsiva, adaptando-se a dispositivos mobile e tablet.
**RNF22.** O sistema deve seguir diretrizes de acessibilidade WCAG 2.1 nível AA.
**RNF23.** O sistema deve ser acessível via navegadores web modernos (Chrome, Firefox, Edge, Safari).
**RNF24.** O sistema deve possuir formulários com validação em tempo real e máscaras de entrada (CPF, telefone, CEP, valor monetário).
**RNF25.** O sistema deve organizar formulários complexos em etapas sequenciais com validação por etapa.

### Manutenibilidade

**RNF26.** O sistema deve possuir código modular e seguir boas práticas de programação.
**RNF27.** O sistema deve possuir logs estruturados para depuração e monitoramento.

### Infraestrutura

**RNF28.** O sistema deve expor endpoint JSON para busca de famílias por nome/CPF (autocomplete, limitado a 20 resultados).
**RNF29.** O sistema deve registrar logs de autenticação para auditoria.
