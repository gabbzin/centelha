<?php

namespace Tests\Feature\Admin;

use App\Enums\UserRole;
use App\Models\User;
use App\Notifications\ResetPasswordNotification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Password;
use Tests\TestCase;

class UserManagementTest extends TestCase
{
    use RefreshDatabase;

    private function admin(): User
    {
        return User::factory()->create([
            'role' => UserRole::Admin->value,
            'ativo' => true,
        ]);
    }

    public function test_guests_cannot_list_users(): void
    {
        $this->get(route('gestao-sistema.usuarios-beneficios'))->assertRedirect('/login');
    }

    public function test_non_admin_cannot_create_users(): void
    {
        $operador = User::factory()->create(['role' => UserRole::Operador->value]);

        $this->actingAs($operador)
            ->post(route('usuarios.store'), [
                'name' => 'Novo Operador',
                'email' => 'novo@centelha.org',
                'role' => UserRole::Operador->value,
            ])
            ->assertForbidden();
    }

    public function test_admin_can_create_user_with_lowercase_role(): void
    {
        Password::shouldReceive('sendResetLink')->once()->with(['email' => 'novo@centelha.org']);

        $this->actingAs($this->admin())
            ->post(route('usuarios.store'), [
                'name' => 'Novo Operador',
                'email' => 'novo@centelha.org',
                'role' => UserRole::Operador->value,
            ])
            ->assertRedirect(route('gestao-sistema.usuarios-beneficios'));

        $user = User::where('email', 'novo@centelha.org')->first();

        $this->assertNotNull($user);
        $this->assertSame(UserRole::Operador, $user->role);
        $this->assertFalse($user->ativo);
        $this->assertNull($user->activated_at);
        $this->assertNotEmpty($user->password);
    }

    public function test_store_rejects_translated_role_label(): void
    {
        $this->actingAs($this->admin())
            ->post(route('usuarios.store'), [
                'name' => 'Bug',
                'email' => 'bug@centelha.org',
                'role' => 'Administrador',
            ])
            ->assertSessionHasErrors('role');

        $this->assertDatabaseMissing('users', ['email' => 'bug@centelha.org']);
    }

    public function test_store_rejects_duplicate_email(): void
    {
        User::factory()->create(['email' => 'existe@centelha.org']);

        $this->actingAs($this->admin())
            ->post(route('usuarios.store'), [
                'name' => 'Repetido',
                'email' => 'existe@centelha.org',
                'role' => UserRole::Operador->value,
            ])
            ->assertSessionHasErrors('email');
    }

    public function test_admin_can_update_user_name_email_and_role(): void
    {
        $target = User::factory()->create([
            'role' => UserRole::Operador->value,
            'ativo' => true,
        ]);

        $this->actingAs($this->admin())
            ->put(route('usuarios.update', $target), [
                'name' => 'Nome Atualizado',
                'email' => 'atualizado@centelha.org',
                'role' => UserRole::Admin->value,
            ])
            ->assertRedirect(route('gestao-sistema.usuarios-beneficios'));

        $target->refresh();

        $this->assertSame('Nome Atualizado', $target->name);
        $this->assertSame('atualizado@centelha.org', $target->email);
        $this->assertSame(UserRole::Admin, $target->role);
        $this->assertTrue($target->ativo);
    }

    public function test_deactivate_disables_a_user(): void
    {
        $target = User::factory()->create(['role' => UserRole::Operador->value, 'ativo' => true]);

        $this->actingAs($this->admin())
            ->delete(route('usuarios.deactivate', $target))
            ->assertRedirect(route('gestao-sistema.usuarios-beneficios'));

        $this->assertFalse($target->fresh()->ativo);
    }

    public function test_admin_cannot_deactivate_itself(): void
    {
        $admin = $this->admin();

        $this->actingAs($admin)
            ->delete(route('usuarios.deactivate', $admin))
            ->assertSessionHas('error');

        $this->assertTrue($admin->fresh()->ativo);
    }

    public function test_last_active_admin_cannot_be_deactivated(): void
    {
        $admin = $this->admin();
        $anotherAdmin = User::factory()->create([
            'role' => UserRole::Admin->value,
            'ativo' => false,
        ]);

        $this->actingAs($anotherAdmin)
            ->delete(route('usuarios.deactivate', $admin))
            ->assertSessionHas('error');

        $this->assertTrue($admin->fresh()->ativo);
    }

    public function test_new_user_is_activated_after_password_reset(): void
    {
        Notification::fake();

        $this->actingAs($this->admin())
            ->post(route('usuarios.store'), [
                'name' => 'Novo Operador',
                'email' => 'novo@centelha.org',
                'role' => UserRole::Operador->value,
            ])
            ->assertRedirect();

        $user = User::where('email', 'novo@centelha.org')->firstOrFail();

        $this->post('/logout');

        Notification::assertSentTo($user, ResetPasswordNotification::class, function ($notification) use ($user) {
            $this->post('/reset-password', [
                'token' => $notification->token,
                'email' => $user->email,
                'password' => 'nova-senha-segura',
                'password_confirmation' => 'nova-senha-segura',
            ])->assertSessionHasNoErrors()->assertRedirect(route('login'));

            $user->refresh();

            $this->assertTrue($user->ativo);
            $this->assertNotNull($user->activated_at);
            $this->assertTrue(Hash::check('nova-senha-segura', $user->password));

            return true;
        });
    }

    public function test_admin_can_change_user_status_to_pending(): void
    {
        $target = User::factory()->create([
            'role' => UserRole::Operador->value,
            'ativo' => true,
            'activated_at' => now(),
        ]);

        $this->actingAs($this->admin())
            ->put(route('usuarios.update', $target), [
                'name' => $target->name,
                'email' => $target->email,
                'role' => $target->role->value,
                'status' => 'Pendente',
            ])
            ->assertRedirect();

        $target->refresh();

        $this->assertFalse($target->ativo);
        $this->assertNull($target->activated_at);
    }

    public function test_admin_can_resend_activation_for_pending_user(): void
    {
        Password::shouldReceive('sendResetLink')->once()->with(['email' => 'pendente@centelha.org']);

        $target = User::factory()->create([
            'email' => 'pendente@centelha.org',
            'role' => UserRole::Operador->value,
            'ativo' => false,
            'activated_at' => null,
        ]);

        $this->actingAs($this->admin())
            ->post(route('usuarios.resend-activation', $target))
            ->assertRedirect()
            ->assertSessionHas('success');
    }

    public function test_resend_activation_is_denied_for_active_user(): void
    {
        $target = User::factory()->create([
            'role' => UserRole::Operador->value,
            'ativo' => true,
        ]);

        $this->actingAs($this->admin())
            ->post(route('usuarios.resend-activation', $target))
            ->assertSessionHas('error');
    }
}
