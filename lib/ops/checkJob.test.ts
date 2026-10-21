import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  bestTechFor,
  checkJob,
  checkSlot,
  nearbyCities,
  resolvePlace,
  type Decision,
  type JobResult,
} from "./checkJob";
import * as engine from "./engine";
import { CITY_NAMES, DRIVE_LIMIT_MIN, DRIVE_MATRIX, PRICE_LIMIT, RULES } from "./rules";

function decided(result: JobResult): Decision {
  if (result.status !== "book" && result.status !== "dont-book") {
    throw new Error(`Expected a decision, got ${result.status}`);
  }
  return result;
}

describe("required scenarios", () => {
  it("Bronze Sedan $98, kept Bronze, Luna from Murrieta job, customer Temecula -> BOOK (15 min)", () => {
    const r = decided(
      checkJob({
        packageId: "bronze-sedan-inside",
        techId: "luna",
        start: { kind: "job", place: "Murrieta" },
        customerPlace: "Temecula",
        upsellAnswer: "no",
      }),
    );
    expect(r.status).toBe("book");
    expect(r.total).toBe(98);
    expect(r.drive).toBe(15);
  });

  it("Bronze SUV $113, kept Bronze, Andre from home, customer Corona -> BOOK (20 min)", () => {
    const r = decided(
      checkJob({
        packageId: "bronze-suv-inside",
        techId: "andre",
        start: { kind: "home" },
        customerPlace: "Corona",
        upsellAnswer: "no",
      }),
    );
    expect(r.status).toBe("book");
    expect(r.total).toBe(113);
    expect(r.drive).toBe(20);
  });

  it("Bronze SUV $113, kept Bronze, Luna from home, customer Hemet -> DON'T BOOK (40 min), shortfall $62", () => {
    const r = decided(
      checkJob({
        packageId: "bronze-suv-inside",
        techId: "luna",
        start: { kind: "home" },
        customerPlace: "Hemet",
        upsellAnswer: "no",
      }),
    );
    expect(r.status).toBe("dont-book");
    expect(r.drive).toBe(40);
    expect(r.shortfall).toBe(62);
    expect(r.gapAddOns?.every((a) => a.price >= 65)).toBe(true);
    expect(r.gapAddOns?.map((a) => a.name)).toContain("Ozone Treatment");
  });

  it("Bronze Sedan Full Detail $153, upgraded to Silver ($180), Luna from home, customer Escondido -> BOOK", () => {
    const r = decided(
      checkJob({
        packageId: "bronze-sedan-full",
        techId: "luna",
        start: { kind: "home" },
        customerPlace: "Escondido",
        upsellAnswer: "yes",
      }),
    );
    expect(r.status).toBe("book");
    expect(r.pkg.name).toBe("Silver Sedan");
    expect(r.upgradedFrom?.name).toBe("Bronze Sedan Full Detail");
    expect(r.total).toBe(180);
    expect(r.reason).toBe("$175 or more can go any distance.");
  });

  it("Express Wash $88, Luna from home, customer Menifee -> BOOK (25 min)", () => {
    const r = decided(
      checkJob({
        packageId: "express-wash",
        techId: "luna",
        start: { kind: "home" },
        customerPlace: "Menifee",
      }),
    );
    expect(r.status).toBe("book");
    expect(r.total).toBe(88);
    expect(r.drive).toBe(25);
    expect(r.reason).toBe("Under 30 minutes.");
  });

  it("Silver SUV $232, Andre from home, customer Hemet -> BOOK (any distance)", () => {
    const r = decided(
      checkJob({
        packageId: "silver-suv",
        techId: "andre",
        start: { kind: "home" },
        customerPlace: "Hemet",
      }),
    );
    expect(r.status).toBe("book");
    expect(r.total).toBe(232);
    expect(r.drive).toBe(55);
    expect(r.reason).toBe("$175 or more can go any distance.");
  });

  it('Customer "Winchester" resolves to Menifee', () => {
    expect(resolvePlace("Winchester")).toBe("Menifee");
  });

  it('a tech with no home city -> no result, shows "Ask Tim"', () => {
    const data = { ...RULES, techs: [...RULES.techs, { id: "new", name: "Sam", homeCity: null, coverage: [] }] };
    const r = engine.checkJob(data, {
      packageId: "silver-sedan",
      techId: "new",
      start: { kind: "home" },
      customerPlace: "Riverside",
    });
    expect(r).toEqual({ status: "ask-tim", message: "Ask Tim before giving Sam a job." });
  });
});

