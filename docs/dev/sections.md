# Mapeamento de Seções das Telas

> Inventário de todas as seções, componentes, textos e regras de negócio do sistema
> que podem ser customizados dinamicamente via JSON de settings.

---

## Convenção

```
Pagina:
  secoes:
    nome-da-secao:
      ativa: true|false              # se pode ser ocultada
      titulo_secao: "..."            # título da seção (se houver)
      descricao_secao: "..."         # descrição da seção (se houver)
      componentes:
        id-componente:
          titulo: "..."              # título customizável
          descricao: "..."           # descrição customizável
          placeholder: "..."         # placeholder customizável
      regras:
        nome_regra: valor            # regras de negócio configuráveis
  textos_pagina:
    titulo: "..."                    # titlePage / tagTitle
    subtitulo: "..."                 # descriptionPage
```

---

## 1. Dashboard (`/dashboard`)

```yaml
Dashboard:
  secoes:
    stats-cards:
      ativa: true
      titulo_secao: "Indicadores"
      descricao_secao: "Cards com métricas principais do período"
      componentes:
        card_beneficios_entregues:
          titulo: "Benefícios Entregues"
        card_familias_atendidas:
          titulo: "Famílias Atendidas"
        card_novos_cadastros:
          titulo: "Novos Cadastros"

    mapa:
      ativa: true
      componentes:
        mapa_distribuicao:
          titulo: "Mapa de Distribuição"

    alert-card:
      ativa: true
      titulo_secao: "Alertas de baixo estoque"
      regras:
        limite_estoque_baixo: 50

    top-itens-card:
      ativa: true
      titulo_secao: "Top itens em estoque"

    grafico-comparativo:
      ativa: true
      titulo_secao: "Comparativo de Entregas por Categoria (Mês Atual x Anterior)"
      componentes:
        label_mes_anterior: "Mês anterior (maio)"
        label_mes_atual: "Mês atual (junho)"

    seletor-periodo:
      ativa: true
      componentes:
        option_mes_1:
          label: "Maio 2026"
        option_mes_2:
          label: "Junho 2026"

  textos_pagina:
    titulo: "Dashboard"
    titulo_pagina: "Visão Geral do Dashboard"
    subtitulo: "Acompanhamento estratégico das operações da Centelha"
```

---

## 2. Benefícios / Estoque (`/beneficios`)

```yaml
Beneficios:
  secoes:
    header-secao:
      ativa: true
      componentes:
        titulo_secao:
          titulo: "Catálogo de Benefícios"
        subtitulo_secao:
          titulo: "Gerencie os benefícios disponíveis para distribuição às famílias."

    filtros:
      ativa: true
      componentes:
        campo_busca:
          placeholder: "Buscar por benefícios..."
        filtro_categoria:
          titulo: "Categoria"

    tabela:
      ativa: true
      componentes:
        coluna_codigo:
          titulo: "CÓDIGO"
        coluna_beneficio:
          titulo: "BENEFÍCIO"
        coluna_categoria:
          titulo: "CATEGORIA"
        coluna_estoque:
          titulo: "EM ESTOQUE"
        coluna_acoes:
          titulo: "AÇÕES"
      regras:
        page_size: 8
        low_stock_threshold: 20

    modal-criar-beneficio:
      ativa: true
      componentes:
        titulo_modal:
          titulo: "Registrar novo benefício"
        descricao_modal:
          titulo: "Preencha os campos abaixo para cadastrar um novo benefício no catálogo."
        campo_nome:
          label: "Nome do Benefício"
        campo_categoria:
          label: "Categoria"
        campo_quantidade:
          label: "Quantidade a ser adicionada"
          regras:
            min: 1
            max: 999
        campo_doador:
          label: "Doador/Origem"
        campo_validade:
          label: "Validade"
        campo_responsavel:
          label: "Responsável por registrar (preenchido automaticamente)"
        campo_observacoes:
          label: "Observações Adicionais"
        campo_imagem:
          label: "Imagem do Benefício"
          regras:
            max_size_mb: 5
            formatos_aceitos: ["image/png", "image/jpeg", "application/pdf"]

  textos_pagina:
    titulo: "Benefícios"
```

---

