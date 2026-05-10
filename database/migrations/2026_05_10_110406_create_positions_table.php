<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('positions', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Nama Jabatan (ex: Dosen, Staff IT, Rektor)
            $table->string('code')->unique(); // Kode Jabatan (ex: DSN, SIT, REK)
            $table->string('alias')->nullable(); // Singkatan resmi

            // Finansial (Opsional: Jika tunjangan dipatok berdasarkan jabatan)
            $table->decimal('positional_allowance', 15, 2)->default(0); // Tunjangan Jabatan

            // Hierarki & Struktur
            $table->integer('level')->default(1); // Level organisasi (1, 2, 3 dst)
            $table->boolean('is_academic')->default(false); // Membedakan jabatan dosen vs tendik

            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('positions');
    }
};
