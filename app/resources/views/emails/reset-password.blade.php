<x-mail::message>
{{-- Header --}}
<div style="text-align: center; margin-bottom: 24px;">
    <h1 style="color: #183154; font-size: 24px; font-weight: 700; margin: 0;">{{ config('app.name') }}</h1>
    <p style="color: #6b7280; font-size: 14px; margin: 4px 0 0;">Sistema de Gestão Comunitária</p>
</div>

{{-- Greeting --}}
@if (! empty($greeting))
# {{ $greeting }}
@endif

{{-- Intro Lines --}}
@foreach ($introLines as $line)
{{ $line }}

@endforeach

{{-- Action Button --}}
@isset($actionText)
<x-mail::button :url="$actionUrl" color="primary">
{{ $actionText }}
</x-mail::button>
@endisset

{{-- Outro Lines --}}
@foreach ($outroLines as $line)
{{ $line }}

@endforeach

{{-- Salutation --}}
@if (! empty($salutation))
{{ $salutation }}
@else
Atenciosamente,<br>
Equipe {{ config('app.name') }}
@endif

{{-- Subcopy --}}
@isset($actionText)
<x-slot:subcopy>
Se o botão acima não funcionar, copie e cole o link abaixo no seu navegador:
<span class="break-all">[{{ $displayableActionUrl }}]({{ $actionUrl }})</span>
</x-slot:subcopy>
@endisset
</x-mail::message>
