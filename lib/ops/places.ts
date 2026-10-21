import { CITY_ALIASES, CITY_NAMES, type CityName } from "./rules";

export interface PlaceOption {
  /** What the checker receives: a city or alias name. */
  value: string;
  /** What the VA sees, e.g. "Winchester (uses Menifee)". */
  label: string;
  city: CityName;
}

/** Every listed city, then every alias in A to Z order. Built from lib/rules.ts. */
export const PLACE_OPTIONS: PlaceOption[] = [
  ...CITY_NAMES.map((city) => ({ value: city, label: city, city })),
  ...Object.entries(CITY_ALIASES)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([alias, city]) => ({ value: alias, label: `${alias} (uses ${city})`, city })),
];

export function placeOptionLabel(value: string): string {
  return PLACE_OPTIONS.find((p) => p.value === value)?.label ?? "";
}
