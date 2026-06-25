<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateFamilyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $family = $this->route('family');

        return [
            'name'                                => ['required', 'string', 'max:255'],
            'cpf'                                 => ['required', 'string', 'size:11', Rule::unique('families', 'responsible_cpf')->ignore($family)],
            'telefone'                            => ['required', 'string', 'min:10', 'max:11'],
            'email'                               => ['nullable', 'email', 'max:255'],
            'data_nascimento'                     => ['required', 'date', 'before:18 years ago'],

            'cep'                                 => ['required', 'string', 'size:8'],
            'logradouro'                          => ['required', 'string', 'max:255'],
            'numero'                              => ['required', 'string', 'max:20'],
            'cidade'                              => ['required', 'string', 'max:100'],
            'UF'                                  => ['required', 'string', 'size:2'],
            'bairro'                              => ['required', 'string', 'max:100'],
            'moradia'                             => ['nullable', 'string', 'in:propria,alugada,cedida'],

            'fonte_renda'                         => ['nullable', 'string', 'max:50'],
            'renda_familiar'                      => ['nullable', 'numeric', 'min:0', 'max:3500'],
            'recebe_auxilio'                      => ['nullable', 'string', 'in:sim,nao'],
            'auxilios_recebidos'                  => ['nullable', 'string', 'max:255'],
            'general_observations'                => ['nullable', 'string', 'max:1000'],

            'family_members'                      => ['nullable', 'array'],
            'family_members.*.name'               => ['required', 'string', 'max:100'],
            'family_members.*.cpf'                => ['nullable', 'string', 'size:11'],
            'family_members.*.data_nascimento'    => ['required', 'date'],
            'family_members.*.relacao_parentesco' => ['required', 'string', 'max:50'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'cpf'      => preg_replace('/\D/', '', $this->cpf ?? ''),
            'telefone' => preg_replace('/\D/', '', $this->telefone ?? ''),
            'cep'      => preg_replace('/\D/', '', $this->cep ?? ''),
        ]);
    }

    public function messages(): array
    {
        return [
            'cpf.unique'                 => 'Este CPF já está cadastrado para outra família.',
            'data_nascimento.before'     => 'O responsável deve ter pelo menos 18 anos.',
        ];
    }
}
