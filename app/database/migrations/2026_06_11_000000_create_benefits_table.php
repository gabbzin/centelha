<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('benefits', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('name');
            $table->enum('category', ['Alimentação', 'Financeiro', 'Saúde', 'Vestuário', 'Educação']);
            $table->integer('stock')->default(0);
            $table->enum('status', ['Ativo', 'Revisão', 'Inativo'])->default('Ativo');
            $table->string('donor')->nullable();
            $table->date('validity')->nullable();
            $table->text('notes')->nullable();
            $table->string('image_path')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('benefits');
    }
};
