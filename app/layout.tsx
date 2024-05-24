import type { Metadata } from "next";
import "./globals.scss";

import {
  ClerkProvider,
} from '@clerk/nextjs'



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
      <body>
        {children}</body>
    </html>
    </ClerkProvider>
  );
}
