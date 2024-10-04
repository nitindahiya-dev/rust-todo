import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "Todo App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark `}
      >
        <BackgroundGradientAnimation>
        {children}
        </BackgroundGradientAnimation>
      </body>
    </html>
  );
}
