import { Link, router } from '@inertiajs/react'
import {
  ArchiveIcon,
  ArrowLeftIcon,
  BanknoteIcon,
  CheckCircle2Icon,
  MapIcon,
  PenIcon,
  PlusIcon,
  UserIcon,
  UsersIcon,
} from 'lucide-react'
import { AlertButton } from '@/components/buttons/alertButton'
import { toaster } from '@/components/toasters/toast-alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { LayoutBase } from '@/layouts/layout'
import type { Family } from '@/types'
import { calcAge } from '@/utils/calcAge'
import { formatBRL, formatCEP, formatPhone } from '@/utils/formatters'

interface FamilyInfoPageProps {
  backUrl: string
  id: string
  family: Family
}
export default function FamilyInfoPage({
  backUrl,
  id,
  family,
}: FamilyInfoPageProps) {
  const handleToggleActive = () => {
    // Flag para verificar se está ativa
    const actived = !!family.is_active
    const url = `/family/${id}/${actived ? 'deactivate' : 'activate'}`
    router.patch(
      url,
      {},
      {
        onSuccess: () => {
          toaster.createSuccess(
            `Sucesso!`,
            `Família ${actived ? 'desativada' : 'ativada'} com sucesso.`,
          )
        },
      },
    )
  }
  return (
    <LayoutBase
      descriptionPage={
        <div className="flex items-center gap-2">
          ID: <Badge variant={'gray'}>#F-{id}</Badge>
        </div>
      }
      rightComponent={
        <div className="flex items-center gap-2">
          <Link href={`/family/${id}/edit`}>
            <Button variant={'primary'}>
              <PenIcon className="size-4" />
              Editar informações
            </Button>
          </Link>
          <AlertButton
            actionText={family.is_active ? 'Desativar' : 'Ativar'}
            cancelText="Cancelar"
            description={`Tem certeza que deseja ${family.is_active ? 'desativar' : 'ativar'} esta família? Esta ação pode ser desfeita.`}
            iconButton={<ArchiveIcon className="size-4" />}
            onAction={handleToggleActive}
            textButton={
              family.is_active ? 'Desativar Família' : 'Ativar Família'
            }
            title={family.is_active ? 'Desativar Família' : 'Ativar Família'}
          />
        </div>
      }
      tagTitle="Informações da Família"
      titlePage="Detalhes da Família"
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card variant={'basic'}>
          <CardContent>
            <div>
              <section>
                <HeadingCard
                  icon={<UserIcon className="size-4" />}
                  title="Informações Pessoais"
                />

                <InfoItem
                  label="Nome do responsável"
                  value={family.responsible_name}
                />
                <InlineItems>
                  <InfoItem label="CPF" value={family.responsible_cpf} />
                  <InfoItem
                    className="flex flex-col items-end"
                    label="Status"
                    value={
                      <Badge
                        className="rounded-sm px-4 font-bold uppercase"
                        variant={family.is_active ? 'success' : 'destructive'}
                      >
                        {family.is_active ? 'Ativo' : 'Inativo'}
                      </Badge>
                    }
                  />
                </InlineItems>
                <InfoItem
                  label="Telefone"
                  value={formatPhone(family.responsible_phone)}
                />
              </section>

              <Separator className={'my-1'} />

              <section>
                <HeadingCard
                  icon={<BanknoteIcon className="size-4" />}
                  title="Dados Socioeconômicos"
                />

                <InlineItems>
                  <InfoItem
                    label="Recebe Auxílio"
                    value={family.receives_government_aid ? 'Sim' : 'Não'}
                  />
                  <InfoItem
                    label="Tipo de moradia"
                    value={family.housing_condition}
                  />
                  <InfoItem
                    label="Fonte de Renda Principal"
                    value={family.income_source?.replace('_', ' ')}
                  />
                  <InfoItem
                    label="Renda total"
                    value={formatBRL(family.total_income)}
                  />
                </InlineItems>
              </section>

              <Separator className={'my-1'} />

              {family.general_observations && (
                <>
                  <Separator className={'my-1'} />
                  <section>
                    <HeadingCard
                      icon={<ArchiveIcon className="size-4" />}
                      title="Observações"
                    />
                    <p className="text-heading text-base">
                      {family.general_observations}
                    </p>
                  </section>
                </>
              )}

              <Separator className={'my-1'} />

              <section>
                <HeadingCard
                  icon={<MapIcon className="size-4" />}
                  title="Endereço Residencial"
                />

                <InfoItem label="Logradouro" value={family.address?.street} />
                <InfoItem
                  label="Bairro / Comunidade"
                  value={family.address?.neighborhood}
                />
                <InlineItems>
                  <InfoItem
                    label="CEP"
                    value={formatCEP(family.address?.zipcode)}
                  />
                  <InfoItem
                    label="Cidade/UF"
                    value={`${family.address?.city}/${family.address?.state}`}
                  />
                </InlineItems>
              </section>
            </div>
          </CardContent>
        </Card>

        <aside className="grid gap-4">
          <Card>
            <CardHeader>
              <HeadingCard
                icon={<UsersIcon className="size-4" />}
                title="Composição Familiar"
              />
            </CardHeader>
            <div className="max-h-42 overflow-y-auto">
              {family.members?.map((membro) => (
                <InlineItems key={membro.id} className="border-t p-4 last:pb-0">
                  <p className="text-lg font-semibold">{membro.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {membro.birth_date
                      ? `${calcAge(new Date(), membro.birth_date)} anos`
                      : 'Não informado'}
                  </p>
                </InlineItems>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader>
              <HeadingCard
                icon={<ArchiveIcon className="size-4" />}
                primary={false}
                title="Histórico de Benefícios"
              />
            </CardHeader>
            <CardContent className="max-h-42 space-y-4 overflow-y-auto">
              {beneficiosMock.map((beneficio) => (
                <InlineItems
                  key={beneficio.id}
                  className="rounded-lg border p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-md border border-green-900 p-1 text-xs font-bold uppercase">
                      <CheckCircle2Icon className="size-5 rounded-full bg-green-900 text-white" />
                    </div>
                    <p className="text-lg font-semibold">{beneficio.nome}</p>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    {beneficio.entregue}
                  </p>
                </InlineItems>
              ))}
            </CardContent>
          </Card>
        </aside>
      </div>

      <footer className="mt-12 flex items-center gap-4 justify-end">
        <Link href={backUrl}>
          <Button variant={'outline'}>
            <ArrowLeftIcon /> Voltar
          </Button>
        </Link>
        <Button onClick={() => router.visit('/entregas')} variant={'primary'}>
          <PlusIcon /> Registrar nova entrega
        </Button>
      </footer>
    </LayoutBase>
  )
}
const beneficiosMock = [
  {
    id: 1,
    nome: 'Cesta Básica',
    entregue: '10/10/2025',
    status: 'Entregue',
  },
  {
    id: 2,
    nome: 'Auxilio Gás',
    entregue: '10/11/2025',
    status: 'Entregue',
  },
  {
    id: 3,
    nome: 'Auxilio Gás',
    entregue: '10/11/2025',
    status: 'Entregue',
  },
  {
    id: 4,
    nome: 'Auxilio Gás',
    entregue: '10/11/2025',
    status: 'Entregue',
  },
  {
    id: 5,
    nome: 'Auxilio Gás',
    entregue: '10/11/2025',
    status: 'Entregue',
  },
]
function HeadingCard({
  icon,
  title,
  primary = true,
}: {
  icon: React.ReactNode
  title: string
  primary?: boolean
}) {
  return (
    <div
      className={`mb-4 flex items-center gap-2 ${primary ? 'text-primary' : 'text-[#673D00]'}`}
    >
      {icon}
      <h4 className="text-lg font-semibold uppercase">{title}</h4>
    </div>
  )
}
function InfoItem({
  className,
  label,
  value,
}: {
  className?: string
  label: string
  value: string | React.ReactNode
}) {
  return (
    <div className={`mb-2 ${className}`}>
      <h6 className="text-muted-foreground text-xs uppercase">{label}</h6>
      <p className="text-heading text-lg font-semibold capitalize">{value}</p>
    </div>
  )
}
function InlineItems({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      {children}
    </div>
  )
}
