<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CommunityCenter;
use App\Services\StorageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class ConfiguracoesGeraisController extends Controller
{
    public function __construct(private readonly StorageService $storage) {}

    public function update(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slogan' => 'nullable|string|max:255',
            'rodape_text' => 'nullable|string',
            'fontFamily' => 'required|string',
            'logo' => 'nullable|image|mimes:svg,png,jpg,jpeg,gif|max:2048',
            'favicon' => 'nullable|image|mimes:png,jpg,jpeg,ico,svg|max:1024',
            'social_links' => 'nullable|json',
            'maintenance_mode' => 'boolean',
        ]);

        $center = CommunityCenter::firstOrCreate([]);

        $data = [
            'name' => $validated['name'],
            'slogan' => $validated['slogan'] ?? null,
            'rodape_text' => $validated['rodape_text'] ?? null,
            'fontFamily' => $validated['fontFamily'],
            'maintenance_mode' => $validated['maintenance_mode'] ?? false,
        ];

        if ($request->hasFile('logo')) {
            $data['logo_path'] = $this->storage->replace(
                'public',
                'logos',
                $request->file('logo'),
                $center->logo_path,
            );
        } elseif ($request->boolean('remove_logo')) {
            $this->storage->delete('public', $center->logo_path);
            $data['logo_path'] = null;
        }

        if ($request->hasFile('favicon')) {
            $data['favicon_path'] = $this->storage->replace(
                'public',
                'favicons',
                $request->file('favicon'),
                $center->favicon_path,
            );
        } elseif ($request->boolean('remove_favicon')) {
            $this->storage->delete('public', $center->favicon_path);
            $data['favicon_path'] = null;
        }

        $center->update($data);

        if ($request->filled('social_links')) {
            $links = json_decode($validated['social_links'], true);
            $center->socialLinks()->delete();
            foreach ($links as $link) {
                $center->socialLinks()->create(['value' => $link['value']]);
            }
        }

        Cache::forget('community_center');

        return to_route('gestao-sistema.configuracoes-gerais')
            ->with('success', 'Configurações salvas com sucesso!');
    }
}
