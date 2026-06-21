<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('deliveries', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique()->nullable();
            $table->foreignId('family_id')->constrained('families')->cascadeOnDelete();
            $table->foreignId('benefit_id')->nullable()->constrained('benefits')->nullOnDelete();
            $table->integer('quantity');
            $table->string('location');
            $table->date('delivery_date');
            $table->text('notes')->nullable();
            $table->string('receipt_path')->nullable();
            $table->foreignId('delivered_by')->nullable()->constrained('users')->nullOnDelete();
            $table->string('status')->default('Entregue');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('deliveries');
    }
};
