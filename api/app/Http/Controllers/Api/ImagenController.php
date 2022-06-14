<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ImagenController extends Controller
{

  public function show($id)
  {
    // return response()->file(storage_path('app/public/images/' . $id));
    return response()->file('../../storage/app/public/images' . $id);
  }
}
