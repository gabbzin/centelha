import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRightIcon } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Resolver } from 'react-hook-form';
import {
  defaultValues,
  familySchema,
  type FormData,
} from './schema/family-schema';
import { Step1 } from './form-steps/step1';
import { RequiredInputPhrase } from './required-input';
import { Step2 } from './form-steps/step2';
import { toaster } from '@/components/toasters/toast-alert';
interface FamilyFormProps {
  step: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
}
export function FamilyForm({
  step,
  totalSteps,
  onNext,
  onPrev,
}: FamilyFormProps) {
  const form = useForm<FormData>({
    mode: 'onTouched',
    // tipamos explicitamente o resolver para `FormData` para alinhar os tipos
    resolver: zodResolver(familySchema) as unknown as Resolver<FormData>,
    defaultValues,
  });
  const onSubmit = form.handleSubmit(async (data) => {
    await toaster.createSuccess(
      'Sucesso!',
      'Cadastro da família concluído com sucesso!',
    );
    console.log('Form Data:', data);
  });
  const STEPS = [
    {
      title: 'Dados do responsável familiar e informações da família',
      description:
        'Preencha as informações principais do títular do cadastro e da sua família',
      component: <Step1 />,
    },
    {
      title: 'Endereço',
      description:
        'Preencha as informações de endereço do responsável familiar',
      component: <Step2 />,
    },
    {
      title: 'Anexos',
      description: 'Faça o upload dos documentos necessários para o cadastro',
      component: <div>Anexos</div>,
    },
  ];
  return (
    <>
      <div className="space-y-4">
        <Card className="bg-background space-y-6 rounded-lg h-150">
          <CardHeader className="border-border border-b shrink-0">
            <CardTitle>{STEPS[step].title}</CardTitle>
            <CardDescription>{STEPS[step].description}</CardDescription>
          </CardHeader>
          <CardContent className="min-h-0 flex-1 overflow-y-auto bg-background">
            <FormProvider {...form}>
              <form onSubmit={onSubmit}>{STEPS[step].component}</form>
            </FormProvider>
          </CardContent>
        </Card>
        <RequiredInputPhrase />
      </div>

      <footer className="border-border flex items-center justify-between border-t p-6">
        <Button disabled={step === 0} onClick={onPrev} variant={'outline'}>
          Voltar
        </Button>

        {/* O indice das steps começa com 0 (total vai ser 3), finaliza quando o indice for 2 */}
        {step < totalSteps - 1 ? (
          <Button onClick={onNext} type="button" variant={'primary'}>
            Próximo Passo <ArrowRightIcon />
          </Button>
        ) : (
          <Button onClick={onSubmit} type="submit" variant={'primary'}>
            Finalizar Cadastro
          </Button>
        )}
      </footer>
    </>
  );
}
