<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class UsuarioController extends Controller
{
    function index()
    {
        $usuarios = User::orderBy('id', 'desc')->get();

        return response()->json($usuarios);
    }

    function criar(Request $request)
    {
        $request->validate([
            'nome' => 'required',
            'email' => 'required',
            'senha' => 'required',
            'nivel' => 'required',
        ],[
            'required' => 'O campo :attribute está vazio!',            
        ]);

        if (User::where('email', $request->email)->exists())
        {
            return response('Já existe um usuário com esse email!', Response::HTTP_BAD_REQUEST);
        }

        $dados = [
          'name' => $request->nome,
          'email' => $request->email,
          'password' => Hash::make($request->senha),          
        ];

        $usuario = User::create($dados);
        return response('Usuário criado com sucesso!');
    }

    function deletar($id)
    {
        $usuario = User::find($id);
        $usuario->delete();

        return response('Usuário excluido com sucesso!');
    }

    function usuario($id)
    {
        $usuario = User::find($id);        

        return response()->json($usuario);
    }
    

    function salvar(Request $request)
    {
        $request->validate([
            'id' => 'required',
            'nome' => 'required',            
            'nivel' => 'required',
        ],[
            'required' => 'O campo :attribute está vazio!',            
        ]);
       

        $dados = [
          'name' => $request->nome,                          
        ];

        if (isset($request->senha))
            $dados['password'] = Hash::make($request->senha);

        $usuario = User::find($request->id);
        $usuario->fill($dados);
        $usuario->save();

        return response('Usuário salvo com sucesso!');
    }


}
