import { Head } from '@inertiajs/react'
import { BenefitsCatalogSection } from '@/components/usuarios/benefits-catalog-section'
import { UsersSection } from '@/components/usuarios/users-section'
import { LayoutBase } from '@/layouts/layout'

export default function UsuariosBeneficios() {
  return (
    <LayoutBase
      description="Gerencie os acessos do sistema, perfis administrativos e cadastre os benefícios sociais e insumos distribuídos às famílias."
      tagTitle="Gestão Global do Sistema"
      titlePage="Usuários e Benefícios"
    >
      <Head title="Usuários e Benefícios" />
      <div className="space-y-6">
        <UsersSection />
        <BenefitsCatalogSection />
      </div>
    </LayoutBase>
  )
}
