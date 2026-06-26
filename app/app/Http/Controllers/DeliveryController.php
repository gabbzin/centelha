<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Dto\DeliveryData;
use App\Http\Requests\StoreDeliveryRequest;
use App\Models\Benefit;
use App\Models\CommunityCenter;
use App\Models\Delivery;
use App\Services\DeliveryOrchestrator;
use Barryvdh\DomPDF\Facade\Pdf;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;
use Symfony\Component\HttpFoundation\Response;

class DeliveryController extends Controller
{
    private const INDEX_TTL = 60;

    private const SHOW_TTL = 60;

    private const PDF_TTL = 300;

    private const DEFAULT_PRIMARY_COLOR = '#1558D6';

    public function __construct(private readonly DeliveryOrchestrator $orchestrator) {}

    private function cacheKey(string $suffix): string
    {
        $version = Cache::get(DeliveryOrchestrator::CACHE_VERSION_KEY, 1);

        return "deliveries.{$version}.{$suffix}";
    }

    public function index(Request $request): InertiaResponse
    {
        $search = $request->input('search');
        $startDate = $this->parseDate($request->input('startDate'));
        $endDate = $this->parseDate($request->input('endDate'));
        $page = $request->input('page', 1);

        $cacheKey = $this->cacheKey('index.'.md5(serialize([
            $search,
            $startDate,
            $endDate,
            $page,
        ])));

        $cached = Cache::remember($cacheKey, self::INDEX_TTL, function () use ($search, $startDate, $endDate) {
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

            return [
                'deliveries' => $query->paginate(8)->withQueryString(),
                'benefits' => Benefit::where('status', 'Ativo')
                    ->orderBy('name')
                    ->get(['id', 'name', 'stock']),
            ];
        });

        return Inertia::render('entregas', [
            'deliveries' => $cached['deliveries'],
            'filters' => [
                'search' => $search,
                'startDate' => $request->input('startDate'),
                'endDate' => $request->input('endDate'),
            ],
            'benefits' => $cached['benefits'],
        ]);
    }

    public function store(StoreDeliveryRequest $request): RedirectResponse
    {
        $this->orchestrator->execute(DeliveryData::fromRequest($request));

        return redirect()
            ->route('entregas')
            ->with('success', 'Entrega confirmada com sucesso!');
    }

    public function show(Delivery $delivery): JsonResponse
    {
        $cacheKey = $this->cacheKey("show.{$delivery->id}");

        return Cache::remember($cacheKey, self::SHOW_TTL, function () use ($delivery) {
            $delivery->load(['family.address', 'family.members', 'benefit', 'deliveredBy']);

            return response()->json($delivery);
        });
    }

    public function pdf(Delivery $delivery): Response
    {
        $cacheKey = $this->cacheKey("pdf.{$delivery->id}");

        $pdfContent = Cache::remember($cacheKey, self::PDF_TTL, function () use ($delivery) {
            $delivery->load(['family.address', 'family.members', 'benefit', 'deliveredBy']);

            [$communityCenter, $primaryColor, $logoPath] = $this->getPdfTheme();

            return Pdf::loadView('deliveries.pdf.show', compact('delivery', 'communityCenter', 'primaryColor', 'logoPath'))->output();
        });

        return response($pdfContent, 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => "attachment; filename=\"comprovante-{$delivery->code}.pdf\"",
        ]);
    }

    public function exportPdf(Request $request): Response
    {
        $type = $request->input('type', 'current_month');

        if ($type === 'current_month') {
            $startDate = now()->startOfMonth();
            $endDate = now()->endOfMonth();
        } else {
            $startDate = Carbon::parse($this->parseDate($request->input('startDate')) ?? now()->startOfMonth());
            $endDate = Carbon::parse($this->parseDate($request->input('endDate')) ?? now()->endOfMonth());
        }

        $cacheKey = $this->cacheKey('exportPdf.'.md5(serialize([
            $type,
            $startDate->toDateString(),
            $endDate->toDateString(),
        ])));

        $pdfContent = Cache::remember($cacheKey, self::PDF_TTL, function () use ($startDate, $endDate) {
            $deliveries = Delivery::with(['benefit', 'deliveredBy'])
                ->whereBetween('delivery_date', [$startDate->copy()->startOfDay(), $endDate->copy()->endOfDay()])
                ->orderBy('delivery_date', 'desc')
                ->get();

            [$communityCenter, $primaryColor, $logoPath] = $this->getPdfTheme();

            return Pdf::loadView('deliveries.pdf.list', compact(
                'deliveries',
                'startDate',
                'endDate',
                'communityCenter',
                'primaryColor',
                'logoPath'
            ))->output();
        });

        $periodLabel = $startDate->format('d-m-Y').'_a_'.$endDate->format('d-m-Y');

        return response($pdfContent, 200, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => "attachment; filename=\"relatorio-entregas-{$periodLabel}.pdf\"",
        ]);
    }

    private function getPdfTheme(): array
    {
        $communityCenter = CommunityCenter::instance();

        $colors = $communityCenter?->colors ?? [];

        $primary = is_string($colors['primary'] ?? null)
            && preg_match('/^#([0-9a-f]{3}|[0-9a-f]{6})$/i', $colors['primary'])
            ? $colors['primary']
            : self::DEFAULT_PRIMARY_COLOR;

        $logoPath = $communityCenter?->logoFilePath();

        return [$communityCenter, $primary, $logoPath];
    }

    private function parseDate(?string $value): ?string
    {
        if (! $value) {
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