describe("removed", () => {
  it("Kevin is no longer a tech", () => {
    expect(RULES.techs.map((t) => t.name)).toEqual(["Andre", "Luna"]);
  });

  it("San Diego coast and its areas are no longer offered", () => {
    for (const place of [
      "San Diego coast",
      "La Jolla",
      "Del Mar",
      "Carmel Valley",
      "Rancho Santa Fe",
      "Pacific Beach",
    ]) {
      expect(resolvePlace(place), place).toBeNull();
    }
  });
});

describe("other rules", () => {
  it("Upsell difference Bronze Sedan inside only -> Silver Sedan = $82, asked before any Bronze result", () => {
    const r = checkJob({
      packageId: "bronze-sedan-inside",
      techId: "luna",
      start: { kind: "home" },
      customerPlace: "Temecula",
    });
    expect(r.status).toBe("upsell");
    if (r.status === "upsell") {
      expect(r.offer.to.name).toBe("Silver Sedan");
      expect(r.offer.difference).toBe(82);
    }
  });

  it("uses the mapped Silver and the right difference for every Bronze", () => {
    const cases: [string, string, number][] = [
      ["bronze-sedan-outside", "Silver Sedan", 82],
      ["bronze-sedan-full", "Silver Sedan", 27],
      ["bronze-suv-inside", "Silver SUV / Truck", 119],
      ["bronze-truck-outside", "Silver SUV / Truck", 119],
      ["bronze-truck-full", "Silver SUV / Truck", 52],
    ];
    for (const [packageId, silver, diff] of cases) {
      const r = checkJob({ packageId });
      expect(r.status).toBe("upsell");
      if (r.status === "upsell") {
        expect(r.offer.to.name).toBe(silver);
        expect(r.offer.difference).toBe(diff);
      }
    }
  });

  it("adds add-ons to the total and can pass the price limit", () => {
    const r = decided(
      checkJob({
        packageId: "bronze-suv-inside",
        addOnIds: ["ozone"],
        techId: "luna",
        start: { kind: "home" },
        customerPlace: "Hemet",
        upsellAnswer: "no",
      }),
    );
    // $113 + $67 = $180, over the $175 limit.
    expect(r.total).toBe(180);
    expect(r.total).toBeGreaterThanOrEqual(PRICE_LIMIT);
    expect(r.status).toBe("book");
  });

  it("does not suggest add-ons that are already selected", () => {
    const r = decided(
      checkJob({
        packageId: "express-wash",
        addOnIds: ["pet-hair"],
        techId: "andre",
        start: { kind: "home" },
        customerPlace: "Escondido",
      }),
    );
    expect(r.status).toBe("dont-book");
    // $88 + $41 = $129, so $46 short of $175.
    expect(r.shortfall).toBe(46);
    expect(r.gapAddOns?.some((a) => a.id === "pet-hair")).toBe(false);
  });

  it("counts the same start and customer city as 0 minutes", () => {
    const r = decided(
      checkJob({
        packageId: "express-wash",
        techId: "luna",
        start: { kind: "job", place: "French Valley" },
        customerPlace: "Murrieta",
      }),
    );
    expect(r.drive).toBe(0);
  });

  it("ceramic always passes the price limit and carries the note", () => {
    const r = decided(
      checkJob({
        packageId: "ceramic",
        techId: "andre",
        start: { kind: "home" },
        customerPlace: "Escondido",
      }),
    );
    expect(r.status).toBe("book");
    expect(r.notes).toContain("Ceramic jobs: confirm details with Tim.");
  });

  it("RV jobs go to Tim", () => {
    const r = checkJob({ packageId: "rv", techId: "andre", start: { kind: "home" }, customerPlace: "Corona" });
    expect(r).toEqual({ status: "ask-tim", message: "RV jobs: ask Tim." });
  });

  it("reports what is missing", () => {
    expect(checkJob({})).toEqual({ status: "incomplete", missing: ["package"] });
    expect(checkJob({ packageId: "silver-sedan" })).toEqual({
      status: "incomplete",
      missing: ["tech", "customer"],
    });
    expect(checkJob({ packageId: "silver-sedan", techId: "andre", start: { kind: "job", place: "" } })).toEqual({
      status: "incomplete",
      missing: ["start", "customer"],
    });
  });

  it("writes the job note in the Housecall Pro format", () => {
    const r = decided(
      checkJob({
        packageId: "bronze-sedan-inside",
        techId: "luna",
        start: { kind: "job", place: "Murrieta" },
        customerPlace: "Winchester",
        upsellAnswer: "no",
      }),
    );
    expect(r.jobNote).toBe(
      "Bronze Sedan, inside only $98. Luna from Murrieta to Winchester (Menifee), 20 min.\nBOOK: Under 30 minutes.",
    );
  });

  it("recommends the closer tech, and no one on a tie", () => {
    expect(bestTechFor("Corona").best?.tech.name).toBe("Andre");
    expect(bestTechFor("Escondido").best?.tech.name).toBe("Luna");
    // Riverside to Hemet is 55 and Temecula to Hemet is 40.
    expect(bestTechFor("Hemet").best?.tech.name).toBe("Luna");
  });
});

