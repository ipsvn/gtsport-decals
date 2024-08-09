import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gran Turismo Sport - Decals",
  description: "Search the GT Sport decal database",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/wjr4gin.css" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
