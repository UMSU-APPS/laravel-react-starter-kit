<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdatedepartmentsRequest extends FormRequest
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
        $departmentId = $this->route('department')?->id;

        return [
            'code' => 'required|string|max:50|unique:departments,code,' . $departmentId,
            'name' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:departments,id|not_in:' . $departmentId,
            'head_id' => 'nullable|exists:employees,id',
            'is_active' => 'boolean',
        ];
    }
}
