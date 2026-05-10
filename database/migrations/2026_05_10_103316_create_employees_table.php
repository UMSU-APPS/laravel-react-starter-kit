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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();

            // Identitas Utama
            $table->string('nip', 50)->unique();
            $table->string('nik', 20)->unique();
            $table->string('npwp', 25)->nullable(); // Penting untuk laporan pajak/slip gaji
            $table->string('full_name');
            $table->string('nickname', 50)->nullable();

            // Autentikasi & Kontak
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->string('email')->unique();
            $table->string('phone_number', 20)->nullable();

            // Detail Profil
            $table->enum('gender', ['L', 'P']);
            $table->string('place_of_birth')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->text('address')->nullable();
            $table->string('blood_type', 5)->nullable(); // Berguna untuk data kesehatan/darurat

            // Kepegawaian & Struktur
            $table->foreignId('position_id')->nullable();
            $table->foreignId('department_id')->nullable();
            $table->enum('employment_status', ['permanent', 'contract', 'probation', 'internship'])->default('contract');
            $table->enum('work_unit', ['akademik', 'non-akademik']);
            $table->date('join_date');
            $table->date('exit_date')->nullable();
            $table->boolean('is_active')->default(true);

            // Finansial (Slip Gaji)
            $table->decimal('basic_salary', 15, 2)->default(0);
            $table->string('bank_name')->nullable();
            $table->string('bank_account_number')->nullable();
            $table->string('bank_account_holder')->nullable();

            // Fitur Surat & Digital (Untuk Masa Depan)
            $table->string('signature_img')->nullable(); // Path tanda tangan transparan
            $table->string('digital_certificate_path')->nullable(); // Untuk integrasi E-Sign/TTE
            $table->string('qr_code_identifier')->nullable()->unique(); // Untuk scan fisik ID Card

            // Fitur Absensi & Perangkat
            $table->text('face_model_data')->nullable(); // Blob/JSON data biometrik
            $table->string('device_id')->nullable(); // Mengunci absen hanya pada 1 HP tertentu
            $table->string('rfid_card_number')->nullable()->unique(); // Jika kampus pakai kartu RFID

            // Metadata & Audit
            $table->json('preferences')->nullable(); // Menyimpan setting user (tema, bahasa, notif)
            $table->json('extra_attributes')->nullable(); // Menampung data dinamis tanpa tambah kolom
            $table->timestamps();
            $table->softDeletes(); // Menghindari kehilangan data jika tidak sengaja terhapus
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
