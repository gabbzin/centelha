<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTagRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "name" => ["required", "string", "max:100", "unique:tags,name"],
            "color" => ["required", "string", "size:7"],
            "icon" => ["nullable", "string", "max:50"],
        ];
    }
}
