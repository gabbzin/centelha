import { Head } from '@inertiajs/react'
import { FlashListener } from '@/components/toasters/flash-listener'
import { BenefitsCatalogSection } from '@/components/usuarios/benefits-catalog-section'
import { UsersSection } from '@/components/usuarios/users-section'
import type { PaginatedUsers } from '@/components/usuarios/types'
import { LayoutBase } from '@/layouts/layout'

interface UsuariosBeneficiosProps {
  users: PaginatedUsers
}

export default function UsuariosBeneficios({
  users,
}: UsuariosBeneficiosProps) {
  return (
    <LayoutBase
      description="Gerencie os acessos do sistema, perfis administrativos e cadastre os benefícios sociais e insumos distribuídos às famílias."
      tagTitle="Gestão Global do Sistema"
      titlePage="Usuários e Benefícios"
    >
      <FlashListener />
      <Head title="Usuários e Benefícios" />
      <div className="space-y-6">
        <UsersSection users={users} />
        <BenefitsCatalogSection />
      </div>
    </LayoutBase>
  )
}
