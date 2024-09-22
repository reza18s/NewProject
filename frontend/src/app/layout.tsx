import type { Metadata } from "next";
import React from "react";
import "@/style/global.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/theme-provider";
import Layout from "@/components/layout/Layout";
import { ModalProvider } from "@/providers/ModalProvider";
import { Toaster } from "react-hot-toast";
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
      <body className={cn("min-h-screen bg-background font-sans antialiased")}>
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
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "var(--color-grey-0)",
                color: "var(--color-grey-700)",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
