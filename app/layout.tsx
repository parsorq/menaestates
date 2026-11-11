import type { Metadata } from "next";
import { IBM_Plex_Sans, Newsreader } from "next/font/google";
import { JsonLd } from "@/app/components/JsonLd";
import { SITE_NAME } from "@/lib/brand";
import { organizationJsonLd, webSiteJsonLd } from "@/lib/schema";
import { PAGE_SEO } from "@/lib/seo-metadata";
import { getMetadataBase } from "@/lib/site";
import "./globals.css";

const display = Newsreader({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    <html
      lang="en"
      className={`${display.variable} ${body.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>
        <JsonLd data={[organizationJsonLd(), webSiteJsonLd()]} />
        {children}
      </body>
    </html>
  );
}
