<?php

namespace App\Http\Controllers;

use App\Models\CommunityCenter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class AppearanceController extends Controller
{
    public function update(Request $request)
    {
        // 1. Validação: Garante que o frontend enviou os campos e que são cores válidas (ex: #FFFFFF)
        $validated = $request->validate([
            'primary'        => 'required|string',
            'background'     => 'required|string',
            'surface'        => 'required|string',
            'text_primary'   => 'required|string',
            'text_secondary' => 'required|string',
            'text_disabled'  => 'required|string',
            'hover'          => 'required|string',
            'active'         => 'required|string',
            'success'        => 'required|string',
            'error'          => 'required|string',
            'warning'        => 'required|string',
            'info'           => 'required|string',
        ]);

        $center = CommunityCenter::first();

        $center->update([
            'colors' => $validated
        ]);

        // 4. Redireciona o usuário de volta para a mesma página com uma mensagem de sucesso
        return Redirect::back()->with('success', 'Configurações de cores salvas com sucesso!');
    }
}
