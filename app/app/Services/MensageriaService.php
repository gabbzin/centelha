<?php

declare(strict_types=1);

namespace App\Services;

use App\Constants\Messages;

class MensageriaService
{
    public function success(string $message): array
    {
        return [
            'type' => 'success',
            'message' => $message,
            'code' => $this->findCode($message),
        ];
    }

    public function error(string $message): array
    {
        return [
            'type' => 'error',
            'message' => $message,
            'code' => $this->findCode($message),
        ];
    }

    public function info(string $message): array
    {
        return [
            'type' => 'info',
            'message' => $message,
            'code' => $this->findCode($message),
        ];
    }

    public function flash(string $message): string
    {
        return $message;
    }

    private function findCode(string $message): ?string
    {
        $reflection = new \ReflectionClass(Messages::class);
        foreach ($reflection->getConstants() as $name => $value) {
            if ($name === 'types') {
                continue;
            }
            if ($value === $message) {
                return str_replace('_', '-', $name);
            }
        }

        return null;
    }
}
