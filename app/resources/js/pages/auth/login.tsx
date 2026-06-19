import { type SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Eye, EyeOff, LoaderCircle, Lock, Mail } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import InputError from '@/components/laravel/input-error';
import TextLink from '@/components/laravel/text-link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}
interface LoginProps {
  status?: string;
  canResetPassword: boolean;
}
export default function Login({ status, canResetPassword }: LoginProps) {
  const { communityCenter } = usePage<SharedData>().props;
  const { data, setData, post, processing, errors, reset } = useForm<LoginForm>(
    {
      email: '',
      password: '',
      remember: false,
    },
  );
  const [showPassword, setShowPassword] = useState(false);
  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(route('login'), {
      onFinish: () => reset('password'),
    });
  };
  return (
    <div className="flex min-h-svh items-center justify-center bg-[#f6f8fc] px-6 py-12">
      <Head title="Entrar" />
      <div className="w-full max-w-[440px]">
        <Card className="border-0 shadow-[0_20px_60px_-40px_rgba(24,49,84,0.55)]">
          <CardContent className="px-10 py-12">
            <div className="flex flex-col items-center gap-5 text-center">
              <img
                alt={communityCenter?.name ?? 'Centelha'}
                className="h-20 w-auto"
                src="/logo.svg"
              />
              <div className="space-y-2">
                <h1 className="text-[22px] font-semibold text-slate-700">
                  Bem-vindo ao {communityCenter?.name ?? 'Centelha'}
                </h1>
                <p className="text-sm text-slate-400">
                  Acesse sua conta para gerenciar as atividades comunitarias.
                </p>
              </div>
            </div>

            <form className="mt-10 flex flex-col gap-6" onSubmit={submit}>
              <div className="grid gap-2">
                <Label
                  className="text-xs font-semibold text-slate-400"
                  htmlFor="email"
                >
                  E-mail
                </Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    autoComplete="email"
                    autoFocus
                    className="h-11 rounded-md border-slate-200 bg-white pl-10 text-slate-700 placeholder:text-slate-300"
                    id="email"
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder="nome@exemplo.com.br"
                    required
                    tabIndex={1}
                    type="email"
                    value={data.email}
                  />
                </div>
                <InputError message={errors.email} />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label
                    className="text-xs font-semibold text-slate-400"
                    htmlFor="password"
                  >
                    Senha
                  </Label>
                  {canResetPassword && (
                    <TextLink
                      className="text-xs font-medium text-slate-400"
                      href={route('password.request')}
                      tabIndex={5}
                    >
                      Esqueceu sua senha?
                    </TextLink>
                  )}
                </div>
                <div className="relative">
                  <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    autoComplete="current-password"
                    className="h-11 rounded-md border-slate-200 bg-white pr-10 pl-10 text-slate-700 placeholder:text-slate-300"
                    id="password"
                    onChange={(e) => setData('password', e.target.value)}
                    placeholder="Sua senha"
                    required
                    tabIndex={2}
                    type={showPassword ? 'text' : 'password'}
                    value={data.password}
                  />
                  <button
                    aria-label={
                      showPassword ? 'Ocultar senha' : 'Mostrar senha'
                    }
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    onClick={() => setShowPassword((prev) => !prev)}
                    tabIndex={4}
                    type="button"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
                <InputError message={errors.password} />
              </div>

              <div className="flex items-center gap-3">
                <Checkbox
                  checked={data.remember}
                  id="remember"
                  name="remember"
                  onCheckedChange={(value) =>
                    setData('remember', value === true)
                  }
                  tabIndex={3}
                />
                <Label className="text-sm text-slate-400" htmlFor="remember">
                  Lembrar de mim
                </Label>
              </div>

              <Button
                className="mt-2 h-12 w-full rounded-md bg-[#3e6fb6] text-white"
                disabled={processing}
                tabIndex={6}
                type="submit"
              >
                {processing && (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                )}
                Entrar
              </Button>
            </form>

            {status && (
              <div className="mt-6 text-center text-sm font-medium text-green-600">
                {status}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
