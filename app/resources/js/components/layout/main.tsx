import { Header } from './header';

export function Main({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-surface min-h-screen">
      <Header />
      <div className="max-w-lm container mx-auto px-4 py-8">{children}</div>
    </div>
  );
}
