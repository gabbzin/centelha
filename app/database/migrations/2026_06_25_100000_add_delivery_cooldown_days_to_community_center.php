<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('community_center', function (Blueprint $table) {
            $table->smallInteger('delivery_cooldown_days')->nullable()->after('maintenance_mode');
        });
    }

    public function down(): void
    {
        Schema::table('community_center', function (Blueprint $table) {
            $table->dropColumn('delivery_cooldown_days');
        });
    }
};
