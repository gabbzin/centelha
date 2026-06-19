import { zodResolver } from '@hookform/resolvers/zod';
import {
  type FieldValues,
  FormProvider,
  type UseFormProps,
  useForm,
} from 'react-hook-form';
import type { ZodType } from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
interface GenericFormProps<T extends FieldValues> extends UseFormProps<T> {
  schema: ZodType<T, any, any>;
  onSubmit: (data: T) => Promise<void> | void;
  children: React.ReactNode;
  submitText?: string;
  needButtons?: boolean;
  buttons?: React.ReactNode;
  className?: string;
}
export default function GenericForm<T extends FieldValues>({
  schema,
  onSubmit,
  children,
  submitText,
  buttons,
  needButtons = true,
  className,
  ...hookProps
}: GenericFormProps<T>) {
  const methods = useForm({
    resolver: zodResolver(schema),
    ...hookProps,
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  return (
    <FormProvider {...methods}>
      <form
        className={cn('flex flex-col gap-6', className)}
        onSubmit={handleSubmit(onSubmit)}
      >
        {children}
        {needButtons && (
          <Buttons>
            <Button disabled={isSubmitting} type="submit" variant={'default'}>
              {methods.formState.isSubmitting
                ? 'Enviando...'
                : (submitText ?? 'Enviar')}
            </Button>
            {buttons}
          </Buttons>
        )}
      </form>
    </FormProvider>
  );
}
const Buttons = ({ children }: { children: React.ReactNode }) => {
  return <div className="mt-4 flex flex-col gap-2 font-bold">{children}</div>;
};
