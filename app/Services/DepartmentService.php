<?php

namespace App\Services;

use App\Models\Referencies\Departments;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class DepartmentService
{
    public function getPaginatedDepartments(Request $request)
    {
        $search = $request->input('search');
        $perPage = $request->input('per_page', 10);

        return Departments::query()
            ->with(['parent', 'head'])
            ->when($search, function ($query) use ($search) {
                $query->where('name', 'ILIKE', "%{$search}%")
                    ->orWhere('code', 'ILIKE', "%{$search}%");
            })
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
    }

    public function getTreeDepartments()
    {
        return Departments::with(['children', 'head'])
            ->whereNull('parent_id')
            ->where('is_active', true)
            ->get();
    }

    public function getActiveDepartments()
    {
        return Departments::where('is_active', true)
            ->orderBy('code')
            ->get(['id', 'name', 'code', 'parent_id']);
    }

    public function delete(Departments $department)
    {
        // Cek apakah masih punya sub-departments
        if ($department->children()->count() > 0) {
            throw ValidationException::withMessages([
                'error' => 'Cannot delete department with sub-departments. Please delete or move sub-departments first.',
            ]);
        }

        return $department->delete();
    }
}
