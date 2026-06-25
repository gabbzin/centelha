<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\StoreBenefitRequest;
use App\Http\Requests\UpdateBenefitRequest;
use App\Models\Benefit;
use App\Services\StorageService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BenefitController extends Controller
{
    private const IMAGE_DISK = 'minio';

    private const IMAGE_DIRECTORY = 'benefits/images';

    public function __construct(private readonly StorageService $storage) {}

    public function index(Request $request): Response
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

    public function store(StoreBenefitRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $this->storage->upload(self::IMAGE_DISK, self::IMAGE_DIRECTORY, $request->file('image'));
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

    public function update(UpdateBenefitRequest $request, Benefit $benefit): RedirectResponse
    {
        $data = $request->validated();

        $imagePath = $benefit->image_path;

        if ($request->has('remove_image')) {
            $this->storage->delete(self::IMAGE_DISK, $imagePath);
            $imagePath = null;
        }

        if ($request->hasFile('image')) {
            $imagePath = $this->storage->replace(
                self::IMAGE_DISK,
                self::IMAGE_DIRECTORY,
                $request->file('image'),
                $imagePath,
            );
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

    public function destroy(Benefit $benefit): RedirectResponse
    {
        $this->storage->delete(self::IMAGE_DISK, $benefit->image_path);

        $benefit->delete();

        return redirect()->route('beneficios');
    }
}
