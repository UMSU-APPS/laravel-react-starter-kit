<?php

namespace App\Services;

use App\Models\Master\Employee;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class EmployeeService
{
    public function getPaginatedEmployees(Request $request)
    {
        $search = $request->input('search');
        $perPage = $request->input('per_page', 10);

        return Employee::query()
            ->with(['position', 'user'])
            ->when($search, function ($query) use ($search) {
                $query->where('full_name', 'ILIKE', "%{$search}%")
                    ->orWhere('nip', 'ILIKE', "%{$search}%")
                    ->orWhere('email', 'ILIKE', "%{$search}%");
            })
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
    }

    public function delete(Employee $employee)
    {
        // Optional: Add logic to prevent deletion if employee has related data
        return $employee->delete();
    }
}
