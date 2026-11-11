import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CityLanderPage } from "@/app/components/CityLanderPage";
import { cityLanders, getLanderBySlug } from "@/lib/landers";
import { buildPageMetadata, type SeoRouteKey } from "@/lib/seo-metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

/** City landers only. Guides live under /guides/[slug]. */
export function generateStaticParams() {
  return cityLanders().map((lander) => ({ slug: lander.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const lander = getLanderBySlug(slug);
  if (!lander || lander.kind !== "city") return {};
  return buildPageMetadata(lander.slug as SeoRouteKey);
}

export default async function LanderRoutePage({ params }: PageProps) {
  const { slug } = await params;
  const lander = getLanderBySlug(slug);
  if (!lander || lander.kind !== "city") notFound();
  return <CityLanderPage lander={lander} />;
}
