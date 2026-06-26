<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTagRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            "name" => ["required", "string", "max:100", Rule::unique("tags", "name")->ignore($this->route("tag"))],
            "color" => ["required", "string", "size:7"],
            "icon" => ["nullable", "string", "max:50"],
        ];
    }
}
