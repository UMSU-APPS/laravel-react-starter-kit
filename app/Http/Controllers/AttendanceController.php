<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreattendanceRequest;
use App\Http\Requests\UpdateattendanceRequest;
use App\Models\Attendance;
use App\Services\AttendanceService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    public function __construct(protected AttendanceService $attendanceService) {}
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $transformedProducts = $this->attendanceService->getPaginatedAttendances($request);

        return Inertia::render('attendance/index', [
            'products' => $transformedProducts,
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
    public function store(StoreattendanceRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(attendance $attendance)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(attendance $attendance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateattendanceRequest $request, attendance $attendance)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(attendance $attendance)
    {
        //
    }
}
