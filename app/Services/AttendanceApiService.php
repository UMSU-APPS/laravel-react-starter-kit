<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\ValidationException;

class AttendanceApiService
{
    public function getPaginatedApiAttendances(Request $request)
    {
        $response = Http::get(config('app.umsu_api') . "/attendances");
        $data = $response->json('data') ?? [];

        // Transform data to match our format
        return collect($data)->map(function ($attendance) {
            return [
                'id' => $attendance['id'],
                'attendanceEmail' => $attendance['attendanceEmail'] ?? '',
                'attendanceLocation' => $attendance['attendanceLocation'] ?? '',
                'attendanceLatitude' => $attendance['attendanceLatitude'] ?? 0,
                'attendanceLongitude' => $attendance['attendanceLongitude'] ?? 0,
                'attendanceDescription' => $attendance['attendanceDescription'] ?? '',
                'attendanceCreatedAt' => $attendance['attendanceCreatedAt'] ?? '',
            ];
        });
    }
}
