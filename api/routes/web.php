<?php

use App\Http\Controllers\AlunoController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmprestimoController;
use App\Http\Controllers\LivroController;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\UsuarioController;
use App\Http\Middleware\AuthMiddleware;
use Illuminate\Support\Facades\Route;


Route::post('/auth', [AuthController::class, 'login']);

Route::prefix('dados')->name('dados.')->group(function(){
    Route::get('/', [SiteController::class, 'index']);    
    Route::get('/livros', [SiteController::class, 'livros']);    
    Route::get('/livro/{id}', [SiteController::class, 'livro']);    
});

Route::middleware(AuthMiddleware::class)->group(function() {   

    Route::get('/', [AuthController::class, 'index']);    
    Route::get('/dashboard', [DashboardController::class, 'index']);    

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
        Route::delete('/deletar/{id}', [LivroController::class, 'deletar']);
    });

    Route::prefix('emprestimos')->name('emprestimos.')->group(function(){
        Route::get('/', [EmprestimoController::class, 'index']);              
        Route::get('/emprestados', [EmprestimoController::class, 'emprestados']);  
        Route::get('/livros', [EmprestimoController::class, 'livros']);  

        Route::post('/criar', [EmprestimoController::class, 'criar']);    
        Route::put('/devolver/{id}', [EmprestimoController::class, 'devolver']);
        
        Route::delete('/deletar/{id}', [EmprestimoController::class, 'deletar']);
    });

    Route::prefix('usuarios')->name('usuarios.')->group(function(){
        Route::get('/', [UsuarioController::class, 'index']);     
        Route::get('/{id}', [UsuarioController::class, 'usuario']);    
        
        Route::post('/criar', [UsuarioController::class, 'criar']);    
        Route::post('/salvar', [UsuarioController::class, 'salvar']);    
        Route::delete('/deletar/{id}', [UsuarioController::class, 'deletar']);
    });
});

