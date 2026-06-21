<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFamilyRequest;
use App\Http\Requests\UpdateFamilyRequest;
use App\Models\Family;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class FamilyController extends Controller
{
    public function index()
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

    public function show($id)
    {
        $family = Family::with(['address', 'members', 'specificNeeds'])->findOrFail($id);

        return Inertia::render('family/[id]/family-info', [
            'backUrl' => url()->previous(),
            'id'      => $id,
            'family'  => $family,
        ]);
    }

    public function search(Request $request)
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

    public function edit(Family $family)
    {
        $family->load(['address', 'members']);

        return Inertia::render('family/form/edit', [
            'family' => $family,
        ]);
    }

    public function store(StoreFamilyRequest $request)
    {
        $data = $request->validated();

        DB::transaction(function () use ($data) {
            $family = Family::create([
                'responsible_name'           => $data['name'],
                'responsible_cpf'            => $data['cpf'],
                'responsible_birth_date'     => $data['data_nascimento'],
                'responsible_phone'          => $data['telefone'],
                'responsible_email'          => $data['email'] ?? null,
                'income_source'              => $data['fonte_renda'] ?? null,
                'total_income'               => isset($data['renda_familiar']) ? (int) ($data['renda_familiar'] * 100) : 0,
                'receives_government_aid'    => ($data['recebe_auxilio'] ?? 'nao') === 'sim',
                'government_aid_description' => $data['auxilios_recebidos'] ?? null,
                'housing_condition'          => $data['moradia'] ?? null,
                'general_observations'       => $data['general_observations'] ?? null,
            ]);

            $family->address()->create([
                'zipcode'      => $data['cep'],
                'street'       => $data['logradouro'],
                'number'       => $data['numero'],
                'neighborhood' => $data['bairro'],
                'city'         => $data['cidade'],
                'state'        => $data['UF'],
            ]);

            foreach ($data['family_members'] ?? [] as $member) {
                $family->members()->create([
                    'name'         => $member['name'],
                    'cpf'          => $member['cpf'],
                    'birth_date'   => $member['data_nascimento'],
                    'relationship' => $member['relacao_parentesco'],
                ]);
            }
        });

        return redirect()->route('family');
    }

    public function update(UpdateFamilyRequest $request, Family $family)
    {
        $data = $request->validated();

        DB::transaction(function () use ($data, $family) {
            $family->update([
                'responsible_name'           => $data['name'],
                'responsible_cpf'            => $data['cpf'],
                'responsible_birth_date'     => $data['data_nascimento'],
                'responsible_phone'          => $data['telefone'],
                'responsible_email'          => $data['email'] ?? null,
                'income_source'              => $data['fonte_renda'] ?? null,
                'total_income'               => isset($data['renda_familiar']) ? (int) ($data['renda_familiar'] * 100) : 0,
                'receives_government_aid'    => ($data['recebe_auxilio'] ?? 'nao') === 'sim',
                'government_aid_description' => $data['auxilios_recebidos'] ?? null,
                'housing_condition'          => $data['moradia'] ?? null,
                'general_observations'       => $data['general_observations'] ?? null,
            ]);

            $family->address()->updateOrCreate(
                ['family_id' => $family->id],
                [
                    'zipcode'      => $data['cep'],
                    'street'       => $data['logradouro'],
                    'number'       => $data['numero'],
                    'neighborhood' => $data['bairro'],
                    'city'         => $data['cidade'],
                    'state'        => $data['UF'],
                ]
            );

            $family->members()->delete();

            foreach ($data['family_members'] ?? [] as $member) {
                $family->members()->create([
                    'name'         => $member['name'],
                    'cpf'          => $member['cpf'] ?? null,
                    'birth_date'   => $member['data_nascimento'],
                    'relationship' => $member['relacao_parentesco'],
                ]);
            }
        });

        return redirect()->route('family.info', $family->id);
    }

    public function deactivate(Family $family)
    {
        $family->update(['is_active' => false]);

        return redirect()->route('family');
    }

    public function activate(Family $family)
    {
        $family->update(['is_active' => true]);

        return redirect()->route('family');
    }
}
