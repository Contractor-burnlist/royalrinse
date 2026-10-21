import { describe, expect, it } from "vitest";
import { bestTechFor, checkJob, resolvePlace, type Decision, type JobResult } from "./checkJob";
import * as engine from "./engine";
import { CITY_NAMES, DRIVE_MATRIX, PRICE_LIMIT, RULES } from "./rules";

function decided(result: JobResult): Decision {
  if (result.status !== "book" && result.status !== "dont-book") {
    throw new Error(`Expected a decision, got ${result.status}`);
  }
  return result;
}

describe("required scenarios", () => {
  it("Bronze Sedan $95, no upgrade, Luna from Murrieta job, customer Temecula -> BOOK (15 min)", () => {
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
    expect(r.total).toBe(95);
    expect(r.drive).toBe(15);
  });

  it("Bronze SUV $110, no upgrade, Andre from home, customer Corona -> BOOK (20 min)", () => {
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
    expect(r.total).toBe(110);
    expect(r.drive).toBe(20);
  });

  it("Bronze SUV $110, no upgrade, Luna from home, customer Hemet -> DON'T BOOK (40 min), shortfall $65", () => {
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
    expect(r.shortfall).toBe(65);
    expect(r.gapAddOns?.every((a) => a.price >= 65)).toBe(true);
    expect(r.gapAddOns?.map((a) => a.name)).toContain("Ozone Treatment");
  });

  it("Bronze Sedan Full Detail $149, upgraded to Silver, Luna from home, customer Escondido -> BOOK ($175)", () => {
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
    expect(r.total).toBe(175);
    expect(r.reason).toBe("$175 or more can go any distance.");
  });

  it("Express Wash $85, Luna from home, customer Menifee -> BOOK (25 min)", () => {
    const r = decided(
      checkJob({
        packageId: "express-wash",
        techId: "luna",
        start: { kind: "home" },
        customerPlace: "Menifee",
      }),
    );
    expect(r.status).toBe("book");
    expect(r.total).toBe(85);
    expect(r.drive).toBe(25);
    expect(r.reason).toBe("Under 30 minutes.");
  });

  it("Silver SUV $225, Andre from home, customer Hemet -> BOOK (any distance)", () => {
    const r = decided(
      checkJob({
        packageId: "silver-suv",
        techId: "andre",
        start: { kind: "home" },
        customerPlace: "Hemet",
      }),
    );
    expect(r.status).toBe("book");
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
  it("asks for the Silver upsell before any Bronze result", () => {
    const r = checkJob({
      packageId: "bronze-sedan-inside",
      techId: "luna",
      start: { kind: "home" },
      customerPlace: "Temecula",
    });
    expect(r.status).toBe("upsell");
    if (r.status === "upsell") {
      expect(r.offer.to.name).toBe("Silver Sedan");
      expect(r.offer.difference).toBe(80);
    }
  });

  it("uses the mapped Silver and the right difference for every Bronze", () => {
    const cases: [string, string, number][] = [
      ["bronze-sedan-outside", "Silver Sedan", 80],
      ["bronze-sedan-full", "Silver Sedan", 26],
      ["bronze-suv-inside", "Silver SUV / Truck", 115],
      ["bronze-truck-outside", "Silver SUV / Truck", 115],
      ["bronze-truck-full", "Silver SUV / Truck", 50],
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
    expect(r.total).toBe(PRICE_LIMIT);
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
    expect(r.shortfall).toBe(50);
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
      "Bronze Sedan, inside only $95. Luna from Murrieta to Winchester (Menifee), 20 min.\nBOOK: Under 30 minutes.",
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
