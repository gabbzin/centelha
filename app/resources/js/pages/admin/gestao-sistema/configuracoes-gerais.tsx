import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { LayoutBase } from '@/layouts/layout';
import GenericForm from '@/components/form/generic-form';
import { ConfigsGeraisForm } from '@/components/gestao-sistema/forms/configs-gerais-form';
import { router, usePage } from '@inertiajs/react';
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { SharedData } from '@/types';
import { FileWithPreview } from '@/hooks/inputs/use-file-upload';
import { toaster } from '@/components/toasters/toast-alert';
import z from 'zod';
const dataSchema = z.object({
  platformName: z.string().min(1, 'Nome da plataforma é obrigatório'),
  slogan: z.string().optional(),
  footerText: z.string().optional(),
  font: z.string().min(1),
  social_links: z
    .array(
      z.object({
        value: z.string(),
      }),
    )
    .optional(),
  maintenance_mode: z.boolean().optional(),
});
type FormValues = z.infer<typeof dataSchema>;
function FormContent({
  logoFile,
  faviconFile,
  onLogoChange,
  onFaviconChange,
}: {
  logoFile: File | null;
  faviconFile: File | null;
  onLogoChange: (files: FileWithPreview[]) => void;
  onFaviconChange: (files: FileWithPreview[]) => void;
}) {
  const { getValues, trigger } = useFormContext<FormValues>();
  const handleSave = async () => {
    const isValid = await trigger();
    if (!isValid) return;
    const values = getValues();
    const formData = new FormData();
    formData.append('name', values.platformName);
    if (values.slogan) formData.append('slogan', values.slogan);
    if (values.footerText) formData.append('rodape_text', values.footerText);
    formData.append('fontFamily', values.font);
    formData.append('maintenance_mode', values.maintenance_mode ? '1' : '0');
    if (values.social_links && values.social_links.length > 0) {
      formData.append('social_links', JSON.stringify(values.social_links));
    }
    if (logoFile) formData.append('logo', logoFile);
    if (faviconFile) formData.append('favicon', faviconFile);
    router.put(route('gestao-sistema.configuracoes-gerais.update'), formData, {
      preserveState: true,
      onSuccess: () => {
        toaster.createSuccess('Sucesso', 'Configurações salvas com sucesso!');
      },
      onError: () => {
        toaster.createError(
          'Erro',
          'Algo deu errado ao salvar as configurações.',
        );
      },
    });
  };
  return (
    <>
      <ConfigsGeraisForm
        onFaviconChange={onFaviconChange}
        onLogoChange={onLogoChange}
      />
      <Separator className="my-6" />
      <footer className="flex items-center justify-end gap-4">
        <Button variant="ghost">Cancelar</Button>
        <Button onClick={handleSave}>Salvar Alterações</Button>
      </footer>
    </>
  );
}
export default function ConfiguracoesGerais() {
  const { communityCenter } = usePage<SharedData>().props;
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);
  return (
    <LayoutBase
      descriptionPage="Gerencie a identidade da marca e as comunicações textuais da plataforma."
      tagTitle="Configurações Gerais"
      titlePage="Configurações Visuais e Textos"
    >
      <GenericForm
        defaultValues={{
          platformName: communityCenter?.name ?? '',
          slogan: communityCenter?.slogan ?? '',
          footerText: communityCenter?.rodape_text ?? '',
          font: communityCenter?.fontFamily ?? 'poppins',
          social_links:
            communityCenter?.social_links?.map((s) => ({
              value: s.value,
            })) ?? [],
          maintenance_mode: communityCenter?.maintenance_mode ?? false,
        }}
        needButtons={false}
        onSubmit={() => {}}
        schema={dataSchema}
      >
        <FormContent
          faviconFile={faviconFile}
          logoFile={logoFile}
          onFaviconChange={(files) =>
            setFaviconFile(
              files[0]?.file instanceof File ? files[0].file : null,
            )
          }
          onLogoChange={(files) =>
            setLogoFile(files[0]?.file instanceof File ? files[0].file : null)
          }
        />
      </GenericForm>
    </LayoutBase>
  );
}
