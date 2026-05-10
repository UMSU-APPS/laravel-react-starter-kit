<?php

namespace Database\Seeders;

use App\Models\Configuration\Menu;
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
        $mmConfig = Menu::updateOrCreate(['url' => 'configuration'], [
            'name' => 'Configuration',
            'category' => 'MANAGEMENT',
            'icon' => 'Settings',
            'active' => 1,
            'orders' => 1
        ]);
        $this->attachMenuPermission($mmConfig, ['read'], ['administrator']);

        // Sub Menu Configuration
        $sm = $mmConfig->subMenus()->updateOrCreate(['url' => $mmConfig->url . '/menu'], [
            'name' => 'Menu',
            'category' => $mmConfig->category,
            'icon' => 'LayoutList',
            'active' => 1,
            'orders' => 1
        ]);
        $this->attachMenuPermission($sm, ['read', 'create', 'update', 'delete', 'sort'], ['administrator']);

        $sm = $mmConfig->subMenus()->updateOrCreate(['url' => $mmConfig->url . '/roles'], [
            'name' => 'Roles',
            'category' => $mmConfig->category,
            'icon' => 'ShieldCheck',
            'active' => 1,
            'orders' => 2
        ]);
        $this->attachMenuPermission($sm, ['read', 'create', 'update', 'delete'], ['administrator']);

        $sm = $mmConfig->subMenus()->updateOrCreate(['url' => $mmConfig->url . '/permissions'], [
            'name' => 'Permission',
            'category' => $mmConfig->category,
            'icon' => 'Key',
            'active' => 1,
            'orders' => 3
        ]);
        $this->attachMenuPermission($sm, ['read', 'create', 'update', 'delete'], ['administrator']);

        $sm = $mmConfig->subMenus()->updateOrCreate(['url' => $mmConfig->url . '/access-role'], [
            'name' => 'Access Role',
            'category' => $mmConfig->category,
            'icon' => 'UserCog',
            'active' => 1,
            'orders' => 4
        ]);
        $this->attachMenuPermission($sm, ['read', 'update'], ['administrator']);

        $sm = $mmConfig->subMenus()->updateOrCreate(['url' => $mmConfig->url . '/access-user'], [
            'name' => 'Access User',
            'category' => $mmConfig->category,
            'icon' => 'UserCheck',
            'active' => 1,
            'orders' => 5
        ]);
        $this->attachMenuPermission($sm, ['read', 'update'], ['administrator']);

        $sm = $mmConfig->subMenus()->updateOrCreate(['url' => $mmConfig->url . '/users'], [
            'name' => 'Users',
            'category' => $mmConfig->category,
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
            'icon' => 'Server',
            'active' => 1,
            'orders' => 2
        ]);
        $this->attachMenuPermission($mmData, null, ['administrator']);

        // Sub Menu Referencies
        $sm = $mmData->subMenus()->updateOrCreate(['url' => $mmData->url . '/positions'], [
            'name' => 'Positions',
            'category' => $mmData->category,
            'icon' => 'LucideHandshake',
            'active' => 1,
            'orders' => 1
        ]);
        $this->attachMenuPermission($sm, ['read', 'create', 'update', 'delete'], ['administrator', 'pjblok']);

        $mmMaster = Menu::updateOrCreate(['url' => 'master'], [
            'name' => 'Master',
            'category' => 'DATA',
            'icon' => 'Database',
            'active' => 1,
            'orders' => 3
        ]);
        $this->attachMenuPermission($mmMaster, ['read'], ['administrator']);

        // Sub Menu Master
        $sm = $mmMaster->subMenus()->updateOrCreate(['url' => $mmMaster->url . '/employees'], [
            'name' => 'Employees',
            'category' => $mmMaster->category,
            'icon' => 'Identity',
            'active' => 1,
            'orders' => 1
        ]);
        $this->attachMenuPermission($sm, ['read', 'create', 'update', 'delete'], ['administrator']);
    }
}
