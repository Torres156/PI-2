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
        Schema::create('emprestimo', function (Blueprint $table) {
            $table->id();

            $table->bigInteger('id_aluno')->unsigned();
            $table->bigInteger('id_livro')->unsigned();
            $table->string('estado');
            $table->string('status');
            $table->date('dt_entrega');

            $table->foreign('id_aluno')->references('id')->on('aluno')->onDelete('cascade');
            $table->foreign('id_livro')->references('id')->on('livro')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('emprestimo');
    }
};
