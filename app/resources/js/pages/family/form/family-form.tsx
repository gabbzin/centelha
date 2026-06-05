import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { toaster } from '@/components/toasters/toast-alert';
import { router } from '@inertiajs/react';
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
import { Step2 } from './form-steps/step2';
import { Step3 } from './form-steps/step3';
import { RequiredInputPhrase } from './required-input';
const STEP_FIELDS: Array<Array<keyof FormData>> = [
  ['name', 'cpf', 'telefone', 'email', 'data_nascimento', 'family_members'],
  ['cep', 'logradouro', 'numero', 'cidade', 'UF', 'bairro', 'moradia'],
  ['fonte_renda', 'renda_familiar', 'recebe_auxilio', 'auxilios_recebidos'],
];
const STEPS = [
  {
    title: 'Dados do responsável familiar e informações da família',
    description:
      'Preencha as informações principais do títular do cadastro e da sua família',
    component: <Step1 />,
  },
  {
    title: 'Endereço',
    description: 'Preencha as informações de endereço do responsável familiar',
    component: <Step2 />,
  },
  {
    title: 'Renda e Situação Econômica',
    description:
      'Informe os dados financeiros e recebimento de benefícios sociais para finalizar o cadastro',
    component: <Step3 />,
  },
];
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
    resolver: zodResolver(familySchema) as unknown as Resolver<FormData>,
    defaultValues,
  });
  const handleNext = async () => {
    const isValid = await form.trigger(STEP_FIELDS[step]);
    console.log(form.formState.errors[STEP_FIELDS[step][0]]?.message);
    toaster.createError(
      `Erro!`,
      `${form.formState.errors[STEP_FIELDS[step][0]]?.message}`,
    );
    if (isValid) onNext();
  };
  const onSubmit = form.handleSubmit((data) => {
    router.post('/family', data as never, {
      onSuccess: () => {
        toaster.createSuccess(
          'Sucesso!',
          'Cadastro da família concluído com sucesso!',
        );
        router.visit('family');
      },
      onError: () => {
        toaster.createError(
          'Erro!',
          'Ocorreu um erro ao cadastrar a família. Verifique os dados e tente novamente.',
        );
      },
    });
  });
  return (
    <>
      <div className="space-y-4">
        <Card className="bg-background space-y-6 rounded-lg h-150">
          <CardHeader className="border-border border-b shrink-0">
            <CardTitle className="text-xl">{STEPS[step].title}</CardTitle>
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

        {step < totalSteps - 1 ? (
          <Button onClick={handleNext} type="button" variant={'primary'}>
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
