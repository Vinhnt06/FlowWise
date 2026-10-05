import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0A0A0F] text-[#F1F2F6]">
        {children}
      </body>
    </html>
  );
}
