<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CommunityCenter;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageCustomizationController extends Controller
{
    public function index()
    {
        $availablePages = [
            [
                'key' => 'dashboard',
                'label' => 'Dashboard',
                'description' => 'Personalize títulos, textos e widgets do Dashboard',
            ],
            [
                'key' => 'home',
                'label' => 'Página Inicial',
                'description' => 'Personalize textos, funcionalidades e rodapé da Landing Page',
            ],
            [
                'key' => 'login',
                'label' => 'Tela de Login',
                'description' => 'Personalize textos e labels da tela de autenticação',
            ],
            [
                'key' => 'familia',
                'label' => 'Gestão de Famílias',
                'description' => 'Personalize títulos e textos do módulo de famílias',
            ],
            [
                'key' => 'beneficios',
                'label' => 'Controle de Estoque',
                'description' => 'Personalize títulos e textos do módulo de benefícios',
            ],
        ];

        return Inertia::render('admin/gestao-sistema/customizacao-tela/index', [
            'availablePages' => $availablePages,
        ]);
    }

    public function show(string $pageKey)
    {
        $schemaPath = config_path("pages/schemas/{$pageKey}.php");
        $configPath = config_path("pages/{$pageKey}.php");

        if (! file_exists($schemaPath) || ! file_exists($configPath)) {
            abort(404, "Página '{$pageKey}' não encontrada.");
        }

        $schema = require $schemaPath;
        $defaults = require $configPath;

        $center = CommunityCenter::first();
        $saved = $center?->settings[$pageKey] ?? [];
        $settings = array_merge($defaults, $saved);

        return Inertia::render('admin/gestao-sistema/customizacao-tela/edit', [
            'pageKey' => $pageKey,
            'schema' => $schema,
            'settings' => $settings,
        ]);
    }

    public function update(Request $request, string $pageKey)
    {
        $schemaPath = config_path("pages/schemas/{$pageKey}.php");

        if (! file_exists($schemaPath)) {
            abort(404, "Página '{$pageKey}' não encontrada.");
        }

        $schema = require $schemaPath;

        $rules = $this->buildValidationRules($schema);
        $validated = $request->validate($rules);

        $nested = $this->flatToNested($schema, $validated);

        $center = CommunityCenter::first();
        $settings = $center->settings;
        $settings[$pageKey] = $nested;
        $center->settings = $settings;
        $center->save();

        return back()->with('success', 'Configurações salvas com sucesso!');
    }

    private function buildValidationRules(array $schema): array
    {
        $rules = [];

        foreach ($schema['sections'] as $section) {
            foreach ($section['fields'] as $field) {
                $key = str_replace('.', '_', $field['key']);
                $fieldRules = [];

                if ($field['type'] === 'boolean') {
                    $fieldRules[] = 'boolean';
                } elseif ($field['type'] === 'number') {
                    $fieldRules[] = 'numeric';
                    if (isset($field['min'])) {
                        $fieldRules[] = "min:{$field['min']}";
                    }
                    if (isset($field['max'])) {
                        $fieldRules[] = "max:{$field['max']}";
                    }
                } else {
                    $fieldRules[] = 'string';
                    if (isset($field['max'])) {
                        $fieldRules[] = "max:{$field['max']}";
                    }
                }

                $rules[$key] = $fieldRules;
            }
        }

        return $rules;
    }

    private function flatToNested(array $schema, array $flat): array
    {
        $result = [];

        foreach ($schema['sections'] as $section) {
            foreach ($section['fields'] as $field) {
                $flatKey = str_replace('.', '_', $field['key']);
                $value = $flat[$flatKey] ?? null;

                if ($value === null || $value === '') {
                    continue;
                }

                $segments = explode('.', $field['key']);
                $current = &$result;

                foreach ($segments as $segment) {
                    if (! isset($current[$segment])) {
                        $current[$segment] = [];
                    }
                    $current = &$current[$segment];
                }

                $current = $value;
            }
        }

        return $result;
    }
}
