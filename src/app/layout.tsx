import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header/Header";
import AuthProvider from "../components/AuthProvider/AuthProvider";
import "primereact/resources/themes/lara-light-cyan/theme.css";

import Notifier from "@/components/Notifier/Notifier";
import { PrimeReactProvider } from 'primereact/api';

export const metadata: Metadata = {
  title: "RL Papelaria",
  description: "Melhor loja para comprar materiais escolares e de escritório",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
  {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <PrimeReactProvider>
            <AuthProvider>
              <Notifier/>
              <Header/>
              {children}
            </AuthProvider>
          </PrimeReactProvider>
        </main>
      </body>
    </html>
  );
}
