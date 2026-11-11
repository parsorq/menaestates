import Image from "next/image";
import { CITY_LANDER_PATHS } from "@/lib/landers";

export type CityTapeItem = {
  name: string;
  image: string;
  alt: string;
  objectPosition: string;
};

type CityTapeProps = {
  cities: readonly CityTapeItem[];
};

/** Matches tape CSS: ~1.25 across under 744px (swipe strip), ~4.25 across on larger. */
export const CITY_TAPE_IMAGE_SIZES = "(max-width: 743px) 78vw, 24vw";

/** First N primary tiles start immediately; clone stays lazy/low. */
export const CITY_TAPE_EAGER_COUNT = 2;

function CityTapeSet({
  cities,
  clone = false,
}: {
  cities: readonly CityTapeItem[];
  clone?: boolean;
}) {
  return (
    <ul
      className="me-city-tape__set"
      {...(clone ? { inert: true, "aria-hidden": true } : {})}
    >
      {cities.map((city, index) => {
        const href = CITY_LANDER_PATHS[city.name];
        const eager = !clone && index < CITY_TAPE_EAGER_COUNT;
        const body = (
          <>
            <Image
              className="me-city-card__image"
              src={city.image}
              alt={clone ? "" : city.alt}
              fill
              sizes={CITY_TAPE_IMAGE_SIZES}
              quality={75}
              loading={eager ? "eager" : "lazy"}
              fetchPriority={eager ? "high" : clone ? "low" : "auto"}
              decoding="async"
              style={{ objectPosition: city.objectPosition }}
            />
            <span className="me-city-card__name">{city.name}</span>
          </>
        );
        return (
          <li key={`${clone ? "clone-" : ""}${city.name}`} className="me-city-tape__item">
            {href ? (
              <a className="me-city-card" href={href} tabIndex={clone ? -1 : undefined}>
                {body}
              </a>
            ) : (
              <div className="me-city-card me-city-card--static">{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function CityTape({ cities }: CityTapeProps) {
  return (
    <div className="me-city-tape" role="region" aria-label="Cities we've bought in">
      <div className="me-city-tape__track">
        <CityTapeSet cities={cities} />
        <CityTapeSet cities={cities} clone />
      </div>
    </div>
  );
}
