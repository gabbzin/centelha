import { Link } from '@inertiajs/react'
import { IdCardIcon, MapPinIcon, Trash2Icon, UsersIcon } from 'lucide-react'
import { toaster } from '@/components/toasters/toast-alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { formatCPF, formatProtocol } from '@/utils/formatters'

interface FamilyCardProps {
  id: string
  cpf: string
  status: boolean
  familyName: string
  membersCount: number
  location: string | undefined
  tags?: Array<{ id: number; name: string; color: string; icon: string | null }>
}

export function FamilyCard({
  id,
  cpf,
  status,
  familyName,
  membersCount,
  location,
  tags = [],
}: FamilyCardProps) {
  const sizeIcons = 'size-4'

  return (
    <Card className="space-y-3" variant="basic">
      <CardHeader className="flex items-center justify-between">
        <p className="text-muted-foreground text-xs uppercase">
          Protocolo #{formatProtocol(id)}
        </p>
        <Badge
          className="rounded-2xl text-[10px] uppercase"
          variant={status ? 'success' : 'destructive'}
        >
          {status ? 'Ativo' : 'Inativo'}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-1">
        <h3 className="text-heading font-semibold">Família {familyName}</h3>

        <ul className="space-y-2">
          <InfoCardItem
            icon={<IdCardIcon className={sizeIcons} />}
            text={formatCPF(cpf)}
          />
          <InfoCardItem
            icon={<UsersIcon className={sizeIcons} />}
            text={`${membersCount} membros`}
          />
          <InfoCardItem
            icon={<MapPinIcon className={sizeIcons} />}
            text={location || 'Endereço não informado'}
          />
        </ul>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-2">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
                style={{
                  backgroundColor: `${tag.color}20`,
                  color: tag.color,
                  borderColor: `${tag.color}40`,
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: tag.color }}
                />
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="mt-2 flex items-center gap-4 *:rounded-md">
        <Link
          className="border border-info text-button bg-transparent hover:bg-info p-3 flex-1 text-center text-xs uppercase hover:text-white"
          href={`/family/details/${id}`}
        >
          Ver Informações
        </Link>
        <Button
          className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground px-3 py-5"
          onClick={() =>
            toaster.createInfo(
              'Manutenção!',
              'Funcionalidade ainda não implementada.',
            )
          }
          variant="outline"
        >
          <Trash2Icon />
        </Button>
      </CardFooter>
    </Card>
  )
}

function InfoCardItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="mt-2 flex items-center gap-2 text-sm">
      {icon}
      <p>{text}</p>
    </div>
  )
}
