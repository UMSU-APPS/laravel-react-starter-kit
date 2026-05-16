<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreattendanceRequest;
use App\Http\Requests\UpdateattendanceRequest;
use App\Models\Attendance;
use App\Services\AttendanceApiService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AttendanceApiController extends Controller
{
    public function __construct(protected AttendanceApiService $attendanceApiService) {}
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $transformedProducts = $this->attendanceApiService->getPaginatedApiAttendances($request);

        return Inertia::render('attendance/api', [
            'attendance' => $transformedProducts,
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
