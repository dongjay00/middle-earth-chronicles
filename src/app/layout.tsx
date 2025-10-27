import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/providers/QueryProvider";
import Navigation from "@/components/layout/Navigation";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" });

export const metadata: Metadata = {
  title: "Middle-earth Chronicles",
  description: "Explore the world of Lord of the Rings",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${cinzel.variable} bg-black text-white`}
      >
        <QueryProvider>
          <Navigation />
          <main className="min-h-screen">{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}
