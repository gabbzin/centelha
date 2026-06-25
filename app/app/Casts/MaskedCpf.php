<?php

declare(strict_types=1);

namespace App\Casts;

use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Database\Eloquent\Model;

class MaskedCpf implements CastsAttributes
{
    public function get(Model $model, string $key, mixed $value, array $attributes): ?string
    {
        if (! $value) {
            return null;
        }

        $clean = preg_replace('/\D/', '', $value);

        return preg_replace('/(\d{3})(\d{3})(\d{3})(\d{2})/', '***.$2.$3-**', $clean);
    }

    public function set(Model $model, string $key, mixed $value, array $attributes): ?string
    {
        if (! $value) {
            return null;
        }

        return preg_replace('/\D/', '', $value);
    }
}
