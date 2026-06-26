import { Head } from '@inertiajs/react'
import { FlashListener } from '@/components/toasters/flash-listener'
import { TagsSection } from '@/components/usuarios/tags-section'
import { UsersSection } from '@/components/usuarios/users-section'
import type { PaginatedTags, PaginatedUsers } from '@/components/usuarios/types'
import { LayoutBase } from '@/layouts/layout'

interface UsuariosBeneficiosProps {
  users: PaginatedUsers
  tags: PaginatedTags
}

export default function UsuariosBeneficios({
  users,
  tags,
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
        <TagsSection tags={tags} />
      </div>
    </LayoutBase>
  )
}
