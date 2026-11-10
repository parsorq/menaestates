import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CityLanderPage } from "@/app/components/CityLanderPage";
import { SituationLanderPage } from "@/app/components/SituationLanderPage";
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
  if (lander.kind === "city") {
    return <CityLanderPage lander={lander} />;
  }
  if (lander.kind === "situation") {
    return <SituationLanderPage lander={lander} />;
  }
  notFound();
}
