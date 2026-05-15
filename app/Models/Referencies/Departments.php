<?php

namespace App\Models\Referencies;

use App\Models\Master\Employee;
use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Guarded(['id'])]
class Departments extends Model
{
    protected $casts = [
        'is_active' => 'boolean',
    ];

    // Relasi ke Departemen Induk
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Departments::class, 'parent_id');
    }

    // Relasi ke Sub-Departemen
    public function children(): HasMany
    {
        return $this->hasMany(Departments::class, 'parent_id');
    }

    // Relasi ke Kepala Departemen/Manager
    public function head(): BelongsTo
    {
        return $this->belongsTo(Employee::class, 'head_id');
    }

    // Relasi ke Employees di departemen ini
    public function employees(): HasMany
    {
        return $this->hasMany(Employee::class, 'department_id');
    }
}
