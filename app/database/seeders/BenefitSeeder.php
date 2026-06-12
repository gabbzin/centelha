<?php

namespace Database\Seeders;

use App\Models\Benefit;
use Illuminate\Database\Seeder;

class BenefitSeeder extends Seeder
{
    public function run(): void
    {
        $benefits = [
            ['name' => 'Cesta básica padrão', 'category' => 'Alimentação', 'stock' => 145, 'status' => 'Ativo'],
            ['name' => 'Voucher R$ 100', 'category' => 'Financeiro', 'stock' => 50, 'status' => 'Ativo'],
            ['name' => 'Kit higiene', 'category' => 'Saúde', 'stock' => 210, 'status' => 'Ativo'],
            ['name' => 'Cesta básica completa', 'category' => 'Alimentação', 'stock' => 85, 'status' => 'Ativo'],
            ['name' => 'Auxílio gás', 'category' => 'Financeiro', 'stock' => 12, 'status' => 'Ativo'],
            ['name' => 'Kit material escolar', 'category' => 'Educação', 'stock' => 67, 'status' => 'Ativo'],
            ['name' => 'Cesta natalina', 'category' => 'Alimentação', 'stock' => 8, 'status' => 'Revisão'],
            ['name' => 'Voucher R$ 200', 'category' => 'Financeiro', 'stock' => 30, 'status' => 'Ativo'],
            ['name' => 'Kit primeiros socorros', 'category' => 'Saúde', 'stock' => 15, 'status' => 'Revisão'],
            ['name' => 'Uniforme escolar', 'category' => 'Vestuário', 'stock' => 42, 'status' => 'Ativo'],
            ['name' => 'Cesta básica leve', 'category' => 'Alimentação', 'stock' => 180, 'status' => 'Ativo'],
            ['name' => 'Auxílio transporte', 'category' => 'Financeiro', 'stock' => 5, 'status' => 'Revisão'],
            ['name' => 'Kit higiene bucal', 'category' => 'Saúde', 'stock' => 95, 'status' => 'Ativo'],
            ['name' => 'Calçados infantis', 'category' => 'Vestuário', 'stock' => 18, 'status' => 'Revisão'],
            ['name' => 'Cesta de frutas', 'category' => 'Alimentação', 'stock' => 60, 'status' => 'Ativo'],
            ['name' => 'Curso profissionalizante', 'category' => 'Educação', 'stock' => 25, 'status' => 'Ativo'],
            ['name' => 'Kit cama e mesa', 'category' => 'Vestuário', 'stock' => 3, 'status' => 'Inativo'],
            ['name' => 'Voucher R$ 50', 'category' => 'Financeiro', 'stock' => 110, 'status' => 'Ativo'],
        ];

        foreach ($benefits as $index => $data) {
            $code = 'BNF-' . str_pad((string) ($index + 1), 3, '0', STR_PAD_LEFT);
            Benefit::create(array_merge($data, ['code' => $code]));
        }
    }
}
