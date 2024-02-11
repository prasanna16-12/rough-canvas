import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CanvasProvider } from "./hooks/useCanvas";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Draw",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CanvasProvider>
          {children}
        </CanvasProvider>
      </body>
    </html>
  );
}
