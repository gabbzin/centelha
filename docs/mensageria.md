# Mensageria — Centelha

Catálogo centralizado de mensagens do sistema.

## Estrutura

Toda mensagem possui:

| Campo | Descrição |
|---|---|
| **Código** | Identificador único (`MSG-{NN}`) |
| **Mensagem** | Texto exibido ao usuário |
| **Tipo** | `success` / `error` / `info` / `warning` |
| **Origem** | Onde a mensagem é disparada |
| **Contexto** | Em qual fluxo a mensagem aparece |

---

## Catálogo de Mensagens

### Autenticação

| Código | Mensagem | Tipo | Origem | Contexto |
|--------|----------|------|--------|----------|
| MSG-01 | Login realizado com sucesso! | success | Backend (AuthenticatedSessionController) | Redirecionamento pós-login |
| MSG-02 | E-mail de recuperação enviado! | success | Backend (PasswordResetLinkController) | Solicitação de reset de senha |
| MSG-03 | Senha alterada com sucesso! | success | Backend (NewPasswordController) | Reset de senha concluído |
| MSG-04 | E-mail ou senha incorretos. | error | Backend (LoginRequest) | Falha na autenticação |
| MSG-05 | Verifique o e-mail informado. | info | Backend (PasswordResetLinkController) | E-mail não encontrado no reset |
| MSG-06 | Link de recuperação inválido ou expirado. | error | Backend (NewPasswordController) | Token de reset inválido/expirado |
| MSG-07 | Senhas não coincidem. | error | Frontend (formulário reset senha) | Validação de confirmação de senha |
| MSG-08 | Verifique sua conexão de Internet. | error | Frontend (global) | Falha de rede em requisições |
| MSG-09 | Conta Desativada. | error | Backend (LoginRequest) | Usuário com `ativo = false` |
| MSG-10 | Aguarde 30 segundos e tente novamente. | warning | Backend (LoginRequest - rate limiter) | Excedeu 5 tentativas de login |
| MSG-11 | Um link de redefinição será enviado para o e-mail informado. | info | Backend (PasswordResetLinkController) | Confirmação de envio (sempre exibido, por segurança) |
| MSG-12 | Token Expirado. | error | Backend (NewPasswordController) | Token de reset expirou |
| MSG-13 | Token Inválido. | error | Backend (NewPasswordController) | Token de reset não encontrado |

### Família

| Código | Mensagem | Tipo | Origem | Contexto |
|--------|----------|------|--------|----------|
| MSG-14 | Informações da família atualizadas com sucesso. | success | Backend (FamilyController) | Edição de família concluída |
| MSG-15 | Campo inválido. | error | Frontend (formulário família - zod) | Validação de campo no formulário |
| MSG-16 | Cadastro realizado com sucesso! | success | Backend (FamilyController) | Cadastro de família concluído |
| MSG-17 | Este CPF já está cadastrado no sistema. | error | Backend (StoreFamilyRequest) | CPF duplicado |
| MSG-18 | Informações da família atualizadas com sucesso. | success | Backend (FamilyController) | (duplicata MSG-14, manter por compatibilidade) |
| MSG-19 | Família desativada com sucesso. | success | Backend (FamilyController) | Desativação de família |

---

## Mapa de Mensagens vs Componentes

| Componente / Controller | Mensagens |
|------------------------|-----------|
| `LoginRequest.php` | MSG-04, MSG-09, MSG-10 |
| `AuthenticatedSessionController.php` | MSG-01 |
| `PasswordResetLinkController.php` | MSG-02, MSG-05, MSG-11 |
| `NewPasswordController.php` | MSG-03, MSG-06, MSG-12, MSG-13 |
| `FamilyController.php` | MSG-14, MSG-16, MSG-18, MSG-19 |
| `StoreFamilyRequest.php` | MSG-17 |
| `family-form.tsx` (frontend) | MSG-15 |
| `login.tsx` (frontend) | MSG-07 |
| `axios` interceptor (frontend) | MSG-08 |

---

## Convenção de Uso

### Backend (PHP — Laravel)

```php
// Flash message na sessão (redirect)
return redirect()
    ->route('family')
    ->with('msg', MSG_14);

// Erro de validação
throw ValidationException::withMessages([
    'cpf' => MSG_17,
]);
```

### Frontend (TypeScript — React)

```tsx
import { messages } from '@/lib/messages'
import { toaster } from '@/components/toasters/toast-alert'

// Sucesso
toaster.createSuccess(messages.MSG_14)

// Erro
toaster.createError(messages.MSG_15)

// Info
toaster.createInfo(messages.MSG_11)
```

### Constantes Compartilhadas

As mensagens devem ser definidas em **dois lugares sincronizados**:

| Plataforma | Arquivo | Formato |
|------------|---------|---------|
| Backend | `app/Constants/Messages.php` | Constantes PHP (`MSG_14 = 'MSG-14'`) |
| Frontend | `resources/js/lib/messages.ts` | Objeto TypeScript com código e texto |
