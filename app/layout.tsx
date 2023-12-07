import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from './Providers';
import { getServerSession } from 'next-auth';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Project Todo',
  description: 'A Next CRM style app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className="h-[100%] sm:h-screen">
        <div className={inter.className}>
          <AuthProvider session={session}>
            <Navbar />
            {children}
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
