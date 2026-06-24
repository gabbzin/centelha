export type MessageCode =
  | 'MSG_01' | 'MSG_02' | 'MSG_03' | 'MSG_04' | 'MSG_05'
  | 'MSG_06' | 'MSG_07' | 'MSG_08' | 'MSG_09' | 'MSG_10'
  | 'MSG_11' | 'MSG_12' | 'MSG_13' | 'MSG_14' | 'MSG_15'
  | 'MSG_16' | 'MSG_17' | 'MSG_18' | 'MSG_19'

interface MessageEntry {
  code: string
  text: string
  type: 'success' | 'error' | 'info' | 'warning'
}

export const MESSAGES: Record<MessageCode, MessageEntry> = {
  MSG_01: { code: 'MSG-01', text: 'Login realizado com sucesso!', type: 'success' },
  MSG_02: { code: 'MSG-02', text: 'E-mail de recuperação enviado!', type: 'success' },
  MSG_03: { code: 'MSG-03', text: 'Senha alterada com sucesso!', type: 'success' },
  MSG_04: { code: 'MSG-04', text: 'E-mail ou senha incorretos.', type: 'error' },
  MSG_05: { code: 'MSG-05', text: 'Verifique o e-mail informado.', type: 'info' },
  MSG_06: { code: 'MSG-06', text: 'Link de recuperação inválido ou expirado.', type: 'error' },
  MSG_07: { code: 'MSG-07', text: 'Senhas não coincidem.', type: 'error' },
  MSG_08: { code: 'MSG-08', text: 'Verifique sua conexão de Internet.', type: 'error' },
  MSG_09: { code: 'MSG-09', text: 'Conta Desativada.', type: 'error' },
  MSG_10: { code: 'MSG-10', text: 'Aguarde 30 segundos e tente novamente.', type: 'warning' },
  MSG_11: { code: 'MSG-11', text: 'Um link de redefinição será enviado para o e-mail informado.', type: 'info' },
  MSG_12: { code: 'MSG-12', text: 'Token Expirado.', type: 'error' },
  MSG_13: { code: 'MSG-13', text: 'Token Inválido.', type: 'error' },
  MSG_14: { code: 'MSG-14', text: 'Informações da família atualizadas com sucesso.', type: 'success' },
  MSG_15: { code: 'MSG-15', text: 'Campo inválido.', type: 'error' },
  MSG_16: { code: 'MSG-16', text: 'Cadastro realizado com sucesso!', type: 'success' },
  MSG_17: { code: 'MSG-17', text: 'Este CPF já está cadastrado no sistema.', type: 'error' },
  MSG_18: { code: 'MSG-18', text: 'Informações da família atualizadas com sucesso.', type: 'success' },
  MSG_19: { code: 'MSG-19', text: 'Família desativada com sucesso.', type: 'success' },
}

export function getMessage(code: MessageCode): MessageEntry {
  return MESSAGES[code]
}

export function getMessageText(code: MessageCode): string {
  return MESSAGES[code].text
}
