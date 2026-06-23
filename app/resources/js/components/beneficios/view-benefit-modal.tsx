import {
  Calendar,
  ImageIcon,
  Package,
  Tag,
  User,
  UserCircle,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { formatIsoDateToDisplay } from './data'
import type { Benefit } from './types'

const CATEGORY_STYLES: Record<string, string> = {
  Alimentação: 'bg-blue-50 text-blue-700 border-blue-200',
  Financeiro: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Saúde: 'bg-amber-50 text-amber-700 border-amber-200',
  Vestuário: 'bg-purple-50 text-purple-700 border-purple-200',
  Educação: 'bg-pink-50 text-pink-700 border-pink-200',
}

const STATUS_STYLES: Record<string, string> = {
  Ativo: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Revisão: 'bg-amber-50 text-amber-700 border-amber-200',
  Inativo: 'bg-red-50 text-red-700 border-red-200',
}

interface ViewBenefitModalProps {
  benefit: Benefit | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ViewBenefitModal({
  benefit,
  open,
  onOpenChange,
}: ViewBenefitModalProps) {
  if (!benefit) return null

  const imageUrl = benefit.image_url

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg gap-0 p-0 sm:max-w-lg">
        <div className="px-8 py-6">
          <DialogTitle className="text-center text-2xl font-bold tracking-[-0.03em] uppercase">
            Detalhes do Benefício
          </DialogTitle>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-foreground/60 text-sm font-medium">
                Código
              </span>
              <span className="text-sm font-bold">{benefit.code}</span>
            </div>

            <div>
              <span className="text-foreground/60 text-sm font-medium">
                Nome
              </span>
              <p className="text-lg font-semibold uppercase mt-0.5">
                {benefit.name}
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <Badge
                variant="outline"
                className={cn('uppercase', CATEGORY_STYLES[benefit.category])}
              >
                {benefit.category}
              </Badge>
              <Badge
                variant="outline"
                className={cn('uppercase', STATUS_STYLES[benefit.status])}
              >
                {benefit.status}
              </Badge>
            </div>

            <Card className="rounded-xl">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-accent text-primary flex size-8 items-center justify-center rounded-lg">
                    <Package className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs text-foreground/60">Estoque</p>
                    <p
                      className={cn(
                        'text-sm font-semibold',
                        benefit.stock <= 20
                          ? 'text-destructive'
                          : 'text-primary',
                      )}
                    >
                      {benefit.stock} unidades
                    </p>
                  </div>
                </div>

                {benefit.donor && (
                  <div className="flex items-center gap-3">
                    <div className="bg-accent text-primary flex size-8 items-center justify-center rounded-lg">
                      <User className="size-4" />
                    </div>
                    <div>
                      <p className="text-xs text-foreground/60">
                        Doador/Origem
                      </p>
                      <p className="text-sm font-semibold">{benefit.donor}</p>
                    </div>
                  </div>
                )}

                {benefit.validity && (
                  <div className="flex items-center gap-3">
                    <div className="bg-accent text-primary flex size-8 items-center justify-center rounded-lg">
                      <Calendar className="size-4" />
                    </div>
                    <div>
                      <p className="text-xs text-foreground/60">Validade</p>
                      <p className="text-sm font-semibold">
                        {formatIsoDateToDisplay(benefit.validity)}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="bg-accent text-primary flex size-8 items-center justify-center rounded-lg">
                    <Tag className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs text-foreground/60">Categoria</p>
                    <p className="text-sm font-semibold">{benefit.category}</p>
                  </div>
                </div>

                {benefit.creator && (
                  <div className="flex items-center gap-3">
                    <div className="bg-accent text-primary flex size-8 items-center justify-center rounded-lg">
                      <UserCircle className="size-4" />
                    </div>
                    <div>
                      <p className="text-xs text-foreground/60">Responsável</p>
                      <p className="text-sm font-semibold">
                        {benefit.creator.name}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {benefit.notes && (
              <div>
                <span className="text-foreground/60 text-sm font-medium">
                  Observações
                </span>
                <p className="text-sm text-foreground/80 mt-1 whitespace-pre-wrap">
                  {benefit.notes}
                </p>
              </div>
            )}

            {imageUrl ? (
              <div>
                <span className="text-foreground/60 text-sm font-medium">
                  Imagem
                </span>
                <div className="mt-2 rounded-lg overflow-hidden border border-border">
                  <img
                    src={imageUrl}
                    alt={benefit.name}
                    className="w-full max-h-64 object-contain"
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-foreground/50 text-sm">
                <ImageIcon className="size-4" />
                <span>Sem imagem cadastrada</span>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