## 3. Home / Landing Page (`/`)

```yaml
Home:
  secoes:
    navbar:
      ativa: true
      componentes:
        link_inicio:
          titulo: "Início"
        link_beneficios:
          titulo: "Benefícios"
        link_como_funciona:
          titulo: "Como Funciona"
        botao_entrar:
          titulo: "Entrar"
        botao_comecar:
          titulo: "Começar"

    hero-section:
      ativa: true
      componentes:
        titulo:
          titulo: "Transforme a gestão do seu centro comunitário em impacto real."
        subtitulo:
          titulo: "Centralize dados, organize doações e transforme a gestão do seu centro comunitário com uma plataforma simples e poderosa."
        botao_cta:
          titulo: "Começar Agora"

    about-section:
      ativa: true
      componentes:
        titulo:
          titulo: "Chega de planilhas perdidas e processos manuais."
        marca:
          titulo: "Centelha+"

    steps-section:
      ativa: true
      titulo_secao: "Quatro passos para uma gestão de excelência."
      componentes:
        passo_1:
          titulo: "Cadastre sua comunidade em minutos."
        passo_2:
          titulo: "Organize seus fluxos e doações."
        passo_3:
          titulo: "Engaje voluntários e famílias."
        passo_4:
          titulo: "Acompanhe o impacto com dados reais."

    features-section:
      ativa: true
      componentes:
        feature_gestao_eventos:
          titulo: "Gestão de Eventos Sem Caos"
          descricao: "..." # (texto descritivo da feature)
        feature_beneficios:
          titulo: "Benefícios com Transparência Total"
          descricao: "..."
        feature_nenhuma_familia:
          titulo: "Nenhuma Família Esquecida"
          descricao: "..."

    final-cta-section:
      ativa: true
      componentes:
        titulo:
          titulo: "Pronto para modernizar seu centro social?"
        botao:
          titulo: "Cadastrar Meu Centro Agora"
        texto_apoio:
          titulo: "Sem necessidade de cartão de crédito. Teste grátis por 14 dias."

    footer:
      ativa: true
      componentes:
        coluna_produto:
          titulo: "Produto"
          links:
            - "Funcionalidades"
            - "Demonstração"
            - "Preços"
            - "Atualizações"
        coluna_empresa:
          titulo: "Empresa"
          links:
            - "Sobre Nós"
            - "Impacto Social"
            - "Contato"
            - "Blog"
        coluna_legal:
          titulo: "Legal"
          links:
            - "Termos de Uso"
            - "Política de Privacidade"
            - "Segurança de Dados"
        creditos_dev:
          titulo: "Desenvolvido com 💙 pela equipe {name}"
```

---

## 4. Admin — Gestão do Sistema (`/gestao-sistema`)

```yaml
GestaoSistema:
  secoes:
    cards-sistema:
      ativa: true
      componentes:
        card_configuracoes_gerais:
          titulo: "Configurações Gerais"
          descricao: "Gestão de voluntários/agentes e vinculação de famílias para atendimento focado."
          label_acao: "Configurar"
        card_aparencia:
          titulo: "Aparência"
          descricao: "Personalize as cores utilizadas na interface da plataforma {name}."
          label_acao: "Configurar"
        card_usuarios_beneficios:
          titulo: "Usuários e Benefícios"
          descricao: "Gerencie usuários, perfis de acesso e permissões da plataforma {name}."
          label_acao: "Configurar"
        card_customizacao_tela:
          titulo: "Painel de Customização por tela"
          descricao: "Painel de Customização da tela, onde pode ser alterado textos e informações de uma tela específica."
          label_acao: "Selecionar tela"

  textos_pagina:
    titulo: "Gestão Global do Sistema"
    titulo_pagina: "Gestão Global do Sistema"
    subtitulo: "Gerencie acessos, módulos e configurações fundamentais da plataforma {name}."
```

---

## 5. Admin — Aparência / Cores (`/gestao-sistema/aparencia`)

