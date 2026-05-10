<?php

namespace App\Models\Referencies;

use App\Models\Master\Employee;
use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Guarded(['id'])]
class Positions extends Model
{
    //

    protected $casts = [
        'positional_allowance' => 'decimal:2',
        'is_academic' => 'boolean',
        'is_active' => 'boolean',
    ];

    /**
     * Relasi ke Employee (Satu jabatan bisa dimiliki banyak pegawai)
     */
    public function employees(): HasMany
    {
        return $this->hasMany(Employee::class);
    }
}
