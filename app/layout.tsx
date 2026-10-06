import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlowWise | Predictive Multi-Currency Cashflow Intelligence & 13-Week Liquidity Engine",
  description:
    "Deterministic 13-week liquidity forecasting with absolute currency isolation (VND, CNY, USD) for cross-border e-commerce brands on Shopee, TikTok Shop & 1688.",
  keywords: [
    "cashflow forecasting",
    "13-week cash flow",
    "e-commerce liquidity",
    "multi-currency cashflow",
    "fintechathon",
    "cross-border treasury",
    "shopee seller cashflow",
    "tiktok shop escrow",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const stored = localStorage.getItem('flowwise-theme');
                  const theme = stored || 'light';
                  document.documentElement.setAttribute('data-theme', theme);
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg-base text-text-primary transition-colors duration-200">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
