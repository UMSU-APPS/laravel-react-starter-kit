<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Model;

#[Guarded('id')]
class Attendance extends Model
{

    protected $casts = [
        'attendanceLatitude' => 'float',
        'attendanceLongitude' => 'float',
        'attendanceCreatedAt' => 'datetime',
    ];

    protected $dates = ['attendanceCreatedAt'];
}
