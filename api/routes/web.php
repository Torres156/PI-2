<?php

use App\Http\Controllers\AlunoController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmprestimoController;
use App\Http\Controllers\LivroController;
use App\Http\Middleware\AuthMiddleware;
use Illuminate\Support\Facades\Route;


Route::post('/auth', [AuthController::class, 'login']);

Route::middleware(AuthMiddleware::class)->group(function() {   

    Route::get('/', [AuthController::class, 'index']);    

    Route::prefix('alunos')->name('alunos.')->group(function(){
        Route::get('/', [AlunoController::class, 'index']);    
        Route::get('/{id}', [AlunoController::class, 'aluno']); 

        Route::post('/criar', [AlunoController::class, 'criar']);
        Route::post('/salvar', [AlunoController::class, 'salvar']);

        Route::delete('/deletar/{id}', [AlunoController::class, 'deletar']);
    });

    Route::prefix('livros')->name('livros.')->group(function(){
        Route::get('/', [LivroController::class, 'index']);    
        Route::get('/{id}', [LivroController::class, 'livro']);    

        Route::post('/criar', [LivroController::class, 'criar']);      
        Route::post('/salvar', [LivroController::class, 'salvar']);  
    });

    Route::prefix('emprestimos')->name('emprestimos.')->group(function(){
        Route::get('/', [EmprestimoController::class, 'index']);              
        Route::get('/livros', [EmprestimoController::class, 'livros']);  

        Route::post('/criar', [EmprestimoController::class, 'criar']);    
        
        Route::delete('/deletar/{id}', [EmprestimoController::class, 'deletar']);
    });
});
