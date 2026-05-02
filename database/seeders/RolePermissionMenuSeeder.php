<?php

namespace Database\Seeders;

use App\Models\Menu;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionMenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Buat Role & Permission
        $adminRole = Role::create(['name' => 'admin']);
        $permission = Permission::create(['name' => 'Dashboard']);
        $adminRole->givePermissionTo($permission);

        // 2. Buat Menu
        Menu::create([
            'name' => 'Dashboard',
            'url' => '/dashboard',
            'category' => 'MAIN',
            'active' => true
        ]);

        // 3. Assign Role ke User (Ganti ID sesuai user Anda)
        User::find(1)->assignRole('admin');
    }
}
