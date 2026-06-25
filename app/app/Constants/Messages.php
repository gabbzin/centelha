<?php

declare(strict_types=1);

namespace App\Constants;

class Messages
{
    // Autenticação
    const MSG_01 = 'Login realizado com sucesso!';
    const MSG_02 = 'E-mail de recuperação enviado!';
    const MSG_03 = 'Senha alterada com sucesso!';
    const MSG_04 = 'E-mail ou senha incorretos.';
    const MSG_05 = 'Verifique o e-mail informado.';
    const MSG_06 = 'Link de recuperação inválido ou expirado.';
    const MSG_07 = 'Senhas não coincidem.';
    const MSG_08 = 'Verifique sua conexão de Internet.';
    const MSG_09 = 'Conta Desativada.';
    const MSG_10 = 'Aguarde 30 segundos e tente novamente.';
    const MSG_11 = 'Um link de redefinição será enviado para o e-mail informado.';
    const MSG_12 = 'Token Expirado.';
    const MSG_13 = 'Token Inválido.';

    // Família
    const MSG_14 = 'Informações da família atualizadas com sucesso.';
    const MSG_15 = 'Campo inválido.';
    const MSG_16 = 'Cadastro realizado com sucesso!';
    const MSG_17 = 'Este CPF já está cadastrado no sistema.';
    const MSG_18 = 'Informações da família atualizadas com sucesso.';
    const MSG_19 = 'Família desativada com sucesso.';

    public static array $types = [
        self::MSG_01 => 'success',
        self::MSG_02 => 'success',
        self::MSG_03 => 'success',
        self::MSG_04 => 'error',
        self::MSG_05 => 'info',
        self::MSG_06 => 'error',
        self::MSG_07 => 'error',
        self::MSG_08 => 'error',
        self::MSG_09 => 'error',
        self::MSG_10 => 'warning',
        self::MSG_11 => 'info',
        self::MSG_12 => 'error',
        self::MSG_13 => 'error',
        self::MSG_14 => 'success',
        self::MSG_15 => 'error',
        self::MSG_16 => 'success',
        self::MSG_17 => 'error',
        self::MSG_18 => 'success',
        self::MSG_19 => 'success',
    ];

    public static function type(string $message): string
    {
        return self::$types[$message] ?? 'info';
    }
}
