<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreDeliveryRequest;
use App\Models\Benefit;
use App\Models\Delivery;
use App\Models\StockMovement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DeliveryController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $startDate = $this->parseDate($request->input('startDate'));
        $endDate = $this->parseDate($request->input('endDate'));

        $query = Delivery::with(['family', 'benefit', 'deliveredBy'])
            ->orderBy('delivery_date', 'desc')
            ->orderBy('id', 'desc');

        if ($search) {
            $cleanCpf = preg_replace('/\D/', '', $search);

            $query->where(function ($q) use ($search, $cleanCpf) {
                $q->where('code', 'ilike', "%{$search}%")
                  ->orWhere('location', 'ilike', "%{$search}%")
                  ->orWhereHas('family', function ($fq) use ($search, $cleanCpf) {
                      $fq->where('responsible_name', 'ilike', "%{$search}%");

                      if (strlen($cleanCpf) >= 3) {
                          $fq->orWhere('responsible_cpf', 'like', "%{$cleanCpf}%");
                      }
                  })
                  ->orWhereHas('benefit', function ($bq) use ($search) {
                      $bq->where('name', 'ilike', "%{$search}%");
                  });
            });
        }

        if ($startDate) {
            $query->whereDate('delivery_date', '>=', $startDate);
        }

        if ($endDate) {
            $query->whereDate('delivery_date', '<=', $endDate);
        }

        $deliveries = $query->paginate(8)->withQueryString();

        return Inertia::render('entregas', [
            'deliveries' => $deliveries,
            'filters' => [
                'search' => $search,
                'startDate' => $request->input('startDate'),
                'endDate' => $request->input('endDate'),
            ],
            'benefits' => Benefit::where('status', 'Ativo')
                ->orderBy('name')
                ->get(['id', 'name', 'stock']),
        ]);
    }

    public function store(StoreDeliveryRequest $request)
    {
        $data = $request->validated();

        $benefit = Benefit::findOrFail($data['benefit_id']);

        if ($benefit->stock < $data['quantity']) {
            return redirect()
                ->route('entregas')
                ->withErrors(['quantity' => 'Estoque insuficiente para este benefício.'])
                ->withInput();
        }

        // TODO: implementar validação de duplicidade (RN61) quando o período for definido.

        $receiptPath = null;
        if ($request->hasFile('receipt')) {
            $receiptPath = $request->file('receipt')->store('deliveries/receipts', 'public');
        }

        DB::transaction(function () use ($data, $benefit, $receiptPath) {
            $delivery = Delivery::create([
                'family_id' => $data['family_id'],
                'benefit_id' => $data['benefit_id'],
                'quantity' => $data['quantity'],
                'location' => $data['location'],
                'delivery_date' => $data['delivery_date'],
                'notes' => $data['notes'] ?? null,
                'receipt_path' => $receiptPath,
                'delivered_by' => auth()->id(),
                'status' => 'Entregue',
            ]);

            $delivery->update(['code' => $delivery->generateCode()]);

            $benefit->decrement('stock', $data['quantity']);

            StockMovement::create([
                'benefit_id' => $benefit->id,
                'quantity' => -$data['quantity'],
                'type' => 'delivery',
                'reference_type' => Delivery::class,
                'reference_id' => $delivery->id,
                'created_by' => auth()->id(),
                'reason' => "Entrega {$delivery->code} - {$delivery->quantity} unidade(s)",
            ]);
        });

        return redirect()
            ->route('entregas')
            ->with('success', 'Entrega confirmada com sucesso!');
    }

    public function show(Delivery $delivery)
    {
        $delivery->load(['family.address', 'family.members', 'benefit', 'deliveredBy']);

        return response()->json($delivery);
    }

    private function parseDate(?string $value): ?string
    {
        if (!$value) {
            return null;
        }

        // Formato ISO vindo do backend/filtros: YYYY-MM-DD
        if (preg_match('/^\d{4}-\d{2}-\d{2}$/', $value)) {
            return $value;
        }

        // Formato brasileiro vindo do input: DD/MM/YYYY
        if (preg_match('/^(\d{2})\/(\d{2})\/(\d{4})$/', $value, $matches)) {
            [$_, $day, $month, $year] = $matches;

            if (checkdate((int) $month, (int) $day, (int) $year)) {
                return "{$year}-{$month}-{$day}";
            }
        }

        return null;
    }
}
