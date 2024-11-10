<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    function index(Request $request)
    {
        $token = $request->header('Authorization');
        $usuario = User::where('remember_token', $token)->first();
        return response()->json(['Nome' => $usuario->name, 'Token' => $token]);
    }

    function login(Request $request)
    {
        $request->validate([
            'usuario' => 'required',
            'senha' => 'required',
        ],[
            'usuario.required' => 'O campo Usuário está vazio!',
            'senha.required' => 'O campo Senha está vázio!'
        ]);

        $email = $request->usuario;
        $senha = $request->senha;

        $usuario = User::where('email', $email)->first();
        if (!$usuario)
            return response('Usuário não encontrado!', HTTP_BAD_REQUEST);

        $password = $usuario->password;        
        if (!Hash::check($senha, $password))
            return response('Usuário ou senha inválida!', HTTP_BAD_REQUEST);
            
        $token = Str::random(32);

        $usuario->remember_token = $token;
        $usuario->save();

        return response()->json(['Nome' => $usuario->name, 'Token' => $token]);
    }
}
