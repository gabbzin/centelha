<?php

return [
    'widgets' => [
        'metrics_cards' => true,
        'heat_map' => true,
        'stock_alerts' => true,
        'comparison_chart' => true,
        'period_selector' => true,
    ],
    'texts' => [
        'main_title' => 'Visão Geral do Dashboard',
        'subtitle' => 'Acompanhamento estratégico das operações da Centelha',
        'label_card_1' => 'Benefícios Entregues',
        'label_card_2' => 'Famílias Atendidas',
        'label_card_3' => 'Novos Cadastros',
        'map_title' => 'Mapa de Distribuição',
        'alert_card_title' => 'Alertas de baixo estoque',
        'top_items_title' => 'Top itens em estoque',
        'chart_title' => 'Comparativo de Entregas por Categoria (Mês Atual x Anterior)',
        'chart_label_previous' => 'Mês anterior',
        'chart_label_current' => 'Mês atual',
    ],
    'rules' => [
        'low_stock_limit' => 50,
    ],
];
