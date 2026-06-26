<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('community_center', function (Blueprint $table) {
            $table->boolean('singleton')->nullable()->unique();
        });

        $keeper = DB::table('community_center')->orderBy('id')->first();

        if ($keeper) {
            DB::table('community_center')->where('id', '!=', $keeper->id)->delete();
            DB::table('community_center')->where('id', $keeper->id)->update(['singleton' => true]);
        }
    }

    public function down(): void
    {
        Schema::table('community_center', function (Blueprint $table) {
            $table->dropUnique(['singleton']);
            $table->dropColumn('singleton');
        });
    }
};
