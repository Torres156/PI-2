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
        Schema::create('livro', function (Blueprint $table) {
            $table->id();
            $table->string('nome',255);
            $table->string('localizacao',50)->nullable();
            $table->string('editora',50)->nullable();
            $table->string('autor',100);
            $table->string('categoria',100)->nullable();
            $table->string('faixa_etaria',2)->nullable();
            $table->string('nm_foto',255)->nullable();
            $table->text('resumo')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('livro');
    }
};
