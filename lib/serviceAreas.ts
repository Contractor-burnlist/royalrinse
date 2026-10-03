export type City = {
  slug: string;
  name: string;
  county: "Riverside" | "San Diego";
};

/**
 * ORDER MATTERS: this is the order cities appear in on the service-area hub
 * and in every list built from it. The five priority markets lead their
 * county (Menifee, Temecula, Murrieta and Riverside in Riverside County; San
 * Diego in San Diego County); everything else follows.
 */
export const cities: City[] = [
  { slug: "menifee", name: "Menifee", county: "Riverside" },
  { slug: "temecula", name: "Temecula", county: "Riverside" },
  { slug: "murrieta", name: "Murrieta", county: "Riverside" },
  { slug: "riverside", name: "Riverside", county: "Riverside" },
  { slug: "wildomar", name: "Wildomar", county: "Riverside" },
  { slug: "lake-elsinore", name: "Lake Elsinore", county: "Riverside" },
  { slug: "canyon-lake", name: "Canyon Lake", county: "Riverside" },
  { slug: "perris", name: "Perris", county: "Riverside" },
  { slug: "hemet", name: "Hemet", county: "Riverside" },
  { slug: "corona", name: "Corona", county: "Riverside" },
  { slug: "moreno-valley", name: "Moreno Valley", county: "Riverside" },
  { slug: "san-diego", name: "San Diego", county: "San Diego" },
  { slug: "escondido", name: "Escondido", county: "San Diego" },
  { slug: "la-jolla", name: "La Jolla", county: "San Diego" },
  { slug: "san-marcos", name: "San Marcos", county: "San Diego" },
  { slug: "carlsbad", name: "Carlsbad", county: "San Diego" },
  { slug: "vista", name: "Vista", county: "San Diego" },
  { slug: "oceanside", name: "Oceanside", county: "San Diego" },
  { slug: "poway", name: "Poway", county: "San Diego" },
];

/**
 * The five PRIORITY markets, in priority order: Menifee (home base), Temecula,
 * Murrieta, Riverside, San Diego. They lead the footer, the homepage, the
 * FAQ, the fact block and the schema areaServed list. Each has a dedicated,
 * hand-written page in lib/cityPages.ts.
 *
 * La Jolla and Escondido also have hand-written pages; they stay live but are
 * SECONDARY and are not featured ahead of these five anywhere.
 */
export const priorityCitySlugs = [
  "menifee",
  "temecula",
  "murrieta",
  "riverside",
  "san-diego",
] as const;

export const priorityCities: City[] = priorityCitySlugs
  .map((slug) => cities.find((city) => city.slug === slug))
  .filter((city): city is City => Boolean(city));

/** Every other city we serve, in list order. */
export const secondaryCities: City[] = cities.filter(
  (city) => !(priorityCitySlugs as readonly string[]).includes(city.slug),
);

/** Featured in the footer and homepage: the five priority markets. */
export const featuredCities: City[] = priorityCities;

export const counties = ["Riverside", "San Diego"] as const;

export function citiesInCounty(county: City["county"]): City[] {
  return cities.filter((city) => city.county === county);
}

export function getCity(slug: string): City | undefined {
  return cities.find((city) => city.slug === slug);
}
