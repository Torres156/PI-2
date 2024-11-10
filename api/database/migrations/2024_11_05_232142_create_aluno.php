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
        Schema::create('aluno', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->string('ra', 50);
            $table->string('email')->nullable();
            $table->string('dt_nascimento',15);
            $table->string('telefone', 15)->nullable();
            $table->string('sala', 30);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('aluno');
    }
};
