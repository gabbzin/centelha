<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('community_center', function (Blueprint $table) {
            $table->boolean('maintenance_mode')->default(false);
            $table->string('logo_path')->nullable()->change();
            $table->string('favicon_path')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('community_center', function (Blueprint $table) {
            $table->dropColumn('maintenance_mode');
            $table->string('logo_path')->nullable(false)->change();
            $table->string('favicon_path')->nullable(false)->change();
        });
    }
};
