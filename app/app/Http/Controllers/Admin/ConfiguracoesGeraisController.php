<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CommunityCenter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class ConfiguracoesGeraisController extends Controller
{
    public function update(Request $request)
    {
        $validated = $request->validate([
            'name'             => 'required|string|max:255',
            'slogan'           => 'nullable|string|max:255',
            'rodape_text'      => 'nullable|string',
            'fontFamily'       => 'required|string',
            'logo'             => 'nullable|image|mimes:svg,png,jpg,jpeg,gif|max:2048',
            'favicon'          => 'nullable|image|mimes:png,jpg,jpeg,ico,svg|max:1024',
            'social_links'     => 'nullable|json',
            'maintenance_mode' => 'boolean',
        ]);

        $center = CommunityCenter::firstOrCreate([]);

        $data = [
            'name'             => $validated['name'],
            'slogan'           => $validated['slogan'] ?? null,
            'rodape_text'      => $validated['rodape_text'] ?? null,
            'fontFamily'       => $validated['fontFamily'],
            'maintenance_mode' => $validated['maintenance_mode'] ?? false,
        ];

        if ($request->hasFile('logo')) {
            $data['logo_path'] = $request->file('logo')->store('logos', 'public');
        }

        if ($request->hasFile('favicon')) {
            $data['favicon_path'] = $request->file('favicon')->store('favicons', 'public');
        }

        $center->update($data);

        if ($request->filled('social_links')) {
            $links = json_decode($validated['social_links'], true);
            $center->socialLinks()->delete();
            foreach ($links as $link) {
                $center->socialLinks()->create(['value' => $link['value']]);
            }
        }

        return to_route('gestao-sistema.configuracoes-gerais')
            ->with('success', 'Configurações salvas com sucesso!');
    }
}
