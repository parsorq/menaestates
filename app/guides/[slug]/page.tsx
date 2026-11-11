import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuidePage } from "@/app/components/GuidePage";
import { getLanderBySlug, guideLanders } from "@/lib/landers";
import { buildPageMetadata, type SeoRouteKey } from "@/lib/seo-metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return guideLanders().map((lander) => ({ slug: lander.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const lander = getLanderBySlug(slug);
  if (!lander || lander.kind !== "guide") return {};
  return buildPageMetadata(lander.slug as SeoRouteKey);
}

export default async function GuideRoutePage({ params }: PageProps) {
  const { slug } = await params;
  const lander = getLanderBySlug(slug);
  if (!lander || lander.kind !== "guide") notFound();
  return <GuidePage lander={lander} />;
}