```yaml
GestaoSistemaAparencia:
  secoes:
    cores-principais:
      ativa: true
      titulo_secao: "Cores principais"
      componentes:
        cor_primaria:
          label: "Cor primária"
        cor_fundo:
          label: "Cor de Fundo"
        cor_superficie:
          label: "Cor da Superfície"

    tipografia:
      ativa: true
      titulo_secao: "Tipografia"
      componentes:
        texto_principal:
          label: "Texto Principal"
        texto_secundario:
          label: "Texto Secundário"
        texto_desabilitado:
          label: "Texto desabilitado"

    interacoes:
      ativa: true
      titulo_secao: "Interações"
      componentes:
        cor_hover:
          label: "Cor de Hover"
        cor_ativo:
          label: "Cor de Ativo"
        cor_botao:
          label: "Cor de Botão ou Primário forte"

    status-sistema:
      ativa: true
      titulo_secao: "Status do Sistema"
      componentes:
        sucesso:
          label: "Sucesso"
        erro:
          label: "Erro"
        aviso:
          label: "Aviso"
        informacao:
          label: "Informação"

  textos_pagina:
    titulo: "Aparência"
    titulo_pagina: "Cores do sistema"
    subtitulo: "Personalize as cores utilizadas na interface da plataforma Centelha."
    botoes:
      restaurar_padrao: "Restaurar Padrão"
      salvar: "Salvar Alterações"
      salvando: "Salvando..."
```

---

## 6. Admin — Configurações Gerais (`/gestao-sistema/configuracoes-gerais`)

```yaml
GestaoSistemaConfiguracoes:
  secoes:
    identidade-visual:
      ativa: true
      titulo_secao: "Identidade Visual"
      componentes:
        upload_logo:
          label: "Logo da plataforma"
        upload_favicon:
          label: "Favicon"
        seletor_fonte:
          label: "Fonte da plataforma"
          regras:
            opcoes: ["Poppins", "Roboto", "Open Sans"]

    textos-interface:
      ativa: true
      titulo_secao: "Textos da Interface"
      componentes:
        nome_plataforma:
          label: "NOME DA PLATAFORMA"
          regras:
            max_chars: 50
        slogan:
          label: "SLOGAN / DESCRIÇÃO CURTA"
          regras:
            max_chars: 100
        texto_rodape:
          label: "TEXTO RODAPÉ"
          regras:
            max_chars: 200

    redes-sociais:
      ativa: true
      titulo_secao: "Redes Sociais"
      componentes:
        campo_url:
          placeholder: "Digite a url da rede social"
          regras:
            max_chars: 255
        botao_adicionar:
          titulo: "ADICIONAR REDE SOCIAL"

    manutencao:
      ativa: true
      titulo_secao: "Manutenção da Plataforma"
      componentes:
        toggle_maintenance:
          label: "Modo de manutenção"

  textos_pagina:
    titulo: "Configurações Gerais"
    titulo_pagina: "Configurações Visuais e Textos"
    subtitulo: "Gerencie a identidade da marca e as comunicações textuais da plataforma."
    botoes:
      cancelar: "Cancelar"
      salvar: "Salvar Alterações"
```

---

## 7. Famílias — Listagem (`/family`)

```yaml
FamiliaListagem:
  secoes:
    header:
      ativa: true
      componentes:
        titulo_secao:
          titulo: "Gestão de Famílias"
        descricao_secao:
          titulo: "Gerencie e acompanhe o cadastro das famílias atendidas pela rede {name}"
        botao_adicionar:
          label: "Nova Família +"

    busca:
      ativa: true
      componentes:
        campo_busca:
          placeholder: "Buscar família..."

    grid-cards:
      ativa: true
      regras:
        pagination_page_size: 6

  textos_pagina:
    titulo: "Módulo Família"
```

---

## 8. Famílias — Detalhes (`/family/{id}`)

