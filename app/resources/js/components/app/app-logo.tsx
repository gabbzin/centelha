import { usePage } from '@inertiajs/react'
import type { SharedData } from '@/types'
import { Logo } from '../logo'

function hasCustomLogo(
  logoPath: string | null | undefined,
): logoPath is string {
  return !!logoPath && logoPath.includes('/')
}

export default function AppLogo() {
  const { communityCenter } = usePage<SharedData>().props

  return (
    <a className="flex items-center gap-3.5" href={route('dashboard')}>
      {hasCustomLogo(communityCenter?.logo_path) ? (
        <img
          alt={communityCenter?.name ?? 'Logo'}
          className="h-10 w-auto object-contain"
          src={communityCenter?.logo_url}
        />
      ) : (
        <Logo height={46} width={42} />
      )}
      <span className="text-heading sm:w-fit sm:text-xl font-bold tracking-[0.01em]">
        {communityCenter?.name.split(' ')[0]}
      </span>
    </a>
  )
}
