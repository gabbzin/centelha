<?php

declare(strict_types=1);

namespace App\Dto;

use App\Http\Requests\StoreDeliveryRequest;
use Carbon\Carbon;
use Illuminate\Http\UploadedFile;

final readonly class DeliveryData
{
    public function __construct(
        public readonly int $familyId,
        public readonly int $benefitId,
        public readonly int $quantity,
        public readonly string $location,
        public readonly Carbon $deliveryDate,
        public readonly ?string $notes,
        public readonly ?UploadedFile $receipt,
        public readonly int $deliveredBy,
    ) {}

    public static function fromRequest(StoreDeliveryRequest $request): self
    {
        $data = $request->validated();

        return new self(
            familyId: (int) $data['family_id'],
            benefitId: (int) $data['benefit_id'],
            quantity: (int) $data['quantity'],
            location: $data['location'],
            deliveryDate: Carbon::parse($data['delivery_date']),
            notes: $data['notes'] ?? null,
            receipt: $request->file('receipt'),
            deliveredBy: (int) auth()->id(),
        );
    }
}
