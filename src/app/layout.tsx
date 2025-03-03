import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";

import type { Metadata } from "next";
import { Toaster } from "./../components/ui/toaster";
import Provider from "./components/Provider";
import NavbarPage from "./navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UPT SMPN 10 TAPUNG",
  description: "Website ini berisi informasi tentang sekolah SMPN 10 Tapung",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider>
          <div className="max-w mx-auto">
            <NavbarPage /> {/* Biarkan NavbarPage yang mengontrol tampilan */}
            {children}
          </div>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
