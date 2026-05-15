<?php

namespace App\Http\Controllers\Referencies;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoredepartmentsRequest;
use App\Http\Requests\UpdatedepartmentsRequest;
use App\Models\Referencies\Departments;
use App\Services\DepartmentService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    public function __construct(protected DepartmentService $departmentService) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('referencies/department/index', [
            'departments' => $this->departmentService->getPaginatedDepartments($request),
            'filters' => $request->only(['search', 'per_page']),
            'departmentsTree' => $this->departmentService->getTreeDepartments(),
            'allDepartments' => $this->departmentService->getActiveDepartments(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('referencies/department/create', [
            'allDepartments' => $this->departmentService->getActiveDepartments(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoredepartmentsRequest $request)
    {
        Departments::create($request->validated());

        return redirect()->route('departments.index')
            ->with('success', 'Department created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Departments $department)
    {
        return Inertia::render('referencies/department/show', [
            'department' => $department->load(['parent', 'children', 'head']),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Departments $department)
    {
        return Inertia::render('referencies/department/edit', [
            'department' => $department,
            'allDepartments' => $this->departmentService->getActiveDepartments(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatedepartmentsRequest $request, Departments $department)
    {
        $department->update($request->validated());

        return redirect()->route('departments.index')
            ->with('success', 'Department updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Departments $department)
    {
        $this->departmentService->delete($department);

        return back()->with('success', 'Department deleted successfully.');
    }
}
