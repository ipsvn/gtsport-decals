import "./globals.css";
import type { Metadata } from "next";
import { inter } from "@/font";
import theme from '@/theme';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';

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
    <html lang="en" className="overflow-y-scroll">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/wjr4gin.css" />
      </head>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <body className={`${inter.className} bg-dark-gray text-white`}>{children}</body>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </html>
  );
}
