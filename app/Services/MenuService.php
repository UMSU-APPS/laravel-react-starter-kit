<?php

namespace App\Services;

use App\Models\Menu;
use Illuminate\Support\Facades\Auth;

class MenuService
{
    public function getMyMenu()
    {
        $user = Auth::user();
        if (!$user) return [];

        return Menu::with('subMenus')
            ->whereNull('main_menu_id')
            ->active()
            ->orderBy('orders')
            ->get()
            ->filter(function ($menu) use ($user) {
                // User bisa lihat menu jika punya permission 'name' menu tsb
                return $user->can($menu->name) || $menu->subMenus->contains(fn($s) => $user->can($s->name));
            })
            ->map(function ($menu) use ($user) {
                // Filter sub-menu yang tidak diizinkan
                $menu->setRelation('subMenus', $menu->subMenus->filter(fn($s) => $user->can($s->name)));
                return $menu;
            })
            ->values();
    }
}
