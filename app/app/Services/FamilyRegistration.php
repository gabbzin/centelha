<?php

declare(strict_types=1);

namespace App\Services;

use App\Dto\FamilyData;
use App\Dto\FamilyResult;
use App\Models\Family;
use Illuminate\Support\Facades\DB;

final class FamilyRegistration
{
    public function execute(FamilyData $data, ?Family $existing = null): FamilyResult
    {
        $family = DB::transaction(function () use ($data, $existing): Family {
            $attributes = [
                'responsible_name' => $data->responsibleName,
                'responsible_cpf' => $data->cpf,
                'responsible_birth_date' => $data->birthDate,
                'responsible_phone' => $data->phone,
                'responsible_email' => $data->email,
                'income_source' => $data->incomeSource,
                'total_income' => $data->totalIncome,
                'receives_government_aid' => $data->receivesGovernmentAid,
                'government_aid_description' => $data->governmentAidDescription,
                'housing_condition' => $data->housingCondition,
                'general_observations' => $data->generalObservations,
            ];

            if ($existing instanceof Family) {
                $existing->update($attributes);
                $family = $existing;
            } else {
                $family = Family::create($attributes);
            }

            $family->address()->updateOrCreate(
                ['family_id' => $family->id],
                [
                    'zipcode' => $data->address->zipcode,
                    'street' => $data->address->street,
                    'number' => $data->address->number,
                    'neighborhood' => $data->address->neighborhood,
                    'city' => $data->address->city,
                    'state' => $data->address->state,
                ]
            );

            $family->members()->delete();

            foreach ($data->members as $member) {
                $family->members()->create([
                    'name' => $member->name,
                    'cpf' => $member->cpf,
                    'birth_date' => $member->birthDate,
                    'relationship' => $member->relationship,
                ]);
            }

            return $family;
        });

        DashboardDataProvider::bumpVersion();

        return new FamilyResult($family);
    }
}
