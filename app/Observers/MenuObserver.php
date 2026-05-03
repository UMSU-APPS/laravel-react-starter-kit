<?php

namespace App\Observers;

use App\Models\Configuration\Menu;
use Spatie\Permission\Models\Permission;

class MenuObserver
{
    /**
     * Otomatis dipanggil setiap kali Menu::create() dijalankan.
     */
    public function created(Menu $menu): void
    {
        // Mencari atau membuat permission dengan nama yang sama dengan menu
        Permission::findOrCreate("read {$menu->name}");
    }

    /**
     * Otomatis dipanggil saat menu diupdate.
     * Opsional: jika nama menu berubah, nama permission juga berubah.
     */
    public function updated(Menu $menu): void
    {
        if ($menu->isDirty('name')) {
            $oldName = $menu->getOriginal('name');
            Permission::where('name', $oldName)->update(['name' => $menu->name]);
        }
    }

    /**
     * Otomatis dipanggil saat menu dihapus.
     */
    public function deleted(Menu $menu): void
    {
        Permission::where('name', "read {$menu->name}")->delete();

        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();
    }
}
