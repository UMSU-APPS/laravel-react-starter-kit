<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create(['name' => 'lecturer']);
        Role::create(['name' => 'assessment']);
        Role::create(['name' => 'administrator']);
        Role::create(['name' => 'superadmin']);
        Role::create(['name' => 'prodi']);
        Role::create(['name' => 'pjblok']);
    }
}
