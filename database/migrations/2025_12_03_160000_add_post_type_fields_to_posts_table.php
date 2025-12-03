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
        Schema::table('posts', function (Blueprint $table) {
            $table->enum('post_type', ['noticia', 'evento', 'torneo'])->default('noticia')->after('slug');
            $table->dateTime('event_date')->nullable()->after('post_type');
            $table->string('contact_email')->nullable()->after('event_date');
            $table->json('form_fields')->nullable()->after('contact_email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->dropColumn(['post_type', 'event_date', 'contact_email', 'form_fields']);
        });
    }
};
