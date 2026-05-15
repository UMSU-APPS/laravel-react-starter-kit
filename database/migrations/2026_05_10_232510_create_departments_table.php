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
        Schema::create('departments', function (Blueprint $create) {
            $create->id();
            // Kode unik untuk departemen (misal: FT, Biro-01)
            $create->string('code')->unique();
            $create->string('name');

            // Relasi ke departemen induk jika ada (Self-referencing)
            $create->foreignId('parent_id')
                ->nullable()
                ->constrained('departments')
                ->nullOnDelete();

            // Manager atau Kepala Bagian (FK ke tabel employees nanti)
            $create->unsignedBigInteger('head_id')->nullable();

            $create->boolean('is_active')->default(true);
            $create->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('departments');
    }
};
