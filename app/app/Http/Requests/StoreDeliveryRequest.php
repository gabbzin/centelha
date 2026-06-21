<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDeliveryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'family_id' => ['required', 'exists:families,id'],
            'benefit_id' => ['required', 'exists:benefits,id'],
            'quantity' => ['required', 'integer', 'min:1'],
            'delivery_date' => ['required', 'date'],
            'location' => ['required', 'string', 'max:255'],
            'notes' => ['nullable', 'string'],
            'receipt' => ['nullable', 'file', 'mimes:png,jpg,jpeg,pdf', 'max:5120'],
        ];
    }

    public function messages(): array
    {
        return [
            'receipt.mimes' => 'Arquivo inválido. Formatos aceitos: PNG, JPG, PDF (máx. 5MB).',
            'receipt.max' => 'Arquivo inválido. Formatos aceitos: PNG, JPG, PDF (máx. 5MB).',
        ];
    }
}
