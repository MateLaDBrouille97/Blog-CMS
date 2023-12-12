import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppProps } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/providers/modal-provider";
import { ToastProvider } from "@/providers/toast-provider";
// import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog Dashboard",
  description: "Admin Blog Dashboard",
  icons: [
    {
      url: "/remi-muller-hYAmjIvLALE-unsplash.jpg",
      href: "/remi-muller-hYAmjIvLALE-unsplash.jpg"
    }
  ]
};

export default function RootLayout({
  children,
  pageProps,
}: {
  children: React.ReactNode;
  pageProps: AppProps;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ToastProvider />
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
