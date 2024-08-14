import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { inter } from "../font";
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';

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
          <body className={inter.className}>{children}</body>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </html>
  );
}
