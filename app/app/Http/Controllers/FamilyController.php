<?php

namespace App\Http\Controllers;

use App\Models\Family;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FamilyController extends Controller
{
    /**
     * Display a listing of the families.
     */
    public function index()
    {
        // Trazendo as famílias paginadas, com relacionamentos básicos e a contagem dos membros
        $families = Family::with(['address', 'specificNeeds'])
            ->withCount('members')
            ->paginate(6);

        // Recalculando a contagem dos membros, pra contar com o responsável
        $families->getCollection()->transform(function ($family) {
            $family->total_members_count = ($family->members_count ?? 0) + 1;
            return $family;
        });

        return Inertia::render('family/family', [
            'families' => $families
        ]);
    }

    /**
     * Display the specified family.
     */
    public function show($id)
    {
        // Busca a família no banco de dados trazendo todos os relacionamentos
        $family = Family::with(['address', 'members', 'specificNeeds'])->findOrFail($id);

        return Inertia::render('family/[id]/family-info', [
            'backUrl' => url()->previous(),
            'id' => $id,
            'family' => $family
        ]);
    }
}
