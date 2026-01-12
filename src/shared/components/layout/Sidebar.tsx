'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

const nav = [
  { name: 'Дашборд', href: '/' },
  { name: 'Акти', href: '/acts' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 flex-col bg-slate-900 text-slate-200">
      <div className="flex gap-3 px-6 py-5 items-center mb-4">
        <Image width={40} height={40} src="/logo.png" alt="logo" />
        <p className="text-xl font-bold">Clarus Acts</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3">
        {nav.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={twMerge(
                'block rounded-md px-3 py-2 text-md font-medium transition-colors',
                'text-gray-400 hover:bg-slate-800 hover:text-white',
                isActive && 'bg-slate-800 text-white shadow-sm'
              )}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User stub */}
      <div className="border-t border-slate-800 px-4 py-4 text-sm">
        <div className="font-medium">Oleksandr K.</div>
        <div className="text-xs text-slate-400">Pro Builder Ltd.</div>

        <button className="mt-3 text-xs text-slate-400 hover:text-slate-200">
          Log out
        </button>
      </div>
    </aside>
  );
}
