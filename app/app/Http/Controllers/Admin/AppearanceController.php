<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CommunityCenter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Redirect;

class AppearanceController extends Controller
{
    public function update(Request $request)
    {
        $validated = $request->validate([
            'primary'        => 'required|string',
            'background'     => 'required|string',
            'surface'        => 'required|string',
            'text_primary'   => 'required|string',
            'text_secondary' => 'required|string',
            'text_disabled'  => 'required|string',
            'hover'          => 'required|string',
            'active'         => 'required|string',
            'success'        => 'required|string',
            'error'          => 'required|string',
            'warning'        => 'required|string',
            'info'           => 'required|string',
            'button'         => 'required|string',
        ]);

        $center = CommunityCenter::firstOrCreate([]);

        $center->update([
            'colors' => $validated
        ]);

        Cache::forget('community_center');

        return to_route('gestao-sistema.aparencia')->with('success', 'Salvo!');
    }
}
