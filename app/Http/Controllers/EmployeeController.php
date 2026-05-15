<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreemployeeRequest;
use App\Http\Requests\UpdateemployeeRequest;
use App\Models\Master\Employee;
use App\Models\Referencies\Positions;
use App\Services\EmployeeService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function __construct(protected EmployeeService $employeeService) {}
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Inertia::render('master/employee/index', [
            'employees' => $this->employeeService->getPaginatedEmployees($request),
            'filters' => $request->only(['search', 'per_page']),
            'positions' => Positions::where('is_active', true)->get(['id', 'name', 'code']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEmployeeRequest $request)
    {
        Employee::create($request->validated());
        return back()->with('success', 'Employee created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(employee $employee)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(employee $employee)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEmployeeRequest $request, Employee $employee)
    {
        $employee->update($request->validated());

        return back()->with('success', 'Employee updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Employee $employee)
    {
        $this->employeeService->delete($employee);
        return back()->with('success', 'Employee deleted successfully.');
    }
}
