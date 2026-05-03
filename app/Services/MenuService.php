<?php

namespace App\Services;

use App\Models\Configuration\Menu;
use Illuminate\Support\Facades\Auth;

class MenuService
{
    public function getMyMenu()
    {
        $user = Auth::user();

        return Menu::query()
            ->active()
            ->with(['subMenus' => fn($q) => $q->active()->orderBy('orders')])
            ->whereNull('main_menu_id')
            ->orderBy('orders')
            ->get()
            ->filter(fn($menu) => $user->can("read {$menu->url}"))
            ->map(function ($menu) use ($user) {
                if ($menu->subMenus->isNotEmpty()) {
                    $filtered = $menu->subMenus
                        ->filter(fn($sm) => $user->can("read {$sm->url}"))
                        ->values(); // Reset index
                    $menu->setRelation('subMenus', $filtered);
                }
                return $menu;
            })
            ->values(); // Reset index utama
    }
}
