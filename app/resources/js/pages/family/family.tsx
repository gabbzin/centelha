import { Head, router, usePage } from '@inertiajs/react'
import {
  CheckCircleIcon,
  ListFilterIcon,
  SearchIcon,
  XCircleIcon,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import Heading from '@/components/layout/heading'
import { Main } from '@/components/layout/main'
import { PaginationConsul } from '@/components/layout/pagination'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group'
import type { Family, PaginatedData, SharedData } from '@/types'
import { FamilyCard } from './components/family-card'

interface FamilyProps {
  families: PaginatedData<Family>
  previewSettings?: Record<string, unknown>
  hideHeader?: boolean
}
export default function Family({
  families,
  previewSettings,
  hideHeader,
}: FamilyProps) {
  const { communityCenter, pageSettings: sharedSettings } =
    usePage<SharedData>().props
  const pageSettings = previewSettings ?? sharedSettings
  const texts = (pageSettings?.texts as Record<string, string>) ?? {}
  const t = (key: string, fallback: string) => texts[key] ?? fallback
  const [onlyLastName, setOnlyLastName] = useState(false)
  const [search, setSearch] = useState(
    () => new URL(window.location.href).searchParams.get('search') || '',
  )

  useEffect(() => {
    const timer = setTimeout(() => {
      router.get('/family', { search }, { preserveState: true, replace: true })
    }, 400)
    return () => clearTimeout(timer)
  }, [search])

  return (
    <>
      <Head title={t('page_title', 'Módulo Familia')} />

      <Main>
        <div className="flex items-center justify-between gap-4">
          <Heading
            description={`${t('page_description', 'Gerencie e acompanhe o cadastro das famílias atendidas pela rede')} ${communityCenter?.name}`}
            title={t('page_title', 'Gestão de Familias')}
          />
          <Button
            className={'uppercase'}
            onClick={() => router.visit('/family/register')}
            variant={'primary'}
          >
            {t('new_button', 'Nova Família +')}
          </Button>
        </div>

        <Card variant={'basic'}>
          <CardContent className="flex items-center gap-3">
            <InputGroup className="bg-muted">
              <InputGroupInput
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t('search_placeholder', 'Buscar família...')}
                value={search}
              />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>

            <div className="flex items-center gap-2">
              <Button size={'icon'} variant={'outline'}>
                <ListFilterIcon />
              </Button>
              <Button
                onClick={() => setOnlyLastName(!onlyLastName)}
                size={'icon'}
                variant={'secondary'}
              >
                {onlyLastName ? <CheckCircleIcon /> : <XCircleIcon />}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {families.data.map((family) => {
            const getSobrenome = (name: string) => {
              const parts = name.trim().split(' ')
              return parts.length > 1
                ? parts[parts.length - 2] + ' ' + parts[parts.length - 1]
                : name
            }
            const sobrenome = onlyLastName
              ? getSobrenome(family.responsible_name)
              : family.responsible_name
            return (
              <FamilyCard
                key={family.id}
                cpf={family.responsible_cpf}
                familyName={sobrenome}
                id={family.id.toString()}
                location={family.address?.neighborhood}
                membersCount={family.total_members_count || 0}
                status={family.is_active}
                tags={family.tags}
              />
            )
          })}
        </div>

        {families.data.length > 0 ? (
          <PaginationConsul
            links={families.links}
            next_page_url={families.next_page_url}
            prev_page_url={families.prev_page_url}
          />
        ) : (
          <div>{t('empty_state', 'Nenhuma família encontrada.')}</div>
        )}
      </Main>
    </>
  )
}
