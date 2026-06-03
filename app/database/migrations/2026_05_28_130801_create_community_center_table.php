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
        Schema::create('community_center', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('location');
            $table->string('slogan')->nullable();
            $table->string('rodape_text')->nullable();
            $table->string('logo_path');
            $table->string('favicon_path');
            $table->string('fontFamily');
            $table->jsonb('settings');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('community_center');
    }
};
