import type { Metadata } from "next";
import React from "react";
import "@/style/global.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/theme-provider";
import Layout from "@/components/layout/Layout";
import { ModalProvider } from "@/providers/ModalProvider";
import { Toaster } from "@/components/ui/toaster";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Shop",
  description: "",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <Layout>
            <ModalProvider></ModalProvider>
            {children}
          </Layout>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
