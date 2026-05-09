import "./globals.css";
import type { Metadata } from "next";
import { Syncopate, Inter } from "next/font/google";
import theme from '@/theme';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const syncopate = Syncopate({
  variable: "--font-syncopate",
  subsets: ["latin"],
  weight: ["400", "700"],
});


import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';

export const metadata: Metadata = {
  title: "Gran Turismo Sport - Decals",
  description: "Search the GT Sport decal database",
  icons: {
    icon: '/automod_logo_amws_crop_pcs.svg',
  }
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
          <body className={`${inter.variable} ${syncopate.variable} font-sans bg-black text-white`}>{children}</body>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </html>
  );
}
