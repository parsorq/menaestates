import { GuidePage } from "@/app/components/GuidePage";
import type { LanderDefinition } from "@/lib/landers";

type LanderPageProps = {
  lander: LanderDefinition;
};

/**
 * Kind dispatcher for landers. City leaves render via CityLanderPage on
 * the route. Guide leaves use GuidePage under /guides/[slug].
 */
export function LanderPage({ lander }: LanderPageProps) {
  if (lander.kind === "guide") {
    return <GuidePage lander={lander} />;
  }
  throw new Error(
    `LanderPage only renders guide landers. Got ${lander.kind}: ${lander.slug}`,
  );
}
