<?php

return [
    'sections' => [
        [
            'title' => 'Textos da Página Inicial',
            'fields' => [
                ['key' => 'texts.main_title', 'label' => 'Título principal', 'type' => 'string', 'max' => 100],
                ['key' => 'texts.slogan', 'label' => 'Slogan', 'type' => 'string', 'max' => 200],
                ['key' => 'texts.features_title', 'label' => 'Título das funcionalidades', 'type' => 'string', 'max' => 100],
                ['key' => 'texts.cta_button', 'label' => 'Botão CTA', 'type' => 'string', 'max' => 50],
                ['key' => 'texts.login_button', 'label' => 'Botão Entrar', 'type' => 'string', 'max' => 50],
            ],
        ],
        [
            'title' => 'Funcionalidades (Features)',
            'fields' => [
                ['key' => 'texts.feature_1_title', 'label' => 'Feature 1 - Título', 'type' => 'string', 'max' => 80],
                ['key' => 'texts.feature_1_desc', 'label' => 'Feature 1 - Descrição', 'type' => 'string', 'max' => 150],
                ['key' => 'texts.feature_2_title', 'label' => 'Feature 2 - Título', 'type' => 'string', 'max' => 80],
                ['key' => 'texts.feature_2_desc', 'label' => 'Feature 2 - Descrição', 'type' => 'string', 'max' => 150],
                ['key' => 'texts.feature_3_title', 'label' => 'Feature 3 - Título', 'type' => 'string', 'max' => 80],
                ['key' => 'texts.feature_3_desc', 'label' => 'Feature 3 - Descrição', 'type' => 'string', 'max' => 150],
            ],
        ],
        [
            'title' => 'Passos',
            'fields' => [
                ['key' => 'texts.steps_title', 'label' => 'Título dos passos', 'type' => 'string', 'max' => 100],
                ['key' => 'texts.step_1_title', 'label' => 'Passo 1 - Título', 'type' => 'string', 'max' => 60],
                ['key' => 'texts.step_2_title', 'label' => 'Passo 2 - Título', 'type' => 'string', 'max' => 60],
                ['key' => 'texts.step_3_title', 'label' => 'Passo 3 - Título', 'type' => 'string', 'max' => 60],
                ['key' => 'texts.step_4_title', 'label' => 'Passo 4 - Título', 'type' => 'string', 'max' => 60],
            ],
        ],
        [
            'title' => 'Navegação e Rodapé',
            'fields' => [
                ['key' => 'texts.nav_home', 'label' => 'Nav - Início', 'type' => 'string', 'max' => 30],
                ['key' => 'texts.nav_benefits', 'label' => 'Nav - Benefícios', 'type' => 'string', 'max' => 30],
                ['key' => 'texts.nav_how_it_works', 'label' => 'Nav - Como Funciona', 'type' => 'string', 'max' => 30],
                ['key' => 'texts.footer_product', 'label' => 'Rodapé - Coluna Produto', 'type' => 'string', 'max' => 30],
                ['key' => 'texts.footer_company', 'label' => 'Rodapé - Coluna Empresa', 'type' => 'string', 'max' => 30],
                ['key' => 'texts.footer_legal', 'label' => 'Rodapé - Coluna Legal', 'type' => 'string', 'max' => 30],
            ],
        ],
    ],
];
