<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table("family_specific_need", function (Blueprint $table) {
            $table->dropForeign(["specific_need_id"]);
        });

        Schema::rename("family_specific_need", "family_tag");

        Schema::table("family_tag", function (Blueprint $table) {
            $table->renameColumn("specific_need_id", "tag_id");
            $table->foreign("tag_id")->references("id")->on("tags")->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table("family_tag", function (Blueprint $table) {
            $table->dropForeign(["tag_id"]);
        });

        Schema::rename("family_tag", "family_specific_need");

        Schema::table("family_specific_need", function (Blueprint $table) {
            $table->renameColumn("tag_id", "specific_need_id");
            $table->foreign("specific_need_id")->references("id")->on("specific_needs")->cascadeOnDelete();
        });
    }
};
