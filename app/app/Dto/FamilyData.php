<?php

declare(strict_types=1);

namespace App\Dto;

use Illuminate\Foundation\Http\FormRequest;

final readonly class FamilyData
{
    /**
     * @param  array<int, MemberData>  $members
     */
    public function __construct(
        public readonly string $responsibleName,
        public readonly string $cpf,
        public readonly string $birthDate,
        public readonly string $phone,
        public readonly ?string $email,
        public readonly ?string $incomeSource,
        public readonly int $totalIncome,
        public readonly bool $receivesGovernmentAid,
        public readonly ?string $governmentAidDescription,
        public readonly ?string $housingCondition,
        public readonly ?string $generalObservations,
        public readonly AddressData $address,
        public readonly array $members,
    ) {}

    public static function fromRequest(FormRequest $request): self
    {
        $data = $request->validated();

        return new self(
            responsibleName: $data['name'],
            cpf: $data['cpf'],
            birthDate: $data['data_nascimento'],
            phone: $data['telefone'],
            email: $data['email'] ?? null,
            incomeSource: $data['fonte_renda'] ?? null,
            totalIncome: isset($data['renda_familiar']) ? (int) ($data['renda_familiar'] * 100) : 0,
            receivesGovernmentAid: ($data['recebe_auxilio'] ?? 'nao') === 'sim',
            governmentAidDescription: $data['auxilios_recebidos'] ?? null,
            housingCondition: $data['moradia'] ?? null,
            generalObservations: $data['general_observations'] ?? null,
            address: new AddressData(
                zipcode: $data['cep'],
                street: $data['logradouro'],
                number: $data['numero'],
                neighborhood: $data['bairro'],
                city: $data['cidade'],
                state: $data['UF'],
            ),
            members: array_map(
                static fn (array $member): MemberData => new MemberData(
                    name: $member['name'],
                    cpf: $member['cpf'] ?? null,
                    birthDate: $member['data_nascimento'] ?? null,
                    relationship: $member['relacao_parentesco'] ?? null,
                ),
                $data['family_members'] ?? [],
            ),
        );
    }
}
