<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBenefitRequest;
use App\Http\Requests\UpdateBenefitRequest;
use App\Models\Benefit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class BenefitController extends Controller
{
    public function index(Request $request)
    {
        $query = Benefit::with('creator');

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'ilike', "%{$search}%")
                  ->orWhere('code', 'ilike', "%{$search}%")
                  ->orWhere('category', 'ilike', "%{$search}%");
            });
        }

        if ($request->filled('category') && $request->input('category') !== 'all') {
            $query->where('category', $request->input('category'));
        }

        $benefits = $query->orderBy('id', 'desc')->paginate(8)->withQueryString();

        return Inertia::render('beneficios', [
            'benefits' => $benefits,
        ]);
    }

    public function store(StoreBenefitRequest $request)
    {
        $data = $request->validated();

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('benefits', 'public');
        }

        $benefit = Benefit::create([
            'name' => $data['name'],
            'category' => $data['category'],
            'stock' => $data['quantity'],
            'status' => 'Ativo',
            'donor' => $data['donor'] ?? null,
            'validity' => $data['validity'] ?? null,
            'notes' => $data['notes'] ?? null,
            'image_path' => $imagePath,
            'created_by' => auth()->id(),
        ]);

        $benefit->update(['code' => $benefit->generateCode()]);

        return redirect()->route('beneficios');
    }

    public function update(UpdateBenefitRequest $request, Benefit $benefit)
    {
        $data = $request->validated();

        $imagePath = $benefit->image_path;

        if ($request->has('remove_image')) {
            if ($imagePath) {
                Storage::disk('public')->delete($imagePath);
            }
            $imagePath = null;
        }

        if ($request->hasFile('image')) {
            if ($imagePath) {
                Storage::disk('public')->delete($imagePath);
            }
            $imagePath = $request->file('image')->store('benefits', 'public');
        }

        $updateData = [
            'name' => $data['name'] ?? $benefit->name,
            'category' => $data['category'] ?? $benefit->category,
            'stock' => $data['stock'] ?? $benefit->stock,
            'status' => $data['status'] ?? $benefit->status,
            'donor' => $data['donor'] ?? $benefit->donor,
            'validity' => $data['validity'] ?? $benefit->validity,
            'notes' => $data['notes'] ?? $benefit->notes,
        ];

        if ($request->hasFile('image') || $request->has('remove_image')) {
            $updateData['image_path'] = $imagePath;
        }

        $benefit->update($updateData);

        return redirect()->route('beneficios');
    }

    public function destroy(Benefit $benefit)
    {
        if ($benefit->image_path) {
            Storage::disk('public')->delete($benefit->image_path);
        }

        $benefit->delete();

        return redirect()->route('beneficios');
    }
}
