import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Providers from "./providers";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Filamu 2.0",
  description: "Modern streaming platform by ihope.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
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
