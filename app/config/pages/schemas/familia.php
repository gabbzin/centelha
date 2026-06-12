<?php

return [
    'sections' => [
        [
            'title' => 'Textos da Gestão de Famílias',
            'fields' => [
                ['key' => 'texts.page_title', 'label' => 'Título da página', 'type' => 'string', 'max' => 80],
                ['key' => 'texts.page_description', 'label' => 'Descrição', 'type' => 'string', 'max' => 200],
                ['key' => 'texts.search_placeholder', 'label' => 'Placeholder da busca', 'type' => 'string', 'max' => 50],
                ['key' => 'texts.new_button', 'label' => 'Botão "Nova Família"', 'type' => 'string', 'max' => 30],
                ['key' => 'texts.empty_state', 'label' => 'Texto quando vazio', 'type' => 'string', 'max' => 100],
                ['key' => 'texts.register_title', 'label' => 'Título do cadastro', 'type' => 'string', 'max' => 60],
                ['key' => 'texts.edit_title', 'label' => 'Título da edição', 'type' => 'string', 'max' => 60],
            ],
        ],
    ],
];
