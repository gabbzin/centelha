# Atualização de Requisitos - Cadastro de Família

## 1. Resumo da Atualização
A atualização do módulo de "Cadastro de Família" representa a transição de um cadastro básico para um modelo de profundidade "intermediária". O objetivo principal dessa mudança é permitir uma melhor avaliação do grau de vulnerabilidade socioeconômica das famílias cadastradas, bem como mapear necessidades específicas, garantindo assim um direcionamento mais justo e eficiente de recursos, auxílios e benefícios.

## 2. Novos Campos Adicionados

### Dados do Responsável
- Nome
- CPF
- Data de Nascimento
- Telefone
- Email
- Status

### Dados de Endereço
- CEP
- Logradouro
- Número/Comp
- Bairro
- Cidade/UF

### Dados Socioeconômicos
- Renda Total
- Fonte de Renda
- Auxílio Governamental
- **Condição de Moradia**

### [NOVO] Saúde e Necessidades Específicas
- Tags de Necessidades
- Observações Gerais

### Composição Familiar
- Nome
- Idade/Data de Nascimento
- Grau de Parentesco
- **CPF Opcional**

## 3. Atualização nas Regras de Negócio (RNs)
- **RN26:** O sistema deve permitir o registro de necessidades específicas e observações médicas/alimentares para a família via Tags gerenciáveis.
- **RN27:** O sistema deve utilizar as tags de necessidade e renda para auxiliar na priorização de benefícios.

## 4. Atualização nos Requisitos Funcionais (RFs)
- **RF26:** Implementar interface (CRUD) na Tela de Administração para gerenciar as "Necessidades Específicas" (Tags).
- **RF27:** O formulário de família deve conter seleção múltipla para Necessidades Específicas e campo de texto livre para Observações.
