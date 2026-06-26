<?php

return [
    'sections' => [
        [
            'title' => 'Textos da Tela de Entregas',
            'fields' => [
                ['key' => 'texts.page_title', 'label' => 'Título da página', 'type' => 'string', 'max' => 80],
                ['key' => 'texts.page_description', 'label' => 'Descrição da página', 'type' => 'textarea', 'max' => 200],
                ['key' => 'texts.section_title', 'label' => 'Título da seção', 'type' => 'string', 'max' => 60],
                ['key' => 'texts.card_title', 'label' => 'Título do card', 'type' => 'string', 'max' => 60],
                ['key' => 'texts.search_placeholder', 'label' => 'Placeholder da busca', 'type' => 'string', 'max' => 60],
                ['key' => 'texts.new_button', 'label' => 'Botão "Nova entrega"', 'type' => 'string', 'max' => 40],
                ['key' => 'texts.empty_state', 'label' => 'Texto quando vazio', 'type' => 'string', 'max' => 100],
                ['key' => 'texts.export_button', 'label' => 'Botão exportar', 'type' => 'string', 'max' => 60],
                ['key' => 'texts.export_current_month', 'label' => 'Exportar mês atual', 'type' => 'string', 'max' => 60],
                ['key' => 'texts.export_selected_period', 'label' => 'Exportar período selecionado', 'type' => 'string', 'max' => 60],
            ],
        ],
    ],
];
