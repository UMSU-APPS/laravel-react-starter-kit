<?php

namespace Database\Seeders;

use App\Models\Menu;
use App\Traits\HasMenuPermission;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Cache;

class MenuSeeder extends Seeder
{
    use HasMenuPermission;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Cache::forget('menus');

        // =========================================================================
        // 1. KATEGORI MANAGEMENT
        // =========================================================================
        $mm = Menu::updateOrCreate(['url' => 'configuration'], [
            'name' => 'Configuration',
            'category' => 'MANAGEMENT',
            'icon' => 'Settings',
            'active' => 1,
            'orders' => 1
        ]);
        $this->attachMenuPermission($mm, ['read'], ['administrator']);

        // Sub Menu Configuration
        $sm = $mm->subMenus()->updateOrCreate(['url' => $mm->url . '/menu'], [
            'name' => 'Menu',
            'category' => $mm->category,
            'icon' => 'LayoutList',
            'active' => 1,
            'orders' => 1
        ]);
        $this->attachMenuPermission($sm, ['read', 'create', 'update', 'delete', 'sort'], ['administrator']);

        $sm = $mm->subMenus()->updateOrCreate(['url' => $mm->url . '/roles'], [
            'name' => 'Roles',
            'category' => $mm->category,
            'icon' => 'ShieldCheck',
            'active' => 1,
            'orders' => 2
        ]);
        $this->attachMenuPermission($sm, ['read', 'create', 'update', 'delete'], ['administrator']);

        $sm = $mm->subMenus()->updateOrCreate(['url' => $mm->url . '/permissions'], [
            'name' => 'Permission',
            'category' => $mm->category,
            'icon' => 'Key',
            'active' => 1,
            'orders' => 3
        ]);
        $this->attachMenuPermission($sm, ['read', 'create', 'update', 'delete'], ['administrator']);

        $sm = $mm->subMenus()->updateOrCreate(['url' => $mm->url . '/access-role'], [
            'name' => 'Access Role',
            'category' => $mm->category,
            'icon' => 'UserCog',
            'active' => 1,
            'orders' => 4
        ]);
        $this->attachMenuPermission($sm, ['read', 'update'], ['administrator']);

        $sm = $mm->subMenus()->updateOrCreate(['url' => $mm->url . '/access-user'], [
            'name' => 'Access User',
            'category' => $mm->category,
            'icon' => 'UserCheck',
            'active' => 1,
            'orders' => 5
        ]);
        $this->attachMenuPermission($sm, ['read', 'update'], ['administrator']);

        $sm = $mm->subMenus()->updateOrCreate(['url' => $mm->url . '/users'], [
            'name' => 'Users',
            'category' => $mm->category,
            'icon' => 'Users',
            'active' => 1,
            'orders' => 6
        ]);
        $this->attachMenuPermission($sm, null, ['administrator']);


        // =========================================================================
        // 2. KATEGORI DATA (Akses untuk Administrator & Pjblok)
        // =========================================================================
        $mmData = Menu::updateOrCreate(['url' => 'referencies'], [
            'name' => 'Referencies',
            'category' => 'DATA',
            'icon' => 'Database',
            'active' => 1,
            'orders' => 2
        ]);
        $this->attachMenuPermission($mmData, null, ['administrator', 'pjblok']);

        // Sub Menu Referencies
        $sm = $mmData->subMenus()->updateOrCreate(['url' => $mmData->url . '/area-competencies'], [
            'name' => 'Area Competencies',
            'category' => $mmData->category,
            'icon' => 'Map',
            'active' => 1,
            'orders' => 1
        ]);
        $this->attachMenuPermission($sm, ['read', 'create', 'update', 'delete'], ['administrator', 'pjblok']);

        $sm = $mmData->subMenus()->updateOrCreate(['url' => $mmData->url . '/system-competencies'], [
            'name' => 'System Competencies',
            'category' => $mmData->category,
            'icon' => 'Cpu',
            'active' => 1,
            'orders' => 2
        ]);
        $this->attachMenuPermission($sm, ['read', 'create', 'update', 'delete'], ['administrator', 'pjblok']);

        $sm = $mmData->subMenus()->updateOrCreate(['url' => $mmData->url . '/clinical-medicine'], [
            'name' => 'Clinical Medicine',
            'category' => $mmData->category,
            'icon' => 'Stethoscope',
            'active' => 1,
            'orders' => 3
        ]);
        $this->attachMenuPermission($sm, ['read', 'create', 'update', 'delete'], ['administrator', 'pjblok']);

        $sm = $mmData->subMenus()->updateOrCreate(['url' => $mmData->url . '/another-review'], [
            'name' => 'Another Review',
            'category' => $mmData->category,
            'icon' => 'ClipboardCheck',
            'active' => 1,
            'orders' => 4
        ]);
        $this->attachMenuPermission($sm, ['read', 'create', 'update', 'delete'], ['administrator', 'pjblok']);
    }
}
