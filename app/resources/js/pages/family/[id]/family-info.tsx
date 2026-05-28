import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { LayoutBase } from '@/layouts/layout';
import { ArchiveIcon, BanknoteIcon, CheckCircle2Icon, MapIcon, UserIcon, UsersIcon } from 'lucide-react';

interface FamilyInfoPageProps {
  id: string;
}

export default function FamilyInfoPage({ id }: FamilyInfoPageProps) {
  return (
    <LayoutBase
      tagTitle="Informações da Família"
      titlePage="Detalhes da Família"
      description={
        <div className="flex items-center gap-2">
          ID: <Badge variant={'gray'}>#F-{id}</Badge>
        </div>
      }
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
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

        <aside className="grid gap-4">
          <Card>
            <CardHeader>
              <HeadingCard icon={<UsersIcon className="size-4" />} title="Composição Familiar" />
            </CardHeader>
            <div className="max-h-42 overflow-y-auto">
              {membrosMock.map((membro, index) => (
                <InlineItems key={index} className="border-t p-4 last:pb-0">
                  <p className="text-lg font-semibold">{membro.nome}</p>
                  <p className="text-muted-foreground text-xs">{membro.idade} anos</p>
                </InlineItems>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader>
              <HeadingCard icon={<ArchiveIcon className="size-4" />} title="Histórico de Benefícios" primary={false} />
            </CardHeader>
            <CardContent className="max-h-42 space-y-4 overflow-y-auto">
              {beneficiosMock.map((beneficio, index) => (
                <InlineItems key={index} className="rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-md border border-green-900 p-1 text-xs font-bold uppercase">
                      <CheckCircle2Icon className="size-5 rounded-full bg-green-900 text-white" />
                    </div>
                    <p className="text-lg font-semibold">{beneficio.nome}</p>
                  </div>
                  <p className="text-muted-foreground text-xs">{beneficio.entregue}</p>
                </InlineItems>
              ))}
            </CardContent>
          </Card>
        </aside>
      </div>
    </LayoutBase>
  );
}

const membrosMock = [
  { nome: 'João', idade: 12 },
  { nome: 'Maria', idade: 8 },
  { nome: 'Maria', idade: 8 },
  { nome: 'Maria', idade: 8 },
  { nome: 'Maria', idade: 8 },
  { nome: 'Maria', idade: 8 },
  { nome: 'Maria', idade: 8 },
  { nome: 'Maria', idade: 8 },
];

const beneficiosMock = [
  { nome: 'Cesta Básica', entregue: '10/10/2025', status: 'Entregue' },
  { nome: 'Auxilio Gás', entregue: '10/11/2025', status: 'Entregue' },
  { nome: 'Auxilio Gás', entregue: '10/11/2025', status: 'Entregue' },
  { nome: 'Auxilio Gás', entregue: '10/11/2025', status: 'Entregue' },
  { nome: 'Auxilio Gás', entregue: '10/11/2025', status: 'Entregue' },
];

function HeadingCard({ icon, title, primary = true }: { icon: React.ReactNode; title: string; primary?: boolean }) {
  return (
    <div className={`mb-4 flex items-center gap-2 ${primary ? 'text-primary' : 'text-[#673D00]'}`}>
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

function InlineItems({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex items-center justify-between ${className}`}>{children}</div>;
}
