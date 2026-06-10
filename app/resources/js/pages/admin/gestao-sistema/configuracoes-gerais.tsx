import SettingsPanelCard from '@/components/gestao-sistema/settings-panel-card';
import { SocialInputRow } from '@/components/gestao-sistema/social-input-row';
import { InputSelect } from '@/components/inputs/input-select';
import Uploader1 from '@/components/inputs/uploader1';
import Uploader2 from '@/components/inputs/uploader2';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { LayoutBase } from '@/layouts/layout';
import { BrushIcon, Plus, Share2Icon, WrenchIcon } from 'lucide-react';
import { TtIcon } from './Tt-icon';
import { FormProvider, useForm } from 'react-hook-form';
import GenericForm from '@/components/form/generic-form';
import { ConfigsGeraisForm } from '@/components/gestao-sistema/forms/configs-gerais-form';
import z from 'zod';
const dataSchema = z.object({});
export default function ConfiguracoesGerais() {
  const classIcons = 'size-5';

  // Functions
  const handleSubmit = () => {
    console.log('Formulário enviado');
  };
  return (
    <LayoutBase
      descriptionPage="Gerencie a identidade da marca e as comunicações textuais da plataforma."
      titlePage="Configurações Visuais e Textos"
    >
      <GenericForm
        needButtons={false}
        onSubmit={handleSubmit}
        schema={dataSchema}
      >
        <ConfigsGeraisForm />
        <Separator className="my-6" />
        <footer className="flex items-center justify-end gap-4">
          <Button variant="ghost">Cancelar</Button>
          <Button>Salvar Alterações</Button>
        </footer>
      </GenericForm>
    </LayoutBase>
  );
}
