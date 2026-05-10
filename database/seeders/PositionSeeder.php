<?php

namespace Database\Seeders;

use App\Models\Referencies\Positions;
use Illuminate\Database\Seeder;

class PositionSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            // --- JABATAN STRUKTURAL (TOP LEVEL) ---
            [
                'name' => 'Rektor',
                'code' => 'REK',
                'alias' => 'Rektor',
                'positional_allowance' => 5000000,
                'level' => 1,
                'is_academic' => true,
            ],
            [
                'name' => 'Dekan Fakultas',
                'code' => 'DKN',
                'alias' => 'Dekan',
                'positional_allowance' => 3500000,
                'level' => 2,
                'is_academic' => true,
            ],
            [
                'name' => 'Ketua Program Studi',
                'code' => 'KAPRODI',
                'alias' => 'Ka. Prodi',
                'positional_allowance' => 2000000,
                'level' => 3,
                'is_academic' => true,
            ],

            // --- JABATAN FUNGSIONAL DOSEN ---
            [
                'name' => 'Dosen Tetap',
                'code' => 'DSN-T',
                'alias' => 'Dosen',
                'positional_allowance' => 1000000,
                'level' => 4,
                'is_academic' => true,
            ],
            [
                'name' => 'Dosen Luar Biasa',
                'code' => 'DSN-LB',
                'alias' => 'DLB',
                'positional_allowance' => 0,
                'level' => 4,
                'is_academic' => true,
            ],

            // --- JABATAN TENAGA KEPENDIDIKAN (TENDIK) ---
            [
                'name' => 'Kepala Biro Administrasi',
                'code' => 'KABA',
                'alias' => 'Ka. Biro',
                'positional_allowance' => 2500000,
                'level' => 3,
                'is_academic' => false,
            ],
            [
                'name' => 'Staf Administrasi',
                'code' => 'ADM',
                'alias' => 'Admin',
                'positional_allowance' => 500000,
                'level' => 5,
                'is_academic' => false,
            ],
            [
                'name' => 'Staf IT Support',
                'code' => 'ITS',
                'alias' => 'IT',
                'positional_allowance' => 750000,
                'level' => 5,
                'is_academic' => false,
            ],
        ];

        foreach ($data as $item) {
            Positions::updateOrCreate(['code' => $item['code']], $item);
        }
    }
}
