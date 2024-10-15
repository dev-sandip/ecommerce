import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { QueryProvider } from "@/providers/query-provider";
const font = Bricolage_Grotesque({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trendify | Shop Latest Trends & Quality Products",
  description: "Explore Trendify for the latest fashion, electronics, home essentials, and more at unbeatable prices.",
  openGraph: {
    title: "Trendify - Shop Latest Trends",
    description: "Discover top-quality products in fashion, electronics, and more at Trendify. Shop today!",
    type: "website",
    url: "https://trendify.com",
    images: [
      {
        url: "https://trendify.com/og-image.jpg",
        width: 800,
        height: 600,
        alt: "Trendify - Homepage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@trendify",
    title: "Trendify",
    description: "Shop the latest trends at affordable prices across multiple categories on Trendify.",
    images: "https://trendify.com/twitter-image.jpg",
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
        className={cn(font.className, "antialiased min-h-screen")}
      >
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
