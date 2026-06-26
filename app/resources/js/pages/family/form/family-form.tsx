import { zodResolver } from '@hookform/resolvers/zod'
import { router } from '@inertiajs/react'
import { ArrowRightIcon } from 'lucide-react'
import type { Resolver } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import { toaster } from '@/components/toasters/toast-alert'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { Family } from '@/types'
import { Step1 } from './form-steps/step1'
import { Step2 } from './form-steps/step2'
import { Step3 } from './form-steps/step3'
import { RequiredInputPhrase } from './required-input'
import {
  defaultValues,
  type FormData,
  familySchema,
  familyToFormData,
} from './schema/family-schema'

const STEP_FIELDS: Array<Array<keyof FormData>> = [
  ['name', 'cpf', 'telefone', 'email', 'data_nascimento', 'family_members', 'tags'],
  ['cep', 'logradouro', 'numero', 'cidade', 'UF', 'bairro', 'moradia'],
  ['fonte_renda', 'renda_familiar', 'recebe_auxilio', 'auxilios_recebidos'],
]

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
]

interface FamilyFormProps {
  step: number
  totalSteps: number
  onNext: () => void
  onPrev: () => void
  family?: Family
  availableTags?: Array<{ id: number; name: string; color: string; icon: string | null }>
}

export function FamilyForm({
  step,
  totalSteps,
  onNext,
  onPrev,
  family,
  availableTags = [],
}: FamilyFormProps) {
  const form = useForm<FormData>({
    mode: 'onTouched',
    resolver: zodResolver(familySchema) as unknown as Resolver<FormData>,
    defaultValues: family ? familyToFormData(family) : defaultValues,
  })

  const isEditing = !!family

  const handleNext = async () => {
    const isValid = await form.trigger(STEP_FIELDS[step])
    if (isValid) {
      onNext()
    } else {
      const firstErrorField = STEP_FIELDS[step].find(
        (field) => form.formState.errors[field],
      )
      const errorMessage = firstErrorField
        ? form.formState.errors[firstErrorField]?.message
        : 'Verifique os campos'
      toaster.createError(`Erro de validação!`, String(errorMessage))
    }
  }

  const onSubmit = form.handleSubmit((data) => {
    const options = {
      onSuccess: () => {
        toaster.createSuccess(
          'Sucesso!',
          isEditing
            ? 'Informações da família atualizadas com sucesso!'
            : 'Cadastro da família concluído com sucesso!',
        )
      },
      onError: () => {
        toaster.createError(
          'Erro!',
          isEditing
            ? 'Ocorreu um erro ao atualizar a família. Verifique os dados e tente novamente.'
            : 'Ocorreu um erro ao cadastrar a família. Verifique os dados e tente novamente.',
        )
      },
    }

    if (isEditing) {
      router.put(`/family/${family.id}`, data as never, options)
    } else {
      router.post('/family', data as never, options)
    }
  })

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
              <form onSubmit={onSubmit}>
                {step === 0 && <Step1 availableTags={availableTags} />}
                {step === 1 && <Step2 />}
                {step === 2 && <Step3 />}
              </form>
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
            {isEditing ? 'Atualizar Cadastro' : 'Finalizar Cadastro'}
          </Button>
        )}
      </footer>
    </>
  )
}
