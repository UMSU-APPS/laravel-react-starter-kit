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
        //Config
        $mm = Menu::firstOrCreate(['url' => 'configuration'], [
            'name' => 'Configuration',
            'category' => 'MANAGEMENT',
            'icon' => 'bi bi-gear-wide-connected',
        ]);
        $this->attachMenuPermission($mm, ['read'], ['administrator']);

        $sm = $mm->subMenus()->create([
            'name' => 'Menu',
            'url' => $mm->url . '/menu',
            'category' => $mm->category,
        ]);
        $this->attachMenuPermission($sm, ['read', 'create', 'update', 'delete', 'sort'], ['administrator']);

        $sm = $mm->subMenus()->create([
            'name' => 'Roles',
            'url' => $mm->url . '/roles',
            'category' => $mm->category,
        ]);
        $this->attachMenuPermission($sm, ['read', 'create', 'update', 'delete'], ['administrator']);

        $sm = $mm->subMenus()->create([
            'name' => 'Permission',
            'url' => $mm->url . '/permissions',
            'category' => $mm->category,
        ]);
        $this->attachMenuPermission($sm, ['read', 'create', 'update', 'delete'], ['administrator']);

        $sm = $mm->subMenus()->create([
            'name' => 'Access Role',
            'url' => $mm->url . '/access-role',
            'category' => $mm->category,
        ]);
        $this->attachMenuPermission($sm, ['read', 'update'], ['administrator']);

        $sm = $mm->subMenus()->create([
            'name' => 'Access User',
            'url' => $mm->url . '/access-user',
            'category' => $mm->category,
        ]);
        $this->attachMenuPermission($sm, ['read', 'update'], ['administrator']);

        $sm = $mm->subMenus()->create([
            'name' => 'Users',
            'url' => $mm->url . '/users',
            'category' => $mm->category,
        ]);
        $this->attachMenuPermission($sm, null, ['administrator']);

        //DATA
        $mm = Menu::firstOrCreate(['url' => 'referencies'], [
            'name' => 'Referencies',
            'category' => 'DATA',
            'icon' => 'bi bi-book-half',
        ]);
        $this->attachMenuPermission($mm, null, ['administrator']);

        $sm = $mm->subMenus()->create([
            'name' => 'Area Competencies',
            'url' => $mm->url . '/area-competencies',
            'category' => $mm->category,
        ]);
        $this->attachMenuPermission($sm, ['read', 'create', 'update', 'delete'], ['administrator']);

        $sm = $mm->subMenus()->create([
            'name' => 'System Competencies',
            'url' => $mm->url . '/system-competencies',
            'category' => $mm->category,
        ]);
        $this->attachMenuPermission($sm, ['read', 'create', 'update', 'delete'], ['administrator']);

        $sm = $mm->subMenus()->create([
            'name' => 'Clinical Medicine',
            'url' => $mm->url . '/clinical-medicine',
            'category' => $mm->category,
        ]);
        $this->attachMenuPermission($sm, ['read', 'create', 'update', 'delete'], ['administrator']);

        $sm = $mm->subMenus()->create([
            'name' => 'Another Review',
            'url' => $mm->url . '/another-review',
            'category' => $mm->category,
        ]);
        $this->attachMenuPermission($sm, ['read', 'create', 'update', 'delete'], ['administrator']);
    }
}
