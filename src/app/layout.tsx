import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PIBA International - Professionals in Beauty & Boutique Association",
  description: "Empowering the global beauty and boutique industry with professional certifications, membership programs, and industry recognition.",
  keywords: "beauty certification, boutique association, professional beauty, makeup certification, hairstyling certification, spa professional",
  authors: [{ name: "PIBA International" }],
  openGraph: {
    title: "PIBA International - Professionals in Beauty & Boutique Association",
    description: "Empowering the global beauty and boutique industry with professional certifications and membership programs.",
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
    <html
      lang="en"
      className={`${inter.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
