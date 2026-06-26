<?php

declare(strict_types=1);

namespace App\Notifications;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Notifications\Messages\MailMessage;

class ResetPasswordNotification extends ResetPassword
{
    public function toMail($notifiable): MailMessage
    {
        $url = $this->resetUrl($notifiable);
        $isActivation = is_null($notifiable->activated_at);

        if ($isActivation) {
            return (new MailMessage)
                ->subject('Ative sua conta no Centelha')
                ->greeting("Olá, {$notifiable->name}!")
                ->line('Sua conta foi criada pelo administrador do sistema. Para começar a usar, defina uma senha de acesso clicando no botão abaixo.')
                ->action('Ativar conta e definir senha', $url)
                ->line('Esse link é válido por 60 minutos. Se você não solicitou essa conta, ignore este e-mail.')
                ->salutation("Atenciosamente,\nEquipe ".config('app.name'))
                ->markdown('emails.reset-password');
        }

        return (new MailMessage)
            ->subject('Redefinição de senha no Centelha')
            ->greeting("Olá, {$notifiable->name}!")
            ->line('Recebemos uma solicitação para redefinir a senha da sua conta. Clique no botão abaixo para escolher uma nova senha.')
            ->action('Redefinir senha', $url)
            ->line('Esse link é válido por 60 minutos. Se você não solicitou a redefinição, nenhuma ação é necessária.')
            ->salutation("Atenciosamente,\nEquipe ".config('app.name'))
            ->markdown('emails.reset-password');
    }
}
