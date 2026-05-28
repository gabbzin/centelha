import type { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Logo } from '../logo';

export default function AppLogo() {
  const { communityCenter } = usePage<SharedData>().props;

  return (
    <a href="#" className="flex items-center gap-3.5">
      {/* <AppLogoIcon className="size-5 fill-current text-white dark:text-black" /> */}
      <Logo width={42} height={46} />
      <span className="text-heading text-xl font-bold tracking-[0.01em]">{communityCenter?.name}</span>
    </a>
  );
}
