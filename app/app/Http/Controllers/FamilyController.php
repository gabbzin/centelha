<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Constants\Messages;
use App\Dto\FamilyData;
use App\Http\Requests\StoreFamilyRequest;
use App\Http\Requests\UpdateFamilyRequest;
use App\Models\Family;
use App\Services\FamilyRegistration;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FamilyController extends Controller
{
    public function __construct(private readonly FamilyRegistration $registration) {}

    public function index(): Response
    {
        $search = request('search');

        $families = Family::with(['address', 'specificNeeds'])
            ->withCount('members')
            ->when($search, function ($query, $search) {
                $query->where('responsible_name', 'like', "%{$search}%");
            })
            ->paginate(6);

        $families->getCollection()->transform(function ($family) {
            $family->total_members_count = ($family->members_count ?? 0) + 1;

            return $family;
        });

        return Inertia::render('family/family', [
            'families' => $families,
        ]);
    }

    public function show($id): Response
    {
        $family = Family::with(['address', 'members', 'specificNeeds'])->findOrFail($id);

        return Inertia::render('family/[id]/family-info', [
            'backUrl' => url()->previous(),
            'id' => $id,
            'family' => $family,
        ]);
    }

    public function search(Request $request): JsonResponse
    {
        $q = $request->input('q', '');
        $cleanCpf = preg_replace('/\D/', '', $q);

        $families = Family::query()
            ->when($q, function ($query) use ($q, $cleanCpf) {
                $query->where('responsible_name', 'ilike', "%{$q}%");

                if (strlen($cleanCpf) >= 3) {
                    $query->orWhere('responsible_cpf', 'like', "%{$cleanCpf}%");
                }
            })
            ->where('is_active', true)
            ->limit(20)
            ->get(['id', 'responsible_name', 'responsible_cpf']);

        return response()->json($families);
    }

    public function edit(Family $family): Response
    {
        $family->load(['address', 'members']);

        return Inertia::render('family/form/edit', [
            'family' => $family,
        ]);
    }

    public function store(StoreFamilyRequest $request): RedirectResponse
    {
        $this->registration->execute(FamilyData::fromRequest($request));

        return redirect()->route('family')->with('success', Messages::MSG_16);
    }

    public function update(UpdateFamilyRequest $request, Family $family): RedirectResponse
    {
        $this->registration->execute(FamilyData::fromRequest($request), $family);

        return redirect()->route('family.info', $family->id)->with('success', Messages::MSG_14);
    }

    public function deactivate(Family $family): RedirectResponse
    {
        $family->update(['is_active' => false]);

        return redirect()->route('family')->with('success', Messages::MSG_19);
    }

    public function activate(Family $family): RedirectResponse
    {
        $family->update(['is_active' => true]);

        return redirect()->route('family')->with('success', Messages::MSG_20);
    }
}
