import { Link } from '@inertiajs/react'
import { LogOut, Settings } from 'lucide-react'
import { UserInfo } from '@/components/laravel/user-info'
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { useMobileNavigation } from '@/hooks/use-mobile-navigation'
import type { User } from '@/types'

interface UserMenuContentProps {
  user: User
}
export function UserMenuContent({ user }: UserMenuContentProps) {
  const cleanup = useMobileNavigation()
  return (
    <>
      <DropdownMenuLabel className="p-0 font-normal">
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <UserInfo showEmail={true} user={user} />
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <Link
            as="button"
            className="block w-full"
            href={route('profile.edit')}
            onClick={cleanup}
            prefetch
          >
            <Settings className="mr-2" />
            Settings
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link
          as="button"
          className="block w-full"
          href={route('logout')}
          method="post"
          onClick={cleanup}
        >
          <LogOut className="mr-2" />
          Log out
        </Link>
      </DropdownMenuItem>
    </>
  )
}
