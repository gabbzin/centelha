<?php

return [
    'sections' => [
        [
            'title' => 'Visibilidade dos Widgets',
            'description' => 'Ativa ou desativa seções inteiras do Dashboard',
            'fields' => [
                [
                    'key' => 'widgets.metrics_cards',
                    'label' => 'Cards de métricas',
                    'type' => 'boolean',
                ],
                [
                    'key' => 'widgets.heat_map',
                    'label' => 'Mapa de distribuição',
                    'type' => 'boolean',
                ],
                [
                    'key' => 'widgets.stock_alerts',
                    'label' => 'Alertas de baixo estoque',
                    'type' => 'boolean',
                ],
                [
                    'key' => 'widgets.comparison_chart',
                    'label' => 'Gráfico comparativo',
                    'type' => 'boolean',
                ],
            ],
        ],
        [
            'title' => 'Textos da Página',
            'fields' => [
                ['key' => 'texts.main_title', 'label' => 'Título principal', 'type' => 'string', 'max' => 100],
                ['key' => 'texts.subtitle', 'label' => 'Subtítulo', 'type' => 'string', 'max' => 200],
                ['key' => 'texts.label_card_1', 'label' => 'Card Benefícios', 'type' => 'string', 'max' => 50],
                ['key' => 'texts.label_card_2', 'label' => 'Card Famílias', 'type' => 'string', 'max' => 50],
                ['key' => 'texts.label_card_3', 'label' => 'Card Cadastros', 'type' => 'string', 'max' => 50],
                ['key' => 'texts.map_title', 'label' => 'Título do mapa', 'type' => 'string', 'max' => 100],
                ['key' => 'texts.chart_title', 'label' => 'Título do gráfico', 'type' => 'string', 'max' => 100],
                ['key' => 'texts.chart_label_previous', 'label' => 'Label mês anterior', 'type' => 'string', 'max' => 50],
                ['key' => 'texts.chart_label_current', 'label' => 'Label mês atual', 'type' => 'string', 'max' => 50],
            ],
        ],
        [
            'title' => 'Regras de Negócio',
            'fields' => [
                [
                    'key' => 'rules.low_stock_limit',
                    'label' => 'Limite para alerta de estoque baixo',
                    'type' => 'number',
                    'min' => 1,
                    'max' => 999,
                ],
            ],
        ],
    ],
];
