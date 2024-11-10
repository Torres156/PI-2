<?php

namespace App\Http\Controllers;

use App\Helpers\FotoHelper;
use App\Models\Livro;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

use const App\Helpers\HTTP_NOT_FOUND;

class LivroController extends Controller
{
    function index()
    {
        $livros = Livro::orderBy('id', 'desc')->get();
        return response()->json($livros);
    }

    function criar(Request $request)
    {
        $request->validate([
            'nome' => 'required',
            'autor' => 'required',           
        ],[
            'required' => 'O campo :attribute está vazio!',            
        ]);

        $data = $request->all();
        $foto = new FotoHelper($request->file('foto'));
        $data['nm_foto'] = $foto->upload('livro');

        Livro::create($data);
        return response('Livro criado com sucesso!');
    }

    function livro($id)
    {
        $livro = Livro::find($id);
        if (!$livro)        
            return response('Livro não encontrado!', Response::HTTP_NOT_FOUND);

        $livro['imagem'] = $livro->nm_foto ? asset('uploads/img/livro/' . $livro->nm_foto) : '';
        return response()->json($livro);
    }

    function salvar(Request $request)
    {
        $request->validate([
            'nome' => 'required',
            'autor' => 'required',           
        ],[
            'required' => 'O campo :attribute está vazio!',            
        ]);

        $dados = $request->all();

        $imagem = $request->file('foto');
        if ($imagem)
        {
            $foto = new FotoHelper($request->file('foto'));
            $dados['nm_foto'] = $foto->upload('livro');
        }

        $livro = Livro::find($request->id);
        $livro->fill($dados);
        $livro->save();

        return response('Livro editado com sucesso!');
    }

    function deletar($id)
    {
        $livro = Livro::find($id);
        $livro->delete();

        return response('Livro excluido com sucesso!');
    }
}
