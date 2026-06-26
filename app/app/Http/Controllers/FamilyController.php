<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Constants\Messages;
use App\Dto\FamilyData;
use App\Http\Requests\StoreFamilyRequest;
use App\Http\Requests\UpdateFamilyRequest;
use App\Models\Family;
use App\Models\Tag;
use App\Services\FamilyRegistration;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FamilyController extends Controller
{
    public function __construct(
        private readonly FamilyRegistration $registration,
    ) {}

    public function index(Request $request): Response
    {
        $search = $request->input("search");

        $families = Family::with(["address", "tags"])
            ->withCount("members")
            ->when($search, function ($query, $search) {
                $query->where("responsible_name", "like", "%{$search}%");
            })
            ->orderBy("created_at", "desc")
            ->paginate(6)
            ->withQueryString()
            ->through(fn (Family $family) => [
                "id" => $family->id,
                "responsible_name" => $family->responsible_name,
                "responsible_cpf" => $family->responsible_cpf,
                "is_active" => $family->is_active,
                "address" => $family->address,
                "tags" => $family->tags->map(fn ($tag) => [
                    "id" => $tag->id,
                    "name" => $tag->name,
                    "color" => $tag->color,
                    "icon" => $tag->icon,
                ]),
                "total_members_count" => ($family->members_count ?? 0) + 1,
            ]);

        return Inertia::render("family/family", [
            "families" => $families,
        ]);
    }

    public function show($id): Response
    {
        $family = Family::with(["address", "members", "tags"])->findOrFail($id);

        return Inertia::render("family/[id]/family-info", [
            "backUrl" => url("/family"),
            "id" => (string) $family->id,
            "family" => $family,
        ]);
    }

    public function search(Request $request): \Illuminate\Http\JsonResponse
    {
        $search = $request->input("search");

        $query = Family::where("is_active", true);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where("responsible_name", "like", "%{$search}%");
                if (strlen($search) >= 3) {
                    $q->orWhere("responsible_cpf", "like", "%{$search}%");
                }
            });
        }

        $families = $query->limit(20)->get(["id", "responsible_name", "responsible_cpf"]);

        return response()->json($families);
    }

    public function edit(Family $family): Response
    {
        $family->load(["address", "members", "tags"]);

        $availableTags = Tag::all()->map(fn ($tag) => [
            "id" => $tag->id,
            "name" => $tag->name,
            "color" => $tag->color,
            "icon" => $tag->icon,
        ]);

        return Inertia::render("family/form/edit", [
            "family" => $family,
            "availableTags" => $availableTags,
        ]);
    }

    public function store(StoreFamilyRequest $request): RedirectResponse
    {
        $this->registration->execute(FamilyData::fromRequest($request));

        return to_route("family")
            ->with("success", Messages::MSG_16);
    }

    public function update(UpdateFamilyRequest $request, Family $family): RedirectResponse
    {
        $this->registration->execute(FamilyData::fromRequest($request), $family);

        return to_route("family.info", ["id" => $family->id])
            ->with("success", Messages::MSG_14);
    }

    public function deactivate(Family $family): RedirectResponse
    {
        $family->update(["is_active" => false]);

        return to_route("family.info", ["id" => $family->id])
            ->with("success", "Família desativada com sucesso!");
    }

    public function activate(Family $family): RedirectResponse
    {
        $family->update(["is_active" => true]);

        return to_route("family.info", ["id" => $family->id])
            ->with("success", "Família ativada com sucesso!");
    }
}
