<?php

use App\Http\Controllers\Admin\AppearanceController;
use App\Http\Controllers\Admin\ConfiguracoesGeraisController;
use App\Http\Controllers\Admin\PageCustomizationController;
use App\Http\Controllers\Admin\TagController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\BenefitController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DeliveryController;
use App\Http\Controllers\FamilyController;
use App\Models\Tag;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get("/", function () {
    return Inertia::render("home");
})->name("home");

Route::middleware(["auth", "role:admin"])->group(function () {
    Route::get("gestao-sistema", function () {
        return Inertia::render("admin/gestao-sistema");
    })->name("gestao-sistema");

    Route::get("gestao-sistema/configuracoes-gerais", function () {
        return Inertia::render("admin/gestao-sistema/configuracoes-gerais");
    })->name("gestao-sistema.configuracoes-gerais");

    Route::get("gestao-sistema/aparencia", function () {
        return Inertia::render("admin/gestao-sistema/aparencia");
    })->name("gestao-sistema.aparencia");

    Route::put("gestao-sistema/aparencia", [AppearanceController::class, "update"])->name("admin.appearance.update");

    Route::put("gestao-sistema/configuracoes-gerais", [ConfiguracoesGeraisController::class, "update"])->name("gestao-sistema.configuracoes-gerais.update");

    Route::get("gestao-sistema/customizacao-tela", [PageCustomizationController::class, "index"])->name("gestao-sistema.customizacao-tela");
    Route::get("gestao-sistema/customizacao-tela/{pageKey}", [PageCustomizationController::class, "show"])->name("gestao-sistema.customizacao-tela.edit");
    Route::put("gestao-sistema/customizacao-tela/{pageKey}", [PageCustomizationController::class, "update"])->name("gestao-sistema.customizacao-tela.update");

    Route::get("gestao-sistema/usuarios-beneficios", [UserController::class, "index"])->name("gestao-sistema.usuarios-beneficios");
    Route::post("usuarios", [UserController::class, "store"])->name("usuarios.store");
    Route::put("usuarios/{user}", [UserController::class, "update"])->name("usuarios.update");
    Route::patch("usuarios/{user}", [UserController::class, "update"])->name("usuarios.patch");
    Route::delete("usuarios/{user}", [UserController::class, "deactivate"])->name("usuarios.deactivate");

    Route::post("tags", [TagController::class, "store"])->name("tags.store");
    Route::put("tags/{tag}", [TagController::class, "update"])->name("tags.update");
    Route::delete("tags/{tag}", [TagController::class, "destroy"])->name("tags.destroy");
    Route::get('gestao-sistema/usuarios-beneficios', [UserController::class, 'index'])->name('gestao-sistema.usuarios-beneficios');
    Route::post('usuarios', [UserController::class, 'store'])->name('usuarios.store');
    Route::put('usuarios/{user}', [UserController::class, 'update'])->name('usuarios.update');
    Route::patch('usuarios/{user}', [UserController::class, 'update'])->name('usuarios.patch');
    Route::delete('usuarios/{user}', [UserController::class, 'deactivate'])->name('usuarios.deactivate');
    Route::post('usuarios/{user}/reenviar-ativacao', [UserController::class, 'resendActivation'])->name('usuarios.resend-activation');
});

Route::middleware(["auth"])->group(function () {
    Route::get("beneficios", [BenefitController::class, "index"])->name("beneficios");
    Route::post("beneficios", [BenefitController::class, "store"])->name("beneficios.store");
    Route::put("beneficios/{benefit}", [BenefitController::class, "update"])->name("beneficios.update");
    Route::delete("beneficios/{benefit}", [BenefitController::class, "destroy"])->name("beneficios.destroy");

    Route::get("entregas", [DeliveryController::class, "index"])->name("entregas");
    Route::post("entregas", [DeliveryController::class, "store"])->name("entregas.store");
    Route::get("entregas/export/pdf", [DeliveryController::class, "exportPdf"])->name("entregas.exportPdf");
    Route::get("entregas/{delivery}", [DeliveryController::class, "show"])->name("entregas.show");
    Route::get("entregas/{delivery}/pdf", [DeliveryController::class, "pdf"])->name("entregas.pdf");

    Route::get("dashboard", [DashboardController::class, "index"])->name("dashboard");
    Route::get("family", [FamilyController::class, "index"])->name("family");
    Route::get("family/search", [FamilyController::class, "search"])->name("family.search");
    Route::post("family", [FamilyController::class, "store"])->name("family.store");
    Route::get("family/register", function () {
        $availableTags = Tag::all()->map(fn ($tag) => [
            "id" => $tag->id,
            "name" => $tag->name,
            "color" => $tag->color,
            "icon" => $tag->icon,
        ]);

        return Inertia::render("family/form/register", [
            "availableTags" => $availableTags,
        ]);
    })->name("family.register");
    Route::get("family/details/{id}", [FamilyController::class, "show"])->name("family.info");
    Route::get("family/{family}/edit", [FamilyController::class, "edit"])->name("family.edit");
    Route::put("family/{family}", [FamilyController::class, "update"])->name("family.update");
    Route::patch("family/{family}/deactivate", [FamilyController::class, "deactivate"])->name("family.deactivate");
    Route::patch("family/{family}/activate", [FamilyController::class, "activate"])->name("family.activate");
});

require __DIR__."/settings.php";
require __DIR__."/auth.php";
