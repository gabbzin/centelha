<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFamilyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'                                => ['required', 'string', 'max:255'],
            'cpf'                                 => ['required', 'string', 'size:11', 'unique:families,responsible_cpf'],
            'telefone'                            => ['required', 'string', 'min:10', 'max:11'],
            'email'                               => ['nullable', 'email', 'max:255'],
            'data_nascimento'                     => ['required', 'date'],

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

            'family_members'                      => ['nullable', 'array'],
            'family_members.*.name'               => ['required', 'string', 'max:100'],
            'family_members.*.cpf'                => ['required', 'string', 'size:11'],
            'family_members.*.data_nascimento'    => ['required', 'date'],
            'family_members.*.relacao_parentesco' => ['required', 'string', 'max:50'],
        ];
    }

    public function messages(): array
    {
        return [
            'cpf.unique'                 => 'Este CPF já está cadastrado no sistema.',
            'name.required'              => 'O nome do responsável é obrigatório.',
            'data_nascimento.required'   => 'A data de nascimento é obrigatória.',
            'cep.required'               => 'O CEP é obrigatório.',
            'logradouro.required'        => 'O logradouro é obrigatório.',
            'numero.required'            => 'O número é obrigatório.',
            'cidade.required'            => 'A cidade é obrigatória.',
            'UF.required'                => 'O estado (UF) é obrigatório.',
            'bairro.required'            => 'O bairro é obrigatório.',
        ];
    }
}
