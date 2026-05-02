<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Guarded(['id'])]
class Menu extends Model
{

    use HasFactory;

    public function subMenus()
    {
        return $this->hasMany(Menu::class, 'main_menu_id');
    }

    // public function permissions()
    // {
    //     return $this->belongsToMany(Permission::class, 'menu_permission', 'menu_id', 'permission_id');
    // }

    public function scopeActive($query)
    {
        return $query->where('active', true);
    }
}
