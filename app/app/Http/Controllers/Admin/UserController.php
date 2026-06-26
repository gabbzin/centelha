<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->input('search');
        $role = $request->input('role', 'all');

        $users = User::query()
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'ilike', "%{$search}%")
                        ->orWhere('email', 'ilike', "%{$search}%");
                });
            })
            ->when($role && $role !== 'all', function ($query, $role) {
                $query->where('role', $role);
            })
            ->orderBy('id', 'desc')
            ->paginate(5)
            ->withQueryString();

        $users->getCollection()->transform(fn (User $user) => $this->toClientShape($user));

        return Inertia::render('admin/gestao-sistema/usuarios-beneficios', [
            'users' => $users,
        ]);
    }

    public function store(StoreUserRequest $request): RedirectResponse
    {
        $data = $request->validated();

        User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Str::random(24),
            'role' => $data['role'],
            'ativo' => true,
        ]);

        Password::sendResetLink(['email' => $data['email']]);

        return to_route('gestao-sistema.usuarios-beneficios')
            ->with('success', 'Usuário cadastrado! Um link para definir a senha foi enviado ao e-mail.');
    }

    public function update(UpdateUserRequest $request, User $user): RedirectResponse
    {
        $data = $request->validated();

        $user->update([
            'name' => $data['name'] ?? $user->name,
            'email' => $data['email'] ?? $user->email,
            'role' => $data['role'] ?? $user->role,
            'ativo' => array_key_exists('ativo', $data) ? (bool) $data['ativo'] : $user->ativo,
        ]);

        return to_route('gestao-sistema.usuarios-beneficios')
            ->with('success', 'Usuário atualizado com sucesso!');
    }

    public function deactivate(Request $request, User $user): RedirectResponse
    {
        if ($request->user()->is($user)) {
            return to_route('gestao-sistema.usuarios-beneficios')
                ->with('error', 'Você não pode desativar o seu próprio usuário.');
        }

        if ($user->role === UserRole::Admin && $this->activeAdminsCount() <= 1) {
            return to_route('gestao-sistema.usuarios-beneficios')
                ->with('error', 'Não é possível desativar o único administrador ativo.');
        }

        $user->update(['ativo' => false]);

        return to_route('gestao-sistema.usuarios-beneficios')
            ->with('success', "Usuário {$user->name} desativado.");
    }

    private function activeAdminsCount(): int
    {
        return User::where('role', UserRole::Admin)->where('ativo', true)->count();
    }

    private function toClientShape(User $user): array
    {
        return [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role->value,
            'status' => $user->ativo ? 'Ativo' : 'Inativo',
            'last_access' => $user->last_login_at?->toIso8601String(),
            'created_at' => $user->created_at?->toIso8601String(),
        ];
    }
}