```yaml
FamiliaDetalhes:
  secoes:
    informacoes-pessoais:
      ativa: true
      titulo_secao: "Informações Pessoais"
      componentes:
        label_nome:
          label: "Nome do responsável"
        label_cpf:
          label: "CPF"
        label_status:
          label: "Status"
        label_telefone:
          label: "Telefone"

    dados-socioeconomicos:
      ativa: true
      titulo_secao: "Dados Socioeconômicos"
      componentes:
        label_recebe_auxilio:
          label: "Recebe Auxílio"
        label_tipo_moradia:
          label: "Tipo de moradia"
        label_fonte_renda:
          label: "Fonte de Renda Principal"
        label_renda_total:
          label: "Renda total"

    endereco:
      ativa: true
      titulo_secao: "Endereço Residencial"
      componentes:
        label_logradouro:
          label: "Logradouro"
        label_bairro:
          label: "Bairro / Comunidade"
        label_cep:
          label: "CEP"
        label_cidade_uf:
          label: "Cidade/UF"

    composicao-familiar:
      ativa: true
      titulo_secao: "Composição Familiar"

    historico-beneficios:
      ativa: true
      titulo_secao: "Histórico de Benefícios"

    acoes:
      ativa: true
      componentes:
        botao_editar:
          titulo: "Editar informações"
        botao_ativar_desativar:
          titulo_quando_ativo: "Desativar Família"
          titulo_quando_inativo: "Ativar Família"
        botao_voltar:
          titulo: "Voltar"
        botao_nova_entrega:
          titulo: "Registrar nova entrega"

  textos_pagina:
    titulo: "Informações da Família"
    titulo_pagina: "Detalhes da Família"
```

---

## 9. Famílias — Cadastro (`/family/register`)

```yaml
FamiliaCadastro:
  secoes:
    steps-sidebar:
      ativa: true
      componentes:
        step_1:
          titulo: "01 Identificação e Família"
        step_2:
          titulo: "02 Endereço"
        step_3:
          titulo: "03 Renda"

    step-1-identificacao:
      ativa: true
      titulo_secao: "Dados do responsável familiar e informações da família"
      descricao_secao: "Preencha as informações principais do titular do cadastro e da sua família"
      regras:
        cpf_digitos: 11
        telefone_digitos_min: 10
        telefone_digitos_max: 11

    step-2-endereco:
      ativa: true
      titulo_secao: "Endereço"
      descricao_secao: "Preencha as informações de endereço do responsável familiar"
      regras:
        cep_digitos: 8

    step-3-renda:
      ativa: true
      titulo_secao: "Renda e Situação Econômica"
      descricao_secao: "Informe os dados financeiros e recebimento de benefícios sociais para finalizar o cadastro"

    botoes:
      ativa: true
      componentes:
        voltar:
          titulo: "Voltar"
        proximo:
          titulo: "Próximo Passo"
        finalizar:
          titulo: "Finalizar Cadastro"
```

---

## 10. Login (`/login`)

```yaml
Login:
  secoes:
    card-login:
      ativa: true
      componentes:
        titulo:
          titulo: "Bem-vindo ao {name}"
        subtitulo:
          titulo: "Acesse sua conta para gerenciar as atividades comunitárias."
        campo_email:
          label: "E-mail"
          placeholder: "nome@exemplo.com.br"
        campo_senha:
          label: "Senha"
          placeholder: "Sua senha"
        link_esqueci_senha:
          titulo: "Esqueceu sua senha?"
        checkbox_lembrar:
          label: "Lembrar de mim"
        botao_entrar:
          titulo: "Entrar"

  textos_pagina:
    titulo: "Entrar"
```

---

## 11. Register (`/register`)

```yaml
Register:
  secoes:
    card-register:
      ativa: true
      componentes:
        titulo:
          titulo: "Create an account"
        descricao:
          titulo: "Enter your details below to create your account"
        campo_nome:
          label: "Name"
        campo_email:
          label: "Email"
        campo_senha:
          label: "Password"
        campo_confirmar_senha:
          label: "Confirm password"
        botao_criar:
          titulo: "Create account"
        link_login:
          titulo: "Already have an account? Log in"

  textos_pagina:
    titulo: "Register"
```

---

## 12. Forgot Password (`/forgot-password`)

```yaml
ForgotPassword:
  secoes:
    card-forgot:
      ativa: true
      componentes:
        titulo:
          titulo: "Forgot password"
        descricao:
          titulo: "Enter your email to receive a password reset link"
        campo_email:
          label: "Email"
        botao_enviar:
          titulo: "Email password reset link"
        link_voltar:
          titulo: "Or, return to log in"

  textos_pagina:
    titulo: "Forgot Password"
```

---

## 13. Reset Password (`/reset-password`)

