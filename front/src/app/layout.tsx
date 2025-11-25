import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderNew from '@/components/layout/HeaderNew';
import Footer from '@/components/layout/Footer';
import Providers from '@/components/providers/Providers';
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fashion Store",
  description: "Nueva colección otoño 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        <Providers>
          <HeaderNew />
          <main>
            {children}
          </main>
          <Footer />
          <Toaster 
            theme="dark"
            position="top-right"
            richColors
            closeButton
            expand={true}
            duration={4000}
          />
        </Providers>
      </body>
    </html>
  );
}
