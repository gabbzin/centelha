<?php

declare(strict_types=1);

namespace App\Casts;

use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Database\Eloquent\Model;

class MaskedCpf implements CastsAttributes
{
    public function get($model, string $key, $value, array $attributes)
    {
        if (!$value) return null;
        $clean = preg_replace('/\D/', '', $value);
        return preg_replace('/(\d{3})(\d{3})(\d{3})(\d{2})/', '***.$2.$3-**', $clean);
    }

    public function set($model, string $key, $value, array $attributes)
    {
        if (!$value) return null;
        return preg_replace('/\D/', '', $value);
    }
}
