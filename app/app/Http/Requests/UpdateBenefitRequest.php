<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBenefitRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'category' => ['sometimes', 'required', 'in:Alimentação,Financeiro,Saúde,Vestuário,Educação'],
            'stock' => ['sometimes', 'required', 'integer', 'min:0'],
            'status' => ['sometimes', 'required', 'in:Ativo,Revisão,Inativo'],
            'donor' => ['sometimes', 'nullable', 'string', 'max:255'],
            'validity' => ['sometimes', 'nullable', 'date'],
            'notes' => ['sometimes', 'nullable', 'string'],
            'image' => ['nullable', 'file', 'mimes:png,jpg,jpeg,pdf', 'max:5120'],
        ];
    }
}
