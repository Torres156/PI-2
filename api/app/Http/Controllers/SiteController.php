<?php

namespace App\Http\Controllers;

use App\Models\Livro;
use Illuminate\Http\Request;

class SiteController extends Controller
{
    function index()
    {
        $livros = Livro::orderBy('id', 'desc')->limit(4)->get();

        return response()->json($livros);
    }

    function livros(Request $request)
    {
        $livros = Livro::when(!empty($request->busca), function($query) use ($request){
            return $query->where('nome', 'like', "%{$request->busca}%");
        })
        ->orderBy('id', 'desc')->paginate(6);
        return response()->json($livros);
    }

    function livro($id)
    {
        $livro = Livro::find($id);

        return response()->json($livro);
    }
}
