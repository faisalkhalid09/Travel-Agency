import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from '@/contexts/AuthContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WanderlustTravel - Your Gateway to Adventure",
  description: "Discover amazing travel packages, book your dream vacation, and create unforgettable memories with WanderlustTravel. Expert planning, best prices, 24/7 support.",
  keywords: "travel, vacation, adventure, booking, packages, destinations, tourism",
  authors: [{ name: "WanderlustTravel" }],
  openGraph: {
    title: "WanderlustTravel - Your Gateway to Adventure",
    description: "Discover amazing travel packages and book your dream vacation",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
