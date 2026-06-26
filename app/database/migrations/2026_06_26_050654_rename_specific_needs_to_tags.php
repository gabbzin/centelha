<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::rename("specific_needs", "tags");

        Schema::table("tags", function (Blueprint $table) {
            $table->string("color", 7)->default("#3B82F6")->after("name");
            $table->string("icon")->nullable()->after("color");
        });
    }

    public function down(): void
    {
        Schema::table("tags", function (Blueprint $table) {
            $table->dropColumn(["color", "icon"]);
        });

        Schema::rename("tags", "specific_needs");
    }
};
