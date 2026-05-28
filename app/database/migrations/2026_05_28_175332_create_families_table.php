<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('families', function (Blueprint $table) {
            $table->id();
            // Dados do Responsável
            $table->string('responsible_name');
            $table->string('responsible_cpf')->unique();
            $table->date('responsible_birth_date');
            $table->string('responsible_phone');
            $table->string('responsible_email')->nullable();
            $table->boolean('is_active')->default(true);
            
            // Dados Socioeconômicos
            $table->integer('total_income')->default(0); // Valor em centavos
            $table->string('income_source')->nullable(); // Ex: Informal, Formal
            $table->boolean('receives_government_aid')->default(false);
            $table->string('government_aid_description')->nullable(); // Ex: Bolsa Família
            $table->string('housing_condition')->nullable(); // Própria, Alugada, Ocupação
            
            // Observações Gerais
            $table->text('general_observations')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('families');
    }
};
