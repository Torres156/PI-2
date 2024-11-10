<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Livro extends Model
{
    use HasFactory;

    protected $table = 'livro';
    public $timestamps = true;

    protected $fillable = [
       'nome',
       'localizacao',
       'editora',
       'autor',
       'categoria',
       'faixa_etaria',
       'nm_foto',
       'resumo',
    ];
}
