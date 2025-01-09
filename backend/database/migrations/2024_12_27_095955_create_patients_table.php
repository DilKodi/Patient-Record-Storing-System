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
        Schema::create('patients', function (Blueprint $table) {
            $table->id()->primary();
            $table->string('name', length: 100);
            $table->integer('age', length: 100);
            $table->string('contact_no', length: 10);
            $table->string('address', length: 100);
            $table->date('date_added', length: 10);
            $table->string('diagnosis', length: 100);
            $table->string('status', length: 10);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};
