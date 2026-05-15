<?php

namespace Database\Seeders;

use App\Models\Referencies\Departments;
use Illuminate\Database\Seeder;

class DepartmentSeeder extends Seeder
{
    public function run(): void
    {
        // Level 1: Root Departments (Direktorat/Biro Utama)
        $rektorat = Departments::updateOrCreate(
            ['code' => 'REKTORAT'],
            [
                'name' => 'Rektorat',
                'parent_id' => null,
                'head_id' => null,
                'is_active' => true,
            ]
        );

        $ft = Departments::updateOrCreate(
            ['code' => 'FT'],
            [
                'name' => 'Fakultas Teknik',
                'parent_id' => null,
                'head_id' => null,
                'is_active' => true,
            ]
        );

        $fai = Departments::updateOrCreate(
            ['code' => 'FAI'],
            [
                'name' => 'Fakultas Agama Islam',
                'parent_id' => null,
                'head_id' => null,
                'is_active' => true,
            ]
        );

        $fisip = Departments::updateOrCreate(
            ['code' => 'FISIP'],
            [
                'name' => 'Fakultas Ilmu Sosial dan Politik',
                'parent_id' => null,
                'head_id' => null,
                'is_active' => true,
            ]
        );

        $biroAdm = Departments::updateOrCreate(
            ['code' => 'BIRO-ADM'],
            [
                'name' => 'Biro Administrasi Umum',
                'parent_id' => null,
                'head_id' => null,
                'is_active' => true,
            ]
        );

        $biroKeu = Departments::updateOrCreate(
            ['code' => 'BIRO-KEU'],
            [
                'name' => 'Biro Keuangan',
                'parent_id' => null,
                'head_id' => null,
                'is_active' => true,
            ]
        );

        $lppm = Departments::updateOrCreate(
            ['code' => 'LPPM'],
            [
                'name' => 'Lembaga Penelitian dan Pengabdian Masyarakat',
                'parent_id' => null,
                'head_id' => null,
                'is_active' => true,
            ]
        );

        // Level 2: Sub-departments/Program Studi under Fakultas
        // Under FT
        Departments::updateOrCreate(
            ['code' => 'TI'],
            [
                'name' => 'Program Studi Teknik Informatika',
                'parent_id' => $ft->id,
                'head_id' => null,
                'is_active' => true,
            ]
        );

        Departments::updateOrCreate(
            ['code' => 'TE'],
            [
                'name' => 'Program Studi Teknik Elektro',
                'parent_id' => $ft->id,
                'head_id' => null,
                'is_active' => true,
            ]
        );

        Departments::updateOrCreate(
            ['code' => 'TS'],
            [
                'name' => 'Program Studi Teknik Sipil',
                'parent_id' => $ft->id,
                'head_id' => null,
                'is_active' => true,
            ]
        );

        Departments::updateOrCreate(
            ['code' => 'TM'],
            [
                'name' => 'Program Studi Teknik Mesin',
                'parent_id' => $ft->id,
                'head_id' => null,
                'is_active' => true,
            ]
        );

        // Under FAI
        Departments::updateOrCreate(
            ['code' => 'PAI'],
            [
                'name' => 'Pendidikan Agama Islam',
                'parent_id' => $fai->id,
                'head_id' => null,
                'is_active' => true,
            ]
        );

        Departments::updateOrCreate(
            ['code' => 'PBA'],
            [
                'name' => 'Pendidikan Bahasa Arab',
                'parent_id' => $fai->id,
                'head_id' => null,
                'is_active' => true,
            ]
        );

        Departments::updateOrCreate(
            ['code' => 'EKONOMI-SYARIAH'],
            [
                'name' => 'Ekonomi Syariah',
                'parent_id' => $fai->id,
                'head_id' => null,
                'is_active' => true,
            ]
        );

        // Under FISIP
        Departments::updateOrCreate(
            ['code' => 'ILKOM'],
            [
                'name' => 'Ilmu Komunikasi',
                'parent_id' => $fisip->id,
                'head_id' => null,
                'is_active' => true,
            ]
        );

        Departments::updateOrCreate(
            ['code' => 'HI'],
            [
                'name' => 'Hubungan Internasional',
                'parent_id' => $fisip->id,
                'head_id' => null,
                'is_active' => true,
            ]
        );

        // Level 2: Bagian under Biro
        // Under Biro Administrasi
        Departments::updateOrCreate(
            ['code' => 'BAG-KEP'],
            [
                'name' => 'Bagian Kepegawaian',
                'parent_id' => $biroAdm->id,
                'head_id' => null,
                'is_active' => true,
            ]
        );

        Departments::updateOrCreate(
            ['code' => 'BAG-UMUM'],
            [
                'name' => 'Bagian Umum dan Perlengkapan',
                'parent_id' => $biroAdm->id,
                'head_id' => null,
                'is_active' => true,
            ]
        );

        Departments::updateOrCreate(
            ['code' => 'BAG-KER'],
            [
                'name' => 'Bagian Kemahasiswaan dan Kerjasama',
                'parent_id' => $biroAdm->id,
                'head_id' => null,
                'is_active' => true,
            ]
        );

        // Under Biro Keuangan
        Departments::updateOrCreate(
            ['code' => 'BAG-PMB'],
            [
                'name' => 'Bagian Pembukuan',
                'parent_id' => $biroKeu->id,
                'head_id' => null,
                'is_active' => true,
            ]
        );

        Departments::updateOrCreate(
            ['code' => 'BAG-ANG'],
            [
                'name' => 'Bagian Anggaran',
                'parent_id' => $biroKeu->id,
                'head_id' => null,
                'is_active' => true,
            ]
        );

        // Level 2: Under LPPM
        Departments::updateOrCreate(
            ['code' => 'PENELITIAN'],
            [
                'name' => 'Unit Penelitian',
                'parent_id' => $lppm->id,
                'head_id' => null,
                'is_active' => true,
            ]
        );

        Departments::updateOrCreate(
            ['code' => 'PPM'],
            [
                'name' => 'Unit Pengabdian kepada Masyarakat',
                'parent_id' => $lppm->id,
                'head_id' => null,
                'is_active' => true,
            ]
        );

        // Additional Inactive Department (for testing)
        Departments::updateOrCreate(
            ['code' => 'FBD'],
            [
                'name' => 'Fakultas Bisnis dan Digital (Inactive)',
                'parent_id' => null,
                'head_id' => null,
                'is_active' => false,
            ]
        );
    }
}
