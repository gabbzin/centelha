<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTagRequest;
use App\Http\Requests\UpdateTagRequest;
use App\Models\Tag;
use Illuminate\Http\RedirectResponse;

class TagController extends Controller
{
    public function store(StoreTagRequest $request): RedirectResponse
    {
        Tag::create($request->validated());

        return to_route("gestao-sistema.usuarios-beneficios")
            ->with("success", "Tag cadastrada com sucesso!");
    }

    public function update(UpdateTagRequest $request, Tag $tag): RedirectResponse
    {
        $tag->update($request->validated());

        return to_route("gestao-sistema.usuarios-beneficios")
            ->with("success", "Tag atualizada com sucesso!");
    }

    public function destroy(Tag $tag): RedirectResponse
    {
        $tag->delete();

        return to_route("gestao-sistema.usuarios-beneficios")
            ->with("success", "Tag excluída com sucesso!");
    }
}
