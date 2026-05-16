<?php

namespace App\Services;

use App\Models\Attendance;
use Illuminate\Http\Request;

class AttendanceService
{
    public function getPaginatedAttendances(Request $request)
    {
        $search = $request->input('search');
        $perPage = $request->input('per_page', 10);

        return Attendance::query()
            ->when($search, function ($query) use ($search) {
                $query->where('attendanceEmail', 'ILIKE', "%{$search}%")
                    ->orWhere('attendanceLocation', 'ILIKE', "%{$search}%")
                    ->orWhere('attendanceDescription', 'ILIKE', "%{$search}%");
            })
            ->orderBy('attendanceCreatedAt', 'desc')
            ->paginate($perPage)
            ->withQueryString();
    }

    public function delete(Attendance $attendance)
    {
        return $attendance->delete();
    }
}
