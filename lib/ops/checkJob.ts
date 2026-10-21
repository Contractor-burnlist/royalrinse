import "server-only";
import * as engine from "./engine";
import { RULES } from "./rules";

/**
 * The booking decision bound to the real rules in lib/ops/rules.ts. SERVER
 * ONLY: the unit tests and any server code use this. The /ops page runs the
 * same engine in the browser on the data from /ops/api/data, so both always
 * agree.
 */
export type { BestTech, Decision, JobInput, JobResult, MissingField, StartPoint, UpsellOffer } from "./engine";

export const checkJob = (input: engine.JobInput) => engine.checkJob(RULES, input);
export const resolvePlace = (name: string) => engine.resolvePlace(RULES, name);
export const bestTechFor = (city: string) => engine.bestTechFor(RULES, city);
