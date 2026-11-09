import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { SITE_NAME } from "@/lib/brand";
import { PAGE_SEO } from "@/lib/seo-metadata";
import { getMetadataBase } from "@/lib/site";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: PAGE_SEO.home.title,
    template: `%s | ${SITE_NAME}`,
  },
  description: PAGE_SEO.home.description,
  metadataBase: getMetadataBase(),
  alternates: {
    types: {
      "text/plain": [{ url: "/llms.txt", title: "llms.txt" }],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
