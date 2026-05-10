<?php

namespace App\Models\Master;

use App\Models\Referencies\Positions;
use App\Models\User;
use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Guarded(['id'])]
class Employee extends Model
{
    //

    protected $casts = [
        'join_date' => 'date',
        'date_of_birth' => 'date',
        'exit_date' => 'date',
        'is_active' => 'boolean',
        'preferences' => 'array',
        'extra_attributes' => 'array',
        'basic_salary' => 'decimal:2',
    ];

    // Relasi ke User (Login)
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function position(): BelongsTo
    {
        return $this->belongsTo(Positions::class);
    }
}
