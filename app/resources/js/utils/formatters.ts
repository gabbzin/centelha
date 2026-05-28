export function formatCPF(cpf: string) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.***-$4');
}

export function formatProtocol(protocol: string) {
  return protocol.replace(/(\d{4})(\d{4})/, '$1-$2');
}

export function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
