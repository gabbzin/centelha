import { useEffect, useState } from 'react'
import { ExternalLink, FileText, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { formatDisplayDate, normalizeDelivery } from './data'
import type { Delivery } from './types'

interface DeliveryDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  deliveryId?: number | null
}

export function DeliveryDetailsModal({
  open,
  onOpenChange,
  deliveryId,
}: DeliveryDetailsModalProps) {
  const [delivery, setDelivery] = useState<Delivery | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open || !deliveryId) {
      setDelivery(null)
      return
    }

    setLoading(true)
    fetch(`/entregas/${deliveryId}`, {
      headers: { Accept: 'application/json' },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setDelivery(normalizeDelivery(data))
      })
      .finally(() => setLoading(false))
  }, [open, deliveryId])

  const family = delivery?.family
  const address = family?.address

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="max-w-3xl gap-0 p-0 sm:max-w-3xl">
        <div className="overflow-y-auto px-8 py-6">
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl font-bold uppercase tracking-tight">
                #{delivery?.code ?? 'Entrega'}
              </DialogTitle>
              <DialogDescription className="sr-only">
                Detalhes da entrega de benefício.
              </DialogDescription>
              {delivery && (
                <p className="text-foreground/70 mt-1 text-sm">
                  Realizada em{' '}
                  {new Date(delivery.date).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <a
                className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50"
                href={delivery ? `/entregas/${delivery.id}/pdf` : undefined}
                rel="noreferrer"
                target="_blank"
              >
                <FileText className="size-4" />
                Imprimir PDF
              </a>
              <Button
                className="size-8 p-0"
                onClick={() => onOpenChange(false)}
                type="button"
                variant="ghost"
              >
                <X className="size-4" />
              </Button>
            </div>
          </div>

          {loading && (
            <p className="text-foreground/60 py-8 text-center text-sm">
              Carregando detalhes...
            </p>
          )}

          {!loading && delivery && (
            <div className="mt-6 space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="rounded-xl border p-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide">
                    Família Beneficiária
                  </h3>
                  <div className="mt-3 space-y-2 text-sm">
                    <p className="font-medium">{family?.responsible_name}</p>
                    {family?.responsible_cpf ? (
                      <p className="text-foreground/70">
                        CPF: {family.responsible_cpf}
                      </p>
                    ) : null}
                    {address ? (
                      <p className="text-foreground/70">
                        {address.street}
                        {address.number ? `, ${address.number}` : ''} —{' '}
                        {address.neighborhood}, {address.city}/{address.state}
                      </p>
                    ) : null}
                    {family?.members && family.members.length > 0 ? (
                      <div className="pt-2">
                        <p className="text-foreground/80 mb-1 text-xs font-medium uppercase">
                          Membros vinculados
                        </p>
                        <ul className="text-foreground/70 space-y-1 text-xs">
                          {family.members.map((member, index) => (
                            <li key={index}>
                              {member.name}
                              {member.relationship
                                ? ` (${member.relationship})`
                                : ''}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="rounded-xl border p-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide">
                    Status da Operação
                  </h3>
                  <div className="mt-3 flex items-center gap-2">
                    <Badge variant="success_basic">{delivery.status}</Badge>
                  </div>
                  <p className="text-foreground/70 mt-3 text-sm">
                    Responsável: <span className="font-medium">{delivery.deliveredBy}</span>
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide">
                  Itens da Entrega
                </h3>
                <div className="mt-3 overflow-x-auto rounded-xl border">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50 text-foreground/75 text-left text-xs uppercase tracking-wide">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Cód. Item</th>
                        <th className="px-4 py-3 font-semibold">
                          Descrição do Benefício
                        </th>
                        <th className="px-4 py-3 font-semibold">Quantidade</th>
                        <th className="px-4 py-3 font-semibold">
                          Local de Retirada
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-border border-b last:border-b-0">
                        <td className="px-4 py-3 whitespace-nowrap">—</td>
                        <td className="px-4 py-3">{delivery.benefit}</td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {delivery.quantity}
                        </td>
                        <td className="px-4 py-3">{delivery.location}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {delivery.notes ? (
                <div className="rounded-xl border p-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide">
                    Observações do Agente
                  </h3>
                  <p className="text-foreground/80 mt-2 text-sm whitespace-pre-line">
                    {delivery.notes}
                  </p>
                </div>
              ) : null}

              {delivery.receipt_url ? (
                <div className="rounded-xl border p-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide">
                    Comprovante Anexado
                  </h3>
                  <a
                    className="text-primary mt-2 inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                    href={delivery.receipt_url}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <ExternalLink className="size-4" />
                    Visualizar comprovante
                  </a>
                </div>
              ) : null}
            </div>
          )}
        </div>

        <div className="border-border flex items-center justify-end gap-3 rounded-b-xl border-t bg-background px-8 py-4">
          <Button
            onClick={() => onOpenChange(false)}
            type="button"
            variant="outline"
          >
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
