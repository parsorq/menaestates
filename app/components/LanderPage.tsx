import { SituationLanderPage } from "@/app/components/SituationLanderPage";
import type { LanderDefinition } from "@/lib/landers";

type LanderPageProps = {
  lander: LanderDefinition;
};

/**
 * Kind dispatcher for landers. City leaves render via CityLanderPage on
 * the route. Situation leaves use SituationLanderPage.
 */
export function LanderPage({ lander }: LanderPageProps) {
  if (lander.kind === "situation") {
    return <SituationLanderPage lander={lander} />;
  }
  throw new Error(
    `LanderPage only renders situation landers. Got ${lander.kind}: ${lander.slug}`,
  );
}
