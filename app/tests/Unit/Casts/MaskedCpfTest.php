<?php

namespace Tests\Unit\Casts;

use App\Casts\MaskedCpf;
use App\Models\Family;
use PHPUnit\Framework\TestCase;

class MaskedCpfTest extends TestCase
{
    public function test_set_strips_non_digits_from_cpf(): void
    {
        $cast = new MaskedCpf;
        $model = new Family;

        $result = $cast->set($model, 'responsible_cpf', '123.456.789-00', []);

        $this->assertSame('12345678900', $result);
    }

    public function test_set_returns_null_for_null_value(): void
    {
        $cast = new MaskedCpf;
        $model = new Family;

        $result = $cast->set($model, 'responsible_cpf', null, []);

        $this->assertNull($result);
    }

    public function test_set_returns_null_for_empty_string(): void
    {
        $cast = new MaskedCpf;
        $model = new Family;

        $result = $cast->set($model, 'responsible_cpf', '', []);

        $this->assertNull($result);
    }

    public function test_get_masks_first_three_and_last_two_digits(): void
    {
        $cast = new MaskedCpf;
        $model = new Family;

        $result = $cast->get($model, 'responsible_cpf', '12345678900', []);

        $this->assertSame('***.456.789-**', $result);
    }

    public function test_get_returns_null_for_null_value(): void
    {
        $cast = new MaskedCpf;
        $model = new Family;

        $result = $cast->get($model, 'responsible_cpf', null, []);

        $this->assertNull($result);
    }

    public function test_get_returns_null_for_empty_string(): void
    {
        $cast = new MaskedCpf;
        $model = new Family;

        $result = $cast->get($model, 'responsible_cpf', '', []);

        $this->assertNull($result);
    }

    public function test_roundtrip_masks_stored_digits(): void
    {
        $cast = new MaskedCpf;
        $model = new Family;

        $stored = $cast->set($model, 'responsible_cpf', '123.456.789-00', []);
        $masked = $cast->get($model, 'responsible_cpf', $stored, []);

        $this->assertSame('12345678900', $stored);
        $this->assertSame('***.456.789-**', $masked);
    }
}
