import type { Metadata } from "next";
import { Archivo_Black, Hanken_Grotesk, VT323 } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "./providers";
import Navbar from "@/components/navbar";

const display = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const crt = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Filamu 2.0 — Be Kind, Rewind",
  description: "A video-store guide to what's worth renting. Movies & series, freshly cataloged.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${display.variable} ${body.variable} ${crt.variable}`}>
        <body className="min-h-screen bg-crt text-cream antialiased">
          <Providers>
            <header>
              <Navbar />
            </header>
            <main>
              {children}
              <Analytics />
            </main>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
