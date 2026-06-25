<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Comprovante de Entrega {{ $delivery->code }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: Arial, Helvetica, sans-serif;
            font-size: 12px;
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
            max-height: 50px;
            max-width: 120px;
        }
        .org-name {
            font-size: 16px;
            font-weight: bold;
            color: {{ $primaryColor }};
        }
        .title {
            font-size: 18px;
            font-weight: bold;
            color: {{ $primaryColor }};
            margin-bottom: 5px;
        }
        .subtitle {
            font-size: 11px;
            color: #666;
            margin-bottom: 20px;
        }
        .card {
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 12px;
            margin-bottom: 15px;
        }
        .card-title {
            font-size: 12px;
            font-weight: bold;
            text-transform: uppercase;
            color: {{ $primaryColor }};
            margin-bottom: 8px;
            border-bottom: 1px solid #eee;
            padding-bottom: 5px;
        }
        .info-row {
            margin-bottom: 4px;
        }
        .label {
            font-weight: bold;
            color: #555;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 8px;
            table-layout: fixed;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
            word-break: break-word;
            overflow-wrap: break-word;
        }
        .info-row, .org-name {
            word-break: break-word;
            overflow-wrap: break-word;
        }
        th {
            background-color: {{ $primaryColor }};
            color: white;
            font-weight: bold;
        }
        .status {
            display: inline-block;
            padding: 3px 8px;
            background-color: #4ade80;
            color: white;
            border-radius: 3px;
            font-size: 10px;
            font-weight: bold;
        }
        .footer {
            margin-top: 30px;
            padding-top: 10px;
            border-top: 1px solid #ddd;
            font-size: 10px;
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
                    <div class="title">Comprovante de Entrega</div>
                    <div class="subtitle">#{{ $delivery->code }}</div>
                </div>
            </div>
        </div>

        <div class="subtitle">
            Emitido em {{ $delivery->created_at->format('d/m/Y H:i') }}
        </div>

        <div class="card">
            <div class="card-title">Família Beneficiária</div>
            <div class="info-row"><span class="label">Responsável:</span> {{ $delivery->family->responsible_name }}</div>
            @if($delivery->family->responsible_cpf)
                <div class="info-row"><span class="label">CPF:</span> {{ $delivery->family->responsible_cpf }}</div>
            @endif
            @if($delivery->family->address)
                <div class="info-row">
                    <span class="label">Endereço:</span>
                    {{ $delivery->family->address->street }}{{ $delivery->family->address->number ? ', '.$delivery->family->address->number : '' }}<br>
                    {{ $delivery->family->address->neighborhood }}<br>
                    {{ $delivery->family->address->city }}/{{ $delivery->family->address->state }}
                </div>
            @endif
            @if($delivery->family->members && $delivery->family->members->count())
                <div class="info-row" style="margin-top: 8px;">
                    <span class="label">Membros vinculados:</span>
                    {{ $delivery->family->members->map(fn($m) => $m->name.($m->relationship ? ' ('.$m->relationship.')' : ''))->implode(', ') }}
                </div>
            @endif
        </div>

        <div class="card">
            <div class="card-title">Status da Operação</div>
            <div class="info-row"><span class="label">Status:</span> <span class="status">{{ $delivery->status }}</span></div>
            <div class="info-row"><span class="label">Responsável pela entrega:</span> {{ $delivery->deliveredBy?->name ?? '-' }}</div>
            <div class="info-row"><span class="label">Data da entrega:</span> {{ $delivery->delivery_date->format('d/m/Y') }}</div>
        </div>

        <div class="card">
            <div class="card-title">Itens da Entrega</div>
            <table>
                <colgroup>
                    <col style="width: 12%;">
                    <col style="width: 40%;">
                    <col style="width: 12%;">
                    <col style="width: 36%;">
                </colgroup>
                <thead>
                    <tr>
                        <th>Cód. Item</th>
                        <th>Descrição do Benefício</th>
                        <th>Quantidade</th>
                        <th>Local de Retirada</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{{ $delivery->benefit?->code ?? '-' }}</td>
                        <td>{{ $delivery->benefit?->name ?? '-' }}</td>
                        <td>{{ $delivery->quantity }}</td>
                        <td>{{ $delivery->location }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        @if($delivery->notes)
            <div class="card">
                <div class="card-title">Observações do Agente</div>
                <div style="white-space: pre-line; word-break: break-word; overflow-wrap: break-word;">{{ $delivery->notes }}</div>
            </div>
        @endif

        @if($delivery->receipt_path)
            <div class="card">
                <div class="card-title">Comprovante Anexado</div>
                <div class="info-row">Arquivo: {{ basename($delivery->receipt_path) }}</div>
            </div>
        @endif

        <div class="footer">
            Documento gerado automaticamente pelo sistema {{ $communityCenter?->name ?? 'Centelha' }}.<br>
            Última atualização: {{ $delivery->updated_at->format('d/m/Y H:i') }}
        </div>
    </div>
</body>
</html>
