import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import { TeamProvider } from '@/contexts/TeamContext';
import Header from '@/components/layout/Header';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BallClub Manager',
  description: 'Manage your basketball teams and players',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} px-4`}>
        <AuthProvider>
          <TeamProvider>
            <div className="relative min-h-screen flex flex-col">
              <Header />
              <main className='flex-1 py-2'>
                {children}
              </main>
              <footer className="border-t py-6 md:py-0 justify-end">
                <div className="container flex flex-col md:h-16 items-center justify-center md:flex-row md:justify-between">
                  <p className="text-sm text-muted-foreground">
                    © 2025 BallClub Manager. All rights reserved.
                  </p>
                </div>
              </footer>
            </div>
            <Toaster/>
          </TeamProvider>
        </AuthProvider>
      </body>
    </html>
  );
}