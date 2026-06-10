<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

$raiz = 'admin';

Route::get($raiz, function () use ($raiz) {
  return Inertia::render($raiz . '/gestao-sistema');
})->name('gestao-sistema');

Route::get($raiz . '/configuracoes-gerais', function () use ($raiz) {
  return Inertia::render($raiz . '/gestao-sistema/configuracoes-gerais');
})->name('configuracoes-gerais');