/**
 * The booking decision, as pure functions over a RulesData object.
 *
 * This file holds NO prices, cities or drive times: every number comes in as
 * `data`. On the server that is RULES from lib/ops/rules.ts (see checkJob.ts);
 * in the browser it is the JSON from the password-protected /ops/api/data.
 * That is why this file may be bundled for the client and rules.ts may not.
 */

/* ------------------------------------------------------------------------ */
/* Data shape                                                               */
/* ------------------------------------------------------------------------ */

/** [lat, lng] */
export type LatLng = [number, number];

/** A circle on the map: where a tech usually works. Not the drive limit. */
export interface CoverageCircle {
  center: LatLng;
  radiusMiles: number;
}

export interface Tech {
  id: string;
  name: string;
  /** null = not set yet. The checker will not give this tech a result. */
  homeCity: string | null;
  /** Shown instead of a result when homeCity is null. */
  askTim?: string;
  /** Circles are joined into one zone on the map. */
  coverage: CoverageCircle[];
  /** Map only: home label above the pin (default is below). */
  mapLabelAbove?: boolean;
}

export interface Package {
  id: string;
  name: string;
  /** null = no price check (the job always goes to Tim). */
  price: number | null;
  /** true = price is a minimum, shown as "$249 or more". */
  priceFrom?: boolean;
  group: string;
  /** Shown with the result. */
  note?: string;
  /** Shown instead of a result. */
  askTim?: string;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
}

export interface RulesData {
  /** Max drive (minutes) for jobs under the price limit. */
  driveLimitMin: number;
  /** Jobs at or above this total (dollars) can go any distance. */
  priceLimit: number;
  /** Row and column order of driveMatrix. */
  cityNames: string[];
  cityCoords: Record<string, LatLng>;
  /** Alias -> the listed city whose drive times it uses. */
  cityAliases: Record<string, string>;
  /** Map only: cities whose name goes on the left of the dot. */
  mapLabelLeft: string[];
  /** Start city -> minutes to each city, in cityNames order. */
  driveMatrix: Record<string, number[]>;
  techs: Tech[];
  packageGroups: string[];
  packages: Package[];
  addOns: AddOn[];
  /** Bronze package id -> the Silver package to offer. */
  bronzeToSilver: Record<string, string>;
}

/* ------------------------------------------------------------------------ */
/* Lookups                                                                  */
/* ------------------------------------------------------------------------ */

/** A city or alias name -> the listed city whose drive times it uses. */
export function resolvePlace(data: RulesData, name: string): string | null {
  if (data.cityNames.includes(name)) return name;
  return data.cityAliases[name] ?? null;
}

/** Drive minutes from the matrix. Same city counts as 0. */
export function driveMinutes(data: RulesData, from: string, to: string): number {
  if (from === to) return 0;
  return data.driveMatrix[from][data.cityNames.indexOf(to)];
}

export function getPackage(data: RulesData, id: string): Package | undefined {
  return data.packages.find((p) => p.id === id);
}

export function getTech(data: RulesData, id: string): Tech | undefined {
  return data.techs.find((t) => t.id === id);
}

export function formatMoney(dollars: number): string {
  return `$${dollars}`;
}

/** "$95", "$249 or more", or "No price check". */
export function priceLabel(pkg: Package): string {
  if (pkg.price === null) return "No price check";
  return pkg.priceFrom ? `${formatMoney(pkg.price)} or more` : formatMoney(pkg.price);
}

/** Package price plus the selected add-ons. */
export function jobTotal(data: RulesData, pkg: Package | undefined, addOnIds: string[] = []): number {
  const addOns = data.addOns.filter((a) => addOnIds.includes(a.id));
  return (pkg?.price ?? 0) + addOns.reduce((sum, a) => sum + a.price, 0);
}

export interface PlaceOption {
  /** What the checker receives: a city or alias name. */
  value: string;
  /** What the VA sees, e.g. "Winchester (uses Menifee)". */
  label: string;
  city: string;
}

/** Every listed city, then every alias in A to Z order. */
export function placeOptions(data: RulesData): PlaceOption[] {
  return [
    ...data.cityNames.map((city) => ({ value: city, label: city, city })),
    ...Object.entries(data.cityAliases)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([alias, city]) => ({ value: alias, label: `${alias} (uses ${city})`, city })),
  ];
}

/* ------------------------------------------------------------------------ */
/* Upsell                                                                   */
/* ------------------------------------------------------------------------ */

export interface UpsellOffer {
  from: Package;
  to: Package;
  difference: number;
}

export function upsellFor(data: RulesData, pkg: Package): UpsellOffer | null {
  const toId = data.bronzeToSilver[pkg.id];
  const to = toId ? getPackage(data, toId) : undefined;
  if (!to || pkg.price === null || to.price === null) return null;
  return { from: pkg, to, difference: to.price - pkg.price };
}

/* ------------------------------------------------------------------------ */
/* Best tech for a city                                                     */
/* ------------------------------------------------------------------------ */

export interface TechDrive {
  tech: Tech;
  homeCity: string;
  drive: number;
}

export interface BestTech {
  options: TechDrive[];
  /** null when two or more techs are equally close. */
  best: TechDrive | null;
}

/** Drive from every tech with a home city, closest first. */
export function bestTechFor(data: RulesData, customerCity: string): BestTech {
  const options = data.techs.flatMap((tech) =>
    tech.homeCity ? [{ tech, homeCity: tech.homeCity, drive: driveMinutes(data, tech.homeCity, customerCity) }] : [],
  );
  const sorted = [...options].sort((a, b) => a.drive - b.drive);
  const tie = sorted.length > 1 && sorted[0].drive === sorted[1].drive;
  return { options, best: sorted.length && !tie ? sorted[0] : null };
}

