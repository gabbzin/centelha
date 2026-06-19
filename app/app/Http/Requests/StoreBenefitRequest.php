<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBenefitRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'category' => ['required', 'in:Alimentação,Financeiro,Saúde,Vestuário,Educação'],
            'quantity' => ['required', 'integer', 'min:1'],
            'donor' => ['nullable', 'string', 'max:255'],
            'validity' => ['nullable', 'date'],
            'notes' => ['nullable', 'string'],
            'image' => ['nullable', 'file', 'mimes:png,jpg,jpeg,pdf', 'max:5120'],
        ];
    }
}
