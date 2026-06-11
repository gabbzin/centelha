import type { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Logo } from '../logo';
export default function AppLogo() {
  const { communityCenter } = usePage<SharedData>().props;
  return (
    <a className="flex items-center gap-3.5" href="#">
      {/* <AppLogoIcon className="size-5 fill-current text-white dark:text-black" /> */}
      <Logo height={46} width={42} />
      <span className="text-heading sm:w-fit sm:text-xl font-bold tracking-[0.01em]">
        {communityCenter?.name.split(' ')[0]}
      </span>
    </a>
  );
}
