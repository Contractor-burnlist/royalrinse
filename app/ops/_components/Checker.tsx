"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import {
  checkJob,
  driveMinutes,
  formatMoney,
  getPackage,
  getTech,
  jobTotal,
  placeOptions,
  priceLabel,
  resolvePlace,
  upsellFor,
  type RulesData,
} from "@/lib/ops/engine";
import { PlaceCombobox } from "./PlaceCombobox";
import { ResultPanel } from "./ResultPanel";

// Leaflet needs the browser, so the map never renders on the server.
const CoverageMap = dynamic(() => import("./CoverageMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] items-center justify-center bg-ops-ink text-slate-300 lg:h-[560px]">
      Loading map...
    </div>
  ),
});

const CARD = "rounded-2xl border border-ops-line bg-white p-5 shadow-sm sm:p-6";
const STEP = "text-xl font-bold";
const SELECT =
  "mt-2 w-full rounded-xl border border-ops-line bg-white px-4 py-3 text-base shadow-sm focus-visible:border-ops-primary";
/** A radio or checkbox drawn as a card: the input stays real for keyboards and screen readers. */
const CHOICE =
  "flex cursor-pointer rounded-xl border-2 border-ops-line bg-white transition-colors hover:border-ops-primary has-[:checked]:border-ops-primary has-[:checked]:bg-ops-primary-soft has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ops-primary";

/**
 * Loads the rules and prices from the password-protected /ops/api/data, so
 * none of them are ever in the JS bundle, then shows the checker.
 */
export function Checker() {
  const [data, setData] = useState<RulesData | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let live = true;
    fetch("/ops/api/data", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json() as Promise<RulesData>;
      })
      .then((json) => live && setData(json))
      .catch(() => live && setFailed(true));
    return () => {
      live = false;
    };
  }, []);

  if (failed) {
    return (
      <p role="alert" className={`${CARD} text-lg font-semibold text-ops-stop`}>
        Could not load the checker. Refresh the page. If it still does not work, ask Tim.
      </p>
    );
  }
  if (!data) {
    return (
      <p role="status" className={`${CARD} text-lg font-semibold text-ops-muted`}>
        Loading...
      </p>
    );
  }
  return <CheckerForm data={data} />;
}

