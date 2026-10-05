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
  title: "FlowWise | Trợ Lý Dòng Tiền Đa Tệ & Dự Báo 13 Tuần Cho Nhà Bán TMĐT",
  description:
    "Nền tảng kiểm soát thanh khoản đa tệ tách biệt (VND, CNY, USD), tự động đối soát doanh thu sàn TMĐT, dự báo 13 tuần và mô phỏng giải cứu dòng tiền cho SMEs Việt Nam.",
  keywords: [
    "cashflow",
    "dòng tiền",
    "shopee",
    "tiktok shop",
    "fintech",
    "dự báo dòng tiền 13 tuần",
    "đa tệ",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0f] text-[#f1f2f6]">
        {children}
      </body>
    </html>
  );
}
