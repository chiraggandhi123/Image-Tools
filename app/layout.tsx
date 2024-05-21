import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

import {
  ClerkProvider,
} from '@clerk/nextjs'


const IBM_Plex = IBM_Plex_Sans({ subsets: ["latin"], weight:['400', '500', '600', '700'], variable: '--font-ibm-plex' });

export const metadata: Metadata = {
  title: "ReImagine.ai",
  description: "An AI powered Image editing tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <ClerkProvider appearance={{variables:{colorPrimary:'#624cf5'}}}>
    <html lang="en">
      <body className={IBM_Plex.className}>
        {children}</body>
    </html>
    </ClerkProvider>
  );
}
