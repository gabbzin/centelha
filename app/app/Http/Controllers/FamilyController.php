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
        // Trazendo as famílias paginadas, com relacionamentos básicos e a CONTAGEM de membros
        $families = Family::with(['address', 'specificNeeds'])
            ->withCount('members')
            ->paginate(10);

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
            'id' => $id,
            'family' => $family
        ]);
    }
}
