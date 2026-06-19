import { Transition } from '@headlessui/react'
import { Head, Link, useForm, usePage } from '@inertiajs/react'
import type { FormEventHandler } from 'react'
import DeleteUser from '@/components/laravel/delete-user'
import HeadingSmall from '@/components/laravel/heading-small'
import InputError from '@/components/laravel/input-error'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AppLayout from '@/layouts/app-layout'
import SettingsLayout from '@/layouts/settings/layout'
import type { BreadcrumbItem, SharedData } from '@/types'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Profile settings',
    href: '/settings/profile',
  },
]
export default function Profile({
  mustVerifyEmail,
  status,
}: {
  mustVerifyEmail: boolean
  status?: string
}) {
  const { auth } = usePage<SharedData>().props
  const { data, setData, patch, errors, processing, recentlySuccessful } =
    useForm({
      name: auth.user.name,
      email: auth.user.email,
    })
  const submit: FormEventHandler = (e) => {
    e.preventDefault()
    patch(route('profile.update'))
  }
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Profile settings" />

      <SettingsLayout>
        <div className="space-y-6">
          <HeadingSmall
            description="Update your name and email address"
            title="Profile information"
          />

          <form className="space-y-6" onSubmit={submit}>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>

              <Input
                autoComplete="name"
                className="mt-1 block w-full"
                id="name"
                onChange={(e) => setData('name', e.target.value)}
                placeholder="Full name"
                required
                value={data.name}
              />

              <InputError className="mt-2" message={errors.name} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email address</Label>

              <Input
                autoComplete="username"
                className="mt-1 block w-full"
                id="email"
                onChange={(e) => setData('email', e.target.value)}
                placeholder="Email address"
                required
                type="email"
                value={data.email}
              />

              <InputError className="mt-2" message={errors.email} />
            </div>

            {mustVerifyEmail && auth.user.email_verified_at === null && (
              <div>
                <p className="mt-2 text-sm text-neutral-800">
                  Your email address is unverified.
                  <Link
                    as="button"
                    className="rounded-md text-sm text-neutral-600 underline hover:text-neutral-900 focus:ring-2 focus:ring-offset-2 focus:outline-hidden"
                    href={route('verification.send')}
                    method="post"
                  >
                    Click here to re-send the verification email.
                  </Link>
                </p>

                {status === 'verification-link-sent' && (
                  <div className="mt-2 text-sm font-medium text-green-600">
                    A new verification link has been sent to your email address.
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center gap-4">
              <Button disabled={processing}>Save</Button>

              <Transition
                enter="transition ease-in-out"
                enterFrom="opacity-0"
                leave="transition ease-in-out"
                leaveTo="opacity-0"
                show={recentlySuccessful}
              >
                <p className="text-sm text-neutral-600">Saved</p>
              </Transition>
            </div>
          </form>
        </div>

        <DeleteUser />
      </SettingsLayout>
    </AppLayout>
  )
}
