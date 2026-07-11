export type City = {
  slug: string;
  name: string;
  county: "Riverside" | "San Diego";
};

export const cities: City[] = [
  { slug: "menifee", name: "Menifee", county: "Riverside" },
  { slug: "temecula", name: "Temecula", county: "Riverside" },
  { slug: "murrieta", name: "Murrieta", county: "Riverside" },
  { slug: "wildomar", name: "Wildomar", county: "Riverside" },
  { slug: "lake-elsinore", name: "Lake Elsinore", county: "Riverside" },
  { slug: "canyon-lake", name: "Canyon Lake", county: "Riverside" },
  { slug: "perris", name: "Perris", county: "Riverside" },
  { slug: "hemet", name: "Hemet", county: "Riverside" },
  { slug: "corona", name: "Corona", county: "Riverside" },
  { slug: "riverside", name: "Riverside", county: "Riverside" },
  { slug: "moreno-valley", name: "Moreno Valley", county: "Riverside" },
  { slug: "escondido", name: "Escondido", county: "San Diego" },
  { slug: "san-marcos", name: "San Marcos", county: "San Diego" },
  { slug: "carlsbad", name: "Carlsbad", county: "San Diego" },
  { slug: "vista", name: "Vista", county: "San Diego" },
  { slug: "oceanside", name: "Oceanside", county: "San Diego" },
  { slug: "poway", name: "Poway", county: "San Diego" },
];

/** Featured in the footer and homepage teaser (closest / highest-value). */
export const featuredCitySlugs = [
  "menifee",
  "temecula",
  "murrieta",
  "riverside",
  "corona",
  "escondido",
];

export const featuredCities: City[] = featuredCitySlugs
  .map((slug) => cities.find((city) => city.slug === slug))
  .filter((city): city is City => Boolean(city));

export const counties = ["Riverside", "San Diego"] as const;

export function citiesInCounty(county: City["county"]): City[] {
  return cities.filter((city) => city.county === county);
}

export function getCity(slug: string): City | undefined {
  return cities.find((city) => city.slug === slug);
}
