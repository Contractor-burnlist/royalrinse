/**
 * The booking decision. Pure functions only: every number comes from
 * lib/rules.ts, so the UI and the unit tests always agree.
 */
import {
  ADD_ONS,
  BRONZE_TO_SILVER,
  CITY_ALIASES,
  CITY_NAMES,
  DRIVE_LIMIT_MIN,
  DRIVE_MATRIX,
  PACKAGES,
  PRICE_LIMIT,
  TECHS,
  type AddOn,
  type CityName,
  type Package,
  type Tech,
  type TechId,
} from "./rules";

/* ------------------------------------------------------------------------ */
/* Lookups                                                                  */
/* ------------------------------------------------------------------------ */

export function isCity(name: string): name is CityName {
  return (CITY_NAMES as readonly string[]).includes(name);
}

/** A city or alias name -> the listed city whose drive times it uses. */
export function resolvePlace(name: string): CityName | null {
  if (isCity(name)) return name;
  return CITY_ALIASES[name] ?? null;
}

/** Drive minutes from the matrix. Same city counts as 0. */
export function driveMinutes(from: CityName, to: CityName): number {
  if (from === to) return 0;
  return DRIVE_MATRIX[from][CITY_NAMES.indexOf(to)];
}

export function getPackage(id: string): Package | undefined {
  return PACKAGES.find((p) => p.id === id);
}

export function getTech(id: string): Tech | undefined {
  return TECHS.find((t) => t.id === id);
}

export function isBronze(pkg: Package): boolean {
  return pkg.id in BRONZE_TO_SILVER;
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
export function jobTotal(pkg: Package | undefined, addOnIds: string[] = []): number {
  const addOns = ADD_ONS.filter((a) => addOnIds.includes(a.id));
  return (pkg?.price ?? 0) + addOns.reduce((sum, a) => sum + a.price, 0);
}

/* ------------------------------------------------------------------------ */
/* Upsell                                                                   */
/* ------------------------------------------------------------------------ */

export interface UpsellOffer {
  from: Package;
  to: Package;
  difference: number;
}

export function upsellFor(pkg: Package): UpsellOffer | null {
  const toId = BRONZE_TO_SILVER[pkg.id];
  const to = toId ? getPackage(toId) : undefined;
  if (!to || pkg.price === null || to.price === null) return null;
  return { from: pkg, to, difference: to.price - pkg.price };
}

/* ------------------------------------------------------------------------ */
/* Best tech for a city                                                     */
/* ------------------------------------------------------------------------ */

export interface TechDrive {
  tech: Tech;
  homeCity: CityName;
  drive: number;
}

export interface BestTech {
  options: TechDrive[];
  /** null when two or more techs are equally close. */
  best: TechDrive | null;
}

/** Drive from every tech with a home city, closest first. */
export function bestTechFor(customerCity: CityName): BestTech {
  const options = TECHS.flatMap((tech) =>
    tech.homeCity
      ? [{ tech, homeCity: tech.homeCity, drive: driveMinutes(tech.homeCity, customerCity) }]
      : [],
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
  techId?: TechId;
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
  startCity: CityName;
  customerPlace: string;
  customerCity: CityName;
  drive: number;
  reason: string;
  /** Package notes, e.g. the ceramic note. */
  notes: string[];
  /** DON'T BOOK only: dollars still needed to reach PRICE_LIMIT. */
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

export function checkJob(input: JobInput): JobResult {
  let pkg = input.packageId ? getPackage(input.packageId) : undefined;
  if (!pkg) return { status: "incomplete", missing: ["package"] };
  if (pkg.askTim || pkg.price === null) {
    return { status: "ask-tim", message: pkg.askTim ?? "Ask Tim." };
  }

  const tech = input.techId ? getTech(input.techId) : undefined;
  if (tech && !tech.homeCity) {
    return { status: "ask-tim", message: tech.askTim ?? `Ask Tim before giving ${tech.name} a job.` };
  }

  // Step 1: a Bronze job always gets one upsell try before a result.
  let upgradedFrom: Package | undefined;
  const offer = upsellFor(pkg);
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
        : resolvePlace(input.start.place)
      : null;
  const customerCity = input.customerPlace ? resolvePlace(input.customerPlace) : null;

  const missing: MissingField[] = [];
  if (!tech) missing.push("tech");
  if (tech && !startCity) missing.push("start");
  if (!customerCity) missing.push("customer");
  if (!tech || !startCity || !customerCity || !input.customerPlace) {
    return { status: "incomplete", missing };
  }

  // Step 2: total = package + add-ons.
  const addOns = ADD_ONS.filter((a) => input.addOnIds?.includes(a.id));
  const total = jobTotal(pkg, input.addOnIds);
  const drive = driveMinutes(startCity, customerCity);
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
  if (total >= PRICE_LIMIT) {
    // Step 3: big jobs can go any distance.
    decision = {
      ...base,
      status: "book",
      reason: `${formatMoney(PRICE_LIMIT)} or more can go any distance.`,
    };
  } else if (drive <= DRIVE_LIMIT_MIN) {
    // Step 4: small jobs must be close.
    decision = { ...base, status: "book", reason: `Under ${DRIVE_LIMIT_MIN} minutes.` };
  } else {
    // Step 5: too far for the price.
    const shortfall = PRICE_LIMIT - total;
    decision = {
      ...base,
      status: "dont-book",
      reason: `${drive} min is over ${DRIVE_LIMIT_MIN} minutes and the job is under ${formatMoney(PRICE_LIMIT)}.`,
      shortfall,
      gapAddOns: ADD_ONS.filter((a) => !input.addOnIds?.includes(a.id) && a.price >= shortfall).sort(
        (a, b) => a.price - b.price,
      ),
    };
  }

  return { ...decision, jobNote: buildJobNote(decision) };
}

/** Customer place as written in notes: "Winchester (Menifee)" for aliases. */
export function placeLabel(place: string, city: CityName): string {
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
