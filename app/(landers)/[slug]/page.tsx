import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LanderPage } from "@/app/components/LanderPage";
import { getLanderBySlug, landerSlugs } from "@/lib/landers";
import { buildPageMetadata, type SeoRouteKey } from "@/lib/seo-metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return landerSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const lander = getLanderBySlug(slug);
  if (!lander) return {};
  return buildPageMetadata(lander.slug as SeoRouteKey);
}

export default async function LanderRoutePage({ params }: PageProps) {
  const { slug } = await params;
  const lander = getLanderBySlug(slug);
  if (!lander) notFound();
  return <LanderPage lander={lander} />;
}
