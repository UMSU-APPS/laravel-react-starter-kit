<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreEmployeeRequest extends FormRequest
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
        return [
            'nip' => 'required|string|max:50|unique:employees,nip',
            'nik' => 'required|string|max:20|unique:employees,nik',
            'npwp' => 'nullable|string|max:25',
            'full_name' => 'required|string|max:255',
            'nickname' => 'nullable|string|max:50',
            'email' => 'required|email|unique:employees,email',
            'phone_number' => 'nullable|string|max:20',
            'gender' => 'required|in:L,P',
            'place_of_birth' => 'nullable|string|max:255',
            'date_of_birth' => 'nullable|date',
            'address' => 'nullable|string',
            'blood_type' => 'nullable|string|max:5',
            'position_id' => 'nullable|exists:positions,id',
            'employment_status' => 'required|in:permanent,contract,probation,internship',
            'work_unit' => 'required|in:akademik,non-akademik',
            'join_date' => 'required|date',
            'exit_date' => 'nullable|date',
            'is_active' => 'boolean',
            'basic_salary' => 'nullable|numeric|min:0',
            'bank_name' => 'nullable|string|max:255',
            'bank_account_number' => 'nullable|string|max:255',
            'bank_account_holder' => 'nullable|string|max:255',
        ];
    }
}
