import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import { Sidebar } from '@/shared/components/layout/Sidebar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Clarus Acts',
  description:
    'Clarus Acts — сервіс для створення актів виконаних робіт у PDF. Просто, швидко, професійно.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/logo.png" sizes="275x230" type="image/png" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900 grid grid-cols-[280px_1fr] min-h-screen`}
      >
        <Sidebar />
        <main className="w-full">
          <div className="max-w-5xl mx-auto p-6 md:p-10">{children}</div>
        </main>
      </body>
    </html>
  );
}
