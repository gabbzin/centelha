<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Relatório de Entregas</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 11px;
            color: #333;
            line-height: 1.4;
        }
        .container {
            padding: 15mm;
        }
        .header {
            border-bottom: 2px solid {{ $primaryColor }};
            padding-bottom: 15px;
            margin-bottom: 20px;
        }
        .header-content {
            display: table;
            width: 100%;
        }
        .header-left, .header-right {
            display: table-cell;
            vertical-align: middle;
        }
        .header-left { width: 60%; }
        .header-right {
            width: 40%;
            text-align: right;
        }
        .logo {
            max-height: 45px;
            max-width: 110px;
        }
        .org-name {
            font-size: 15px;
            font-weight: bold;
            color: {{ $primaryColor }};
        }
        .title {
            font-size: 17px;
            font-weight: bold;
            color: {{ $primaryColor }};
            margin-bottom: 4px;
        }
        .subtitle {
            font-size: 11px;
            color: #666;
            margin-bottom: 15px;
        }
        .summary {
            margin-bottom: 15px;
            padding: 10px;
            background-color: #f9f9f9;
            border-left: 4px solid {{ $primaryColor }};
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 8px;
            table-layout: fixed;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 6px;
            text-align: left;
            word-break: break-word;
            overflow-wrap: break-word;
        }
        .org-name {
            word-break: break-word;
            overflow-wrap: break-word;
        }
        th {
            background-color: {{ $primaryColor }};
            color: white;
            font-weight: bold;
        }
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        .text-right {
            text-align: right;
        }
        .footer {
            margin-top: 25px;
            padding-top: 10px;
            border-top: 1px solid #ddd;
            font-size: 9px;
            color: #666;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="header-content">
                <div class="header-left">
                    @if($logoPath)
                        <img src="{{ $logoPath }}" alt="Logo" class="logo">
                    @endif
                    <div class="org-name">{{ $communityCenter?->name ?? 'Centelha' }}</div>
                </div>
                <div class="header-right">
                    <div class="title">Relatório de Entregas</div>
                    <div class="subtitle">Período: {{ $startDate->format('d/m/Y') }} a {{ $endDate->format('d/m/Y') }}</div>
                </div>
            </div>
        </div>

        <div class="summary">
            <strong>Total de entregas no período:</strong> {{ $deliveries->count() }}<br>
            <strong>Emitido em:</strong> {{ now()->format('d/m/Y H:i') }}
        </div>

        <table>
            <colgroup>
                <col style="width: 9%;">
                <col style="width: 13%;">
                <col style="width: 26%;">
                <col style="width: 7%;">
                <col style="width: 18%;">
                <col style="width: 12%;">
                <col style="width: 15%;">
            </colgroup>
            <thead>
                <tr>
                    <th>Nº Entrega</th>
                    <th>Data</th>
                    <th>Benefício</th>
                    <th class="text-right">Qtd</th>
                    <th>Local de Retirada</th>
                    <th>Status</th>
                    <th>Entregue Por</th>
                </tr>
            </thead>
            <tbody>
                @forelse($deliveries as $delivery)
                    <tr>
                        <td>{{ $delivery->code }}</td>
                        <td>{{ $delivery->delivery_date->format('d/m/Y') }}</td>
                        <td>{{ $delivery->benefit?->name ?? '-' }}</td>
                        <td class="text-right">{{ $delivery->quantity }}</td>
                        <td>{{ $delivery->location }}</td>
                        <td>{{ $delivery->status }}</td>
                        <td>{{ $delivery->deliveredBy?->name ?? '-' }}</td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="7" style="text-align: center;">Nenhuma entrega encontrada no período selecionado.</td>
                    </tr>
                @endforelse
            </tbody>
        </table>

        <div class="footer">
            Documento gerado automaticamente pelo sistema {{ $communityCenter?->name ?? 'Centelha' }}.
        </div>
    </div>
</body>
</html>
