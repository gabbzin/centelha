import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { LayoutBase } from '@/layouts/layout';
import { BanknoteIcon, MapIcon, UserIcon } from 'lucide-react';

export default function FamilyInfoPage() {
  return (
    <LayoutBase
      title="Informações da Família"
      titlePage="Detalhes da Família"
      description={
        <div className="flex items-center gap-2">
          ID: <Badge variant={'gray'}>#F-0842</Badge>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        <Card variant={'basic'}>
          <CardContent>
            <div>
              <section>
                <HeadingCard icon={<UserIcon className="size-4" />} title="Informações Pessoais" />

                <InfoItem label="Nome do responsável" value="Mariana Silva" />
                <InlineItems>
                  <InfoItem label="CPF" value="123.456.***-00" />
                  <InfoItem
                    className="flex flex-col items-end"
                    label="Status"
                    value={
                      <Badge variant={'success'} className="rounded-sm border-green-800 px-4 font-bold uppercase">
                        Ativo
                      </Badge>
                    }
                  />
                </InlineItems>
                <InfoItem label="Telefone" value="(11) 99999-9999" />
              </section>

              <Separator className={'my-1'} />

              <section>
                <HeadingCard icon={<BanknoteIcon className="size-4" />} title="Dados Socioeconômicos" />

                <InlineItems>
                  <InfoItem label="Recebe Auxílio" value="Sim" />
                  <InfoItem label="Tipo de moradia" value="Alugada" />
                  <InfoItem label="Fonte de Renda Principal" value="Emprego Informal" />
                </InlineItems>
              </section>

              <Separator className={'my-1'} />

              <section>
                <HeadingCard icon={<MapIcon className="size-4" />} title="Endereço Residencial" />

                <InfoItem label="Logradouro" value="Rua das Palmeiras, 142" />
                <InfoItem label="Bairro / Comunidade" value="Jardim das Flores" />
                <InlineItems>
                  <InfoItem label="CEP" value="01310-100" />
                  <InfoItem label="Cidade/UF" value="São Paulo / SP" />
                </InlineItems>
              </section>
            </div>
          </CardContent>
        </Card>

        
      </div>
    </LayoutBase>
  );
}

function HeadingCard({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="text-primary mb-4 flex items-center gap-2">
      {icon}
      <h4 className="text-lg font-semibold uppercase">{title}</h4>
    </div>
  );
}

function InfoItem({ className, label, value }: { className?: string; label: string; value: string | React.ReactNode }) {
  return (
    <div className={`mb-2 ${className}`}>
      <h6 className="text-muted-foreground text-xs uppercase">{label}</h6>
      <p className="text-heading text-lg font-semibold">{value}</p>
    </div>
  );
}

function InlineItems({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-between">{children}</div>;
}