/* ------------------------------------------------------------------------ */
/* The check                                                                */
/* ------------------------------------------------------------------------ */

export type StartPoint =
  /** First job of the day: the tech leaves from home. */
  | { kind: "home" }
  /** The tech already has a job that day in this city or alias. */
  | { kind: "job"; place: string };

export interface JobInput {
  packageId?: string;
  addOnIds?: string[];
  techId?: string;
  start?: StartPoint;
  /** City or alias name. */
  customerPlace?: string;
  /** Answer to the Bronze to Silver offer. Required before a Bronze result. */
  upsellAnswer?: "yes" | "no";
}

export type MissingField = "package" | "tech" | "start" | "customer";

export interface Decision {
  status: "book" | "dont-book";
  /** The package actually booked (Silver if the customer said yes). */
  pkg: Package;
  /** Set when the customer took the Silver upgrade. */
  upgradedFrom?: Package;
  addOns: AddOn[];
  total: number;
  tech: Tech;
  startCity: string;
  customerPlace: string;
  customerCity: string;
  drive: number;
  reason: string;
  /** Package notes, e.g. the ceramic note. */
  notes: string[];
  /** DON'T BOOK only: dollars still needed to reach the price limit. */
  shortfall?: number;
  /** DON'T BOOK only: unselected add-ons that close the gap on their own. */
  gapAddOns?: AddOn[];
  jobNote: string;
}

export type JobResult =
  | { status: "incomplete"; missing: MissingField[] }
  | { status: "ask-tim"; message: string }
  | { status: "upsell"; offer: UpsellOffer }
  | Decision;

export function checkJob(data: RulesData, input: JobInput): JobResult {
  let pkg = input.packageId ? getPackage(data, input.packageId) : undefined;
  if (!pkg) return { status: "incomplete", missing: ["package"] };
  if (pkg.askTim || pkg.price === null) {
    return { status: "ask-tim", message: pkg.askTim ?? "Ask Tim." };
  }

  const tech = input.techId ? getTech(data, input.techId) : undefined;
  if (tech && !tech.homeCity) {
    return { status: "ask-tim", message: tech.askTim ?? `Ask Tim before giving ${tech.name} a job.` };
  }

  // Step 1: a Bronze job always gets one upsell try before a result.
  let upgradedFrom: Package | undefined;
  const offer = upsellFor(data, pkg);
  if (offer) {
    if (!input.upsellAnswer) return { status: "upsell", offer };
    if (input.upsellAnswer === "yes") {
      upgradedFrom = pkg;
      pkg = offer.to;
    }
  }

  const startCity =
    tech?.homeCity && input.start
      ? input.start.kind === "home"
        ? tech.homeCity
        : resolvePlace(data, input.start.place)
      : null;
  const customerCity = input.customerPlace ? resolvePlace(data, input.customerPlace) : null;

  const missing: MissingField[] = [];
  if (!tech) missing.push("tech");
  if (tech && !startCity) missing.push("start");
  if (!customerCity) missing.push("customer");
  if (!tech || !startCity || !customerCity || !input.customerPlace) {
    return { status: "incomplete", missing };
  }

  // Step 2: total = package + add-ons.
  const addOns = data.addOns.filter((a) => input.addOnIds?.includes(a.id));
  const total = jobTotal(data, pkg, input.addOnIds);
  const drive = driveMinutes(data, startCity, customerCity);
  const notes = pkg.note ? [pkg.note] : [];

  const base = {
    pkg,
    upgradedFrom,
    addOns,
    total,
    tech,
    startCity,
    customerPlace: input.customerPlace,
    customerCity,
    drive,
    notes,
  };

  let decision: Omit<Decision, "jobNote">;
  if (total >= data.priceLimit) {
    // Step 3: big jobs can go any distance.
    decision = {
      ...base,
      status: "book",
      reason: `${formatMoney(data.priceLimit)} or more can go any distance.`,
    };
  } else if (drive <= data.driveLimitMin) {
    // Step 4: small jobs must be close.
    decision = { ...base, status: "book", reason: `Under ${data.driveLimitMin} minutes.` };
  } else {
    // Step 5: too far for the price.
    const shortfall = data.priceLimit - total;
    decision = {
      ...base,
      status: "dont-book",
      reason: `${drive} min is over ${data.driveLimitMin} minutes and the job is under ${formatMoney(data.priceLimit)}.`,
      shortfall,
      gapAddOns: data.addOns
        .filter((a) => !input.addOnIds?.includes(a.id) && a.price >= shortfall)
        .sort((a, b) => a.price - b.price),
    };
  }

  return { ...decision, jobNote: buildJobNote(decision) };
}

/** Customer place as written in notes: "Winchester (Menifee)" for aliases. */
export function placeLabel(place: string, city: string): string {
  return place === city ? city : `${place} (${city})`;
}

/**
 * The note the VA pastes into Housecall Pro:
 * "[Package] $[total]. [Tech] from [start] to [customer], [drive] min.
 *  [BOOK / DON'T BOOK]: [reason]."
 */
export function buildJobNote(d: Omit<Decision, "jobNote">): string {
  const items = [d.pkg.name, ...d.addOns.map((a) => a.name)].join(" + ");
  const verdict = d.status === "book" ? "BOOK" : "DON'T BOOK";
  return (
    `${items} ${formatMoney(d.total)}. ` +
    `${d.tech.name} from ${d.startCity} to ${placeLabel(d.customerPlace, d.customerCity)}, ${d.drive} min.\n` +
    `${verdict}: ${d.reason}`
  );
}
