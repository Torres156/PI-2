<?php

namespace App\Http\Controllers;

use App\Models\Emprestimo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EmprestimoController extends Controller
{
    function criar(Request $request)
    {
        $dados = $request->all();        
        $dados['dt_entrega'] = \Carbon\Carbon::createFromFormat('d/m/Y', $dados['dt_entrega'])->format('Y-m-d');
        $dados['status'] = 'EMPRESTADO';
        Emprestimo::create($dados);
        return response('Empréstimo realizado com sucesso');
    }

    function index()
    {
        $emprestimos = Emprestimo::with('aluno', 'livro')->orderBy('id', 'desc')->get();

        return response()->json($emprestimos);
    }

    function livros()
    {
        $livros = DB::select("SELECT * FROM livro l WHERE NOT EXISTS(SELECT * FROM emprestimo WHERE id_livro = l.id AND status = 'EMPRESTADO')");
        
        return response()->json($livros);
    }

    function deletar($id)
    {
        $emprestimo = Emprestimo::find($id);
        $emprestimo->delete();

        return response('Empréstimo/Devolução deletado com sucesso!');
    }

    function devolver($id)
    {
        $emprestimo = Emprestimo::find($id);
        $emprestimo->status = "DEVOLVIDO";
        $emprestimo->save();

        return response("Empréstimo devolvido com sucesso!");
    }

    function emprestados()
    {
        $emprestimos = Emprestimo::with('aluno', 'livro')
        ->where('status', 'EMPRESTADO')
        ->orderBy('id', 'desc')
        ->limit(5)
        ->get();

        return response()->json($emprestimos);
    }
}