function CheckerForm({ data }: { data: RulesData }) {
  const places = useMemo(() => placeOptions(data), [data]);
  const [packageId, setPackageId] = useState("");
  const [addOnIds, setAddOnIds] = useState<string[]>([]);
  const [techId, setTechId] = useState("");
  const [startKind, setStartKind] = useState<"home" | "job">("home");
  const [startPlace, setStartPlace] = useState("");
  const [customerPlace, setCustomerPlace] = useState("");
  /** The Bronze package the customer said NO to. The VA only asks once. */
  const [declinedFor, setDeclinedFor] = useState<string | null>(null);
  /** Name of the Bronze package the customer upgraded from, for display. */
  const [upgradedFrom, setUpgradedFrom] = useState<string | null>(null);

  const pkg = getPackage(data, packageId);
  const tech = techId ? getTech(data, techId) : undefined;

  const result = checkJob(data, {
    packageId,
    addOnIds,
    techId: techId || undefined,
    start: startKind === "home" ? { kind: "home" } : { kind: "job", place: startPlace },
    customerPlace,
    upsellAnswer: declinedFor === packageId ? "no" : undefined,
  });

  // The map shows the trip as soon as both ends are known.
  const startCity = startKind === "home" ? (tech?.homeCity ?? null) : resolvePlace(data, startPlace);
  const customerCity = resolvePlace(data, customerPlace);
  const drive = startCity && customerCity ? driveMinutes(data, startCity, customerCity) : null;

  function choosePackage(id: string) {
    setPackageId(id);
    setUpgradedFrom(null);
  }

  function toggleAddOn(id: string) {
    setAddOnIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));
  }

  function upsellYes() {
    const offer = pkg && upsellFor(data, pkg);
    if (!offer) return;
    setPackageId(offer.to.id);
    setUpgradedFrom(offer.from.name);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-start">
      {/* LEFT / TOP: the form */}
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()} aria-label="Job details">
        <section className={CARD} aria-labelledby="step-package">
          <h2 id="step-package" className={STEP}>
            1. Package
          </h2>
          <label htmlFor="package" className="mt-4 block font-semibold">
            Package
          </label>
          <select id="package" value={packageId} onChange={(e) => choosePackage(e.target.value)} className={SELECT}>
            <option value="">Pick a package</option>
            {data.packageGroups.map((group) => (
              <optgroup key={group} label={group}>
                {data.packages
                  .filter((p) => p.group === group)
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}, {priceLabel(p)}
                    </option>
                  ))}
              </optgroup>
            ))}
          </select>

          <fieldset className="mt-5">
            <legend className="font-semibold">Add-ons (pick any)</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {data.addOns.map((a) => (
                <label key={a.id} className={`${CHOICE} rounded-full px-3.5 py-2 text-sm`}>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={addOnIds.includes(a.id)}
                    onChange={() => toggleAddOn(a.id)}
                  />
                  <span>
                    {a.name} <span className="font-semibold">+{formatMoney(a.price)}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <p className="mt-5 flex items-baseline justify-between rounded-xl bg-ops-surface px-4 py-3">
            <span className="font-semibold">Job total</span>
            <span className="text-3xl font-extrabold" aria-live="polite">
              {pkg?.price === null ? "No price check" : formatMoney(jobTotal(data, pkg, addOnIds))}
              {pkg?.priceFrom && <span className="text-base font-semibold text-ops-muted"> or more</span>}
            </span>
          </p>
        </section>

        <section className={CARD}>
          <fieldset>
            <legend className={STEP}>2. Tech</legend>
            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {data.techs.map((t) => (
                <label key={t.id} className={`${CHOICE} flex-col px-4 py-3`}>
                  <input
                    type="radio"
                    name="tech"
                    value={t.id}
                    className="sr-only"
                    checked={techId === t.id}
                    onChange={() => setTechId(t.id)}
                  />
                  <span className="text-lg font-bold">{t.name}</span>
                  <span className="text-sm text-ops-muted">{t.homeCity ? `Home: ${t.homeCity}` : "Home not set"}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </section>

        <section className={CARD}>
          <fieldset>
            <legend className={STEP}>3. Where the tech starts</legend>
            <div className="mt-4 space-y-2">
              <label className={`${CHOICE} flex-col px-4 py-3`}>
                <input
                  type="radio"
                  name="start"
                  className="sr-only"
                  checked={startKind === "home"}
                  onChange={() => setStartKind("home")}
                />
                <span className="font-semibold">Tech&apos;s home (first job of the day)</span>
                <span className="text-sm text-ops-muted">
                  {tech?.homeCity ? `Starts in ${tech.homeCity}` : "Starts at the tech's home city"}
                </span>
              </label>
              <label className={`${CHOICE} flex-col px-4 py-3`}>
                <input
                  type="radio"
                  name="start"
                  className="sr-only"
                  checked={startKind === "job"}
                  onChange={() => setStartKind("job")}
                />
                <span className="font-semibold">Tech already has a job that day in...</span>
                <span className="text-sm text-ops-muted">Pick the city of that job</span>
              </label>
            </div>
            {startKind === "job" && (
              <>
                <label htmlFor="start-place" className="mt-4 block font-semibold">
                  City of the other job
                </label>
                <select
                  id="start-place"
                  value={startPlace}
                  onChange={(e) => setStartPlace(e.target.value)}
                  className={SELECT}
                >
                  <option value="">Pick a city</option>
                  {places.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </>
            )}
          </fieldset>
        </section>

        <section className={CARD} aria-labelledby="step-customer">
          <h2 id="step-customer" className={`${STEP} mb-4`}>
            4. Customer city
          </h2>
          <PlaceCombobox
            label="Customer city"
            places={places}
            hint="Type to search. You can also click a city on the map."
            value={customerPlace}
            onChange={setCustomerPlace}
          />
        </section>
      </form>

      {/* RIGHT / BOTTOM: result and map */}
      <div className="space-y-5">
        <ResultPanel
          data={data}
          result={result}
          customerPlace={customerPlace}
          customerCity={customerCity}
          upgradedFrom={upgradedFrom}
          onUpsellYes={upsellYes}
          onUpsellNo={() => setDeclinedFor(packageId)}
          onAddAddOn={(id) => setAddOnIds((ids) => (ids.includes(id) ? ids : [...ids, id]))}
          onPickTech={setTechId}
        />

        <section
          aria-labelledby="map-title"
          className="overflow-hidden rounded-2xl border border-ops-line bg-white shadow-sm"
        >
          <h2 id="map-title" className="sr-only">
            Map of cities and tech zones
          </h2>
          <CoverageMap
            data={data}
            startCity={startCity}
            customerCity={customerCity}
            drive={drive}
            onPickCity={setCustomerPlace}
          />
          <p className="px-5 py-4 text-sm text-ops-muted">
            The blue zone is where each tech usually works. It is NOT the {data.driveLimitMin} minute limit. The checker
            uses the real drive time.
          </p>
        </section>
      </div>
    </div>
  );
}
