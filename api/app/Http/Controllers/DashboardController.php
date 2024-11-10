<?php

namespace App\Http\Controllers;

use App\Models\Emprestimo;
use App\Models\Livro;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    function index()
    {
        $totalLivros = Livro::count();
        $totalEmprestimos = Emprestimo::where('status', 'EMPRESTADO')->count();
        $totalVencidos = Emprestimo::where('status', 'EMPRESTADO')->whereRaw('dt_entrega < NOW()')->count();

        return response()->json([
            'totalLivros' => $totalLivros,
            'totalEmprestimos' => $totalEmprestimos,
            'totalVencidos' => $totalVencidos,
        ]);
    }
}
