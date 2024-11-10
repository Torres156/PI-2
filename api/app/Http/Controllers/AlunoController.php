<?php

namespace App\Http\Controllers;

use App\Models\Aluno;
use Illuminate\Http\Request;

class AlunoController extends Controller
{
    function criar(Request $request)
    {
        $request->validate([
            'nome' => 'required',
            'ra' => 'required',
            'email' => 'required',
            'dt_nascimento' => 'required',            
            'sala' => 'required',
        ],[
            'required' => 'O campo :attribute está vazio!',            
        ]);
        $dados = $request->all();
        $dados['dt_nascimento'] = \Carbon\Carbon::createFromFormat('d/m/Y', $dados['dt_nascimento'])->format('Y-m-d');

        Aluno::create($request->all());

        return response('Aluno criado com sucesso!');
    }

    function index()
    {
        $alunos = Aluno::orderBy('id', 'desc')->get();

        return response()->json($alunos);
    }

    function aluno($id)
    {
        $aluno = Aluno::find($id);
        return response()->json($aluno);
    }

    function salvar(Request $request)
    {
        $request->validate([
            'id' => 'required',
            'nome' => 'required',            
            'email' => 'required',
            'dt_nascimento' => 'required',            
            'sala' => 'required',
        ],[
            'required' => 'O campo :attribute está vazio!',            
        ]);

        $aluno = Aluno::find($request->id);
        $aluno->fill($request->all());
        $aluno->save();

        return response('Aluno atualizado com sucesso!');
    }

    function deletar($id)
    {
        $aluno = Aluno::find($id);
        if (!$aluno)
            return response('Aluno não encontrado!', HTTP_NOT_FOUND);

        $aluno->delete();
        return response('Aluno deletado com sucesso!');
    }
}
