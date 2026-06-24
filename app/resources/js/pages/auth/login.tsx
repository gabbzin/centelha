import { Head, useForm, usePage } from '@inertiajs/react'
import { Eye, EyeOff, LoaderCircle, Lock, Mail } from 'lucide-react'
import { type FormEventHandler, useState } from 'react'
import InputError from '@/components/laravel/input-error'
import TextLink from '@/components/laravel/text-link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { SharedData } from '@/types'

interface LoginForm {
  email: string
  password: string
  remember: boolean
}
interface LoginProps {
  status?: string
  canResetPassword: boolean
  previewSettings?: Record<string, unknown>
}

export default function Login({
  status,
  canResetPassword,
  previewSettings,
}: LoginProps) {
  const { communityCenter, pageSettings: sharedSettings } =
    usePage<SharedData>().props
  const pageSettings = previewSettings ?? sharedSettings
  const texts = (pageSettings?.texts as Record<string, string>) ?? {}
  const t = (key: string, fallback: string) => texts[key] ?? fallback
  const { data, setData, post, processing, errors, reset } = useForm<LoginForm>(
    {
      email: '',
      password: '',
      remember: false,
    },
  )
  const [showPassword, setShowPassword] = useState(false)

  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    post(route('login'), {
      onFinish: () => reset('password'),
    })
  }
  return (
    <div className="flex min-h-svh items-center justify-center bg-[#f6f8fc] px-6 py-12">
      <Head title={t('submit_button', 'Entrar')} />
      <div className="w-full max-w-[440px]">
        <Card className="border-0 shadow-[0_20px_60px_-40px_rgba(24,49,84,0.55)]">
          <CardContent className="px-10 py-12">
            <div className="flex flex-col items-center gap-5 text-center">
              <img
                alt={communityCenter?.name ?? 'Centelha'}
                className="h-20 w-auto"
                src={communityCenter?.logo_url ?? '/logo.svg'}
              />
              <div className="space-y-2">
                <h1 className="text-[22px] font-semibold text-slate-700">
                  {t('welcome_title', 'Bem-vindo ao')}{' '}
                  {communityCenter?.name ?? 'Centelha'}
                </h1>
                <p className="text-sm text-slate-400">
                  {t(
                    'subtitle',
                    'Acesse sua conta para gerenciar as atividades comunitarias.',
                  )}
                </p>
              </div>
            </div>

            <form className="mt-10 flex flex-col gap-6" onSubmit={submit}>
              <div className="grid gap-2">
                <Label
                  htmlFor="email"
                  className="text-xs font-semibold text-slate-400"
                >
                  {t('email_label', 'E-mail')}
                </Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    autoComplete="email"
                    autoFocus
                    className="h-11 rounded-md border-slate-200 bg-white pl-10 text-slate-700 placeholder:text-slate-300"
                    id="email"
                    onChange={(e) => setData('email', e.target.value)}
                    placeholder={t('email_placeholder', 'nome@exemplo.com.br')}
                  />
                </div>
                <InputError message={errors.email} />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-xs font-semibold text-slate-400"
                  >
                    {t('password_label', 'Senha')}
                  </Label>
                  {canResetPassword && (
                    <TextLink
                      className="text-xs font-medium text-slate-400"
                      href={route('password.request')}
                      tabIndex="0"
                    >
                      {t('forgot_link', 'Esqueceu sua senha?')}
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
                    placeholder={t('password_placeholder', 'Sua senha')}
                    type={showPassword ? 'text' : 'password'}
                  />
                  <button
                    aria-label={
                      showPassword ? 'Ocultar senha' : 'Mostrar senha'
                    }
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    onClick={() => setShowPassword((prev) => !prev)}
                    tabIndex="0"
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
                  tabIndex="0"
                />
                <Label htmlFor="remember" className="text-sm text-slate-400">
                  {t('remember_label', 'Lembrar de mim')}
                </Label>
              </div>

              <Button
                className="mt-2 h-12 w-full rounded-md bg-[#3e6fb6] text-white"
                disabled={processing}
                tabIndex="0"
                type="submit"
              >
                {processing && (
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                )}
                {t('submit_button', 'Entrar')}
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
  )
}
