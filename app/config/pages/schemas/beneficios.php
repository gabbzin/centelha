<?php

return [
    'sections' => [
        [
            'title' => 'Textos do Controle de Estoque',
            'fields' => [
                ['key' => 'texts.page_title', 'label' => 'Título da página', 'type' => 'string', 'max' => 80],
                ['key' => 'texts.section_title', 'label' => 'Título da seção', 'type' => 'string', 'max' => 60],
                ['key' => 'texts.section_subtitle', 'label' => 'Subtítulo da seção', 'type' => 'textarea', 'max' => 150],
                ['key' => 'texts.search_placeholder', 'label' => 'Placeholder da busca', 'type' => 'string', 'max' => 50],
                ['key' => 'texts.add_button', 'label' => 'Botão adicionar', 'type' => 'string', 'max' => 40],
            ],
        ],
    ],
];
