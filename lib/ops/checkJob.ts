import "server-only";
import * as engine from "./engine";
import { RULES } from "./rules";

/**
 * The booking engine bound to the real rules in lib/ops/rules.ts. SERVER
 * ONLY: the unit tests and the server-rendered SOP text use this. The /ops
 * page runs the same engine in the browser on the data from /ops/api/data,
 * so both always agree.
 */
export type {
  BestTech,
  Decision,
  JobInput,
  JobResult,
  MissingField,
  NearbyCity,
  SlotCheck,
  StartPoint,
  UpsellOffer,
} from "./engine";

export const checkJob = (input: engine.JobInput) => engine.checkJob(RULES, input);
export const resolvePlace = (name: string) => engine.resolvePlace(RULES, name);
export const bestTechFor = (city: string) => engine.bestTechFor(RULES, city);
export const driveMinutes = (from: string, to: string) => engine.driveMinutes(RULES, from, to);
export const nearbyCities = (customerPlace: string) => engine.nearbyCities(RULES, customerPlace);
export const checkSlot = (jobPlace: string, customerPlace: string) => engine.checkSlot(RULES, jobPlace, customerPlace);
