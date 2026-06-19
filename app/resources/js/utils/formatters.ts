export function formatCPF(cpf: string) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.***-$4')
}
export function formatPhone(phone: string) {
  return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
}
export function formatProtocol(protocol: string) {
  return protocol.replace(/(\d{4})(\d{4})/, '$1-$2')
}
export function formatBRL(value: number): string {
  value = value / 100 // Convertendo centavos para reais
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}
export function formatCEP(cep: string | null | undefined) {
  if (!cep) return ''
  return cep.replace(/(\d{5})(\d{3})/, '$1-$2')
}
