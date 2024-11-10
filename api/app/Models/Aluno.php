<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aluno extends Model
{
    use HasFactory;

    protected $table = 'aluno';
    public $timestamps = true;

    protected $fillable = [
        'nome',
        'ra',
        'email',
        'dt_nascimento',
        'telefone',
        'sala',
    ];
}
