<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePositionsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $positionId = $this->route('position')?->id;

        return [
            'code' => 'required|string|max:50|unique:positions,code,' . $positionId,
            'name' => 'required|string|max:255',
            'positional_allowance' => 'nullable|numeric|min:0',
            'is_academic' => 'boolean',
            'is_active' => 'boolean',
        ];
    }
}