describe("drive matrix", () => {
  it("has one row per city and one column per city", () => {
    for (const city of CITY_NAMES) expect(DRIVE_MATRIX[city]).toHaveLength(CITY_NAMES.length);
  });

  it("is symmetric", () => {
    CITY_NAMES.forEach((a, i) =>
      CITY_NAMES.forEach((b, j) => expect(DRIVE_MATRIX[a][j], `${a} to ${b}`).toBe(DRIVE_MATRIX[b][i])),
    );
  });
});

describe("nearby jobs and follow-up", () => {
  it("Nearby finder for Temecula returns Murrieta 15 first, never over the drive limit", () => {
    const list = nearbyCities("Temecula");
    expect(list[0]).toEqual({ city: "Murrieta", drive: 15 });
    expect(list.map((n) => `${n.city} ${n.drive}`)).toEqual([
      "Murrieta 15",
      "Wildomar 20",
      "Menifee 25",
      "Lake Elsinore 25",
      "Fallbrook 25",
      "Perris 30",
    ]);
    for (const city of CITY_NAMES) {
      for (const n of nearbyCities(city)) expect(n.drive, `${n.city} to ${city}`).toBeLessThanOrEqual(DRIVE_LIMIT_MIN);
    }
  });

  it("Nearby finder works for aliases and skips the customer's own city", () => {
    expect(nearbyCities("Winchester").map((n) => n.city)).not.toContain("Menifee");
    expect(nearbyCities("Winchester")[0]).toEqual({ city: "Perris", drive: 15 });
  });

  it("Follow-up slot from Murrieta job to Temecula customer: valid (15)", () => {
    expect(checkSlot("Murrieta", "Temecula")).toEqual({ status: "ok", drive: 15 });
  });

  it("Follow-up slot from Riverside job to Temecula customer: warning (55)", () => {
    expect(checkSlot("Riverside", "Temecula")).toEqual({ status: "too-far", drive: 55 });
  });

  it("Follow-up slot without both cities is incomplete", () => {
    expect(checkSlot("", "Temecula")).toEqual({ status: "incomplete" });
  });
});

describe("no card fee", () => {
  it('No "Convenience Fee", "card fee", or "surcharge" anywhere in app/ops or lib/ops', () => {
    const root = fileURLToPath(new URL("../../", import.meta.url));
    const self = fileURLToPath(import.meta.url);
    const files = (dir: string): string[] =>
      readdirSync(dir).flatMap((name) => {
        const path = join(dir, name);
        return statSync(path).isDirectory() ? files(path) : [path];
      });
    const banned = [/convenience fee/i, /card fee/i, /surcharge/i];
    const hits = [...files(join(root, "app/ops")), ...files(join(root, "lib/ops"))]
      .filter((f) => f !== self && /\.(tsx?|css|json)$/.test(f))
      .flatMap((f) => banned.filter((re) => re.test(readFileSync(f, "utf8"))).map((re) => `${f}: ${re}`));
    expect(hits).toEqual([]);
  });
});