```yaml
ResetPassword:
  secoes:
    card-reset:
      ativa: true
      componentes:
        titulo:
          titulo: "Reset password"
        descricao:
          titulo: "Please enter your new password below"
        campo_email:
          label: "Email"
        campo_senha:
          label: "Password"
        campo_confirmar_senha:
          label: "Confirm password"
        botao_reset:
          titulo: "Reset password"

  textos_pagina:
    titulo: "Reset Password"
```

---

## 14. Confirm Password (`/confirm-password`)

```yaml
ConfirmPassword:
  secoes:
    card-confirm:
      ativa: true
      componentes:
        titulo:
          titulo: "Confirm your password"
        descricao:
          titulo: "This is a secure area of the application. Please confirm your password before continuing."
        campo_senha:
          label: "Password"
        botao_confirmar:
          titulo: "Confirm password"

  textos_pagina:
    titulo: "Confirm Password"
```

---

## 15. Verify Email (`/verify-email`)

```yaml
VerifyEmail:
  secoes:
    card-verify:
      ativa: true
      componentes:
        titulo:
          titulo: "Verify email"
        descricao:
          titulo: "Please verify your email address by clicking on the link we just emailed to you."
        botao_reenviar:
          titulo: "Resend verification email"
        link_logout:
          titulo: "Log out"

  textos_pagina:
    titulo: "Verify Email"
```

---

## 16. Settings — Profile (`/settings/profile`)

```yaml
SettingsProfile:
  secoes:
    profile-info:
      ativa: true
      titulo_secao: "Profile information"
      descricao_secao: "Update your name and email address"
      componentes:
        campo_nome:
          label: "Name"
        campo_email:
          label: "Email"
        alerta_email_nao_verificado:
          titulo: "Your email is unverified."
          link_reenviar: "Click here to re-send the verification email."
        botao_salvar:
          titulo: "Save"

    delete-account:
      ativa: true
      componentes:
        titulo:
          titulo: "Delete account"
        descricao:
          titulo: "Delete your account and all of its resources"
        aviso:
          titulo: "Warning"
          descricao: "Please proceed with caution, this cannot be undone."
        botao_deletar:
          titulo: "Delete account"

  textos_pagina:
    breadcrumb: "Profile settings"
```

---

## 17. Settings — Password (`/settings/password`)

```yaml
SettingsPassword:
  secoes:
    update-password:
      ativa: true
      titulo_secao: "Update password"
      descricao_secao: "Ensure your account is using a long, random password to stay secure"
      componentes:
        campo_senha_atual:
          label: "Current password"
        campo_nova_senha:
          label: "New password"
        campo_confirmar_senha:
          label: "Confirm password"
        botao_salvar:
          titulo: "Save password"
            texto_sucesso: "Saved"

  textos_pagina:
    breadcrumb: "Password settings"
```

---

## 18. Settings — Appearance (`/settings/appearance`)

```yaml
SettingsAppearance:
  secoes:
    appearance-settings:
      ativa: true
      titulo_secao: "Appearance settings"
      descricao_secao: "Update your account's appearance settings"
      componentes:
        toggle_light:
          titulo: "Light"
        toggle_dark:
          titulo: "Dark"
        toggle_system:
          titulo: "System"

  textos_pagina:
    breadcrumb: "Appearance settings"
```

---

## 19. Settings — Sidebar de navegação

```yaml
SettingsSidebar:
  secoes:
    nav:
      ativa: true
      componentes:
        link_profile:
          titulo: "Profile"
        link_password:
          titulo: "Password"
        link_appearance:
          titulo: "Appearance"

  textos_pagina:
    titulo: "Settings"
    descricao: "Manage your profile and account settings"
```

---

## 20. Sidebar — Menu de navegação principal (global)

```yaml
SidebarNavegacao:
  secoes:
    nav-links:
      ativa: true
      componentes:
        link_dashboard:
          titulo: "Dashboard"
        link_familia:
          titulo: "Família"
        link_beneficios:
          titulo: "Benefícios"
        link_entregas:
          titulo: "Entregas"
        link_gestao:
          titulo: "Gestão"

    footer-user:
      ativa: true
      componentes:
        label_perfil:
          titulo: "VER PERFIL"
```
