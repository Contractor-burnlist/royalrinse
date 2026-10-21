"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { driveMinutes } from "@/lib/ops/engine";
import { MAP_HEIGHT, MAP_WIDTH, toXY } from "@/lib/ops/mapProjection";

/**
 * The /ops map: a static image (land, freeways and the blue zones are baked
 * in) with an SVG on top for cities, home pins and the drive line. No map
 * API, no tiles, no outside requests. The SVG uses the image's own pixel
 * grid as its viewBox, so the overlay scales with the image at any width.
 *
 * Every city, coordinate and drive time comes in as props from the
 * password-protected /ops/api/data. Nothing here is hardcoded.
 */

export interface MapCity {
  name: string;
  lat: number;
  lng: number;
}

export interface TechHome {
  /** Tech name, e.g. "Andre". */
  name: string;
  city: string;
}

interface Props {
  /** In drive matrix order. */
  cities: MapCity[];
  techHomes: TechHome[];
  driveMatrix: Record<string, number[]>;
  driveLimitMin: number;
  /** Cities whose label goes on the left of the dot. */
  labelLeft: string[];
  startCity: string | null;
  customerCity: string | null;
  onSelectCity: (city: string) => void;
}

const BLUE = "#3b82f6";
const LIGHT_BLUE = "#8ab8ff";
const OUTLINE = "#1a2129";
const GREEN = "#22c55e";
const GRAY = "#9aa3b2";

/** Sizes in image pixels (viewBox units). */
const FONT = 26;
const HOME_FONT = 19;
const DOT_R = 7;
const PIN_R = 16;
const EDGE = 10;
/** Smallest tap target on screen, in CSS pixels. */
const MIN_HIT_PX = 44;

/** Close enough for layout: Inter at weight 600-700. */
const textWidth = (text: string, size: number) => text.length * size * 0.58;
const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);

interface Box {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

interface PlacedCity {
  name: string;
  x: number;
  y: number;
  /** Tech whose home this is, if any. */
  home: TechHome | null;
  homeLabel: string;
  anchor: "start" | "end";
  labelX: number;
  nameY: number;
  homeY: number;
  /** The text block, for hit testing. */
  label: Box;
}

function placeCities(cities: MapCity[], techHomes: TechHome[], labelLeft: string[]): PlacedCity[] {
  return cities.map((c) => {
    const p = toXY(c.lat, c.lng);
    // Keep every dot on the image, even a city just past an edge.
    const x = clamp(p.x, EDGE + PIN_R, MAP_WIDTH - EDGE - PIN_R);
    const y = clamp(p.y, EDGE + PIN_R, MAP_HEIGHT - EDGE - PIN_R);
    const home = techHomes.find((h) => h.city === c.name) ?? null;
    const homeLabel = home ? `${home.name.toUpperCase()}'S HOME` : "";
    const left = !!home || labelLeft.includes(c.name);

    const width = Math.max(textWidth(c.name, FONT), home ? textWidth(homeLabel, HOME_FONT) + 12 : 0);
    const gap = home ? PIN_R + 12 : DOT_R + 10;
    // Label start (left edge), kept inside the image.
    const start = clamp(left ? x - gap - width : x + gap, EDGE, MAP_WIDTH - EDGE - width);

    // Name line, plus the "HOME" line under it for home pins.
    const blockTop0 = home ? y - 8 - FONT / 2 : y - FONT / 2;
    const blockBottom0 = home ? y + 18 + HOME_FONT / 2 : y + FONT / 2;
    const shift = clamp(0, EDGE - blockTop0, MAP_HEIGHT - EDGE - blockBottom0);
    const nameY = (home ? y - 8 : y) + shift;

    return {
      name: c.name,
      x,
      y,
      home,
      homeLabel,
      anchor: left ? "end" : "start",
      labelX: left ? start + width : start,
      nameY,
      homeY: y + 18 + shift,
      label: { left: start, top: blockTop0 + shift, right: start + width, bottom: blockBottom0 + shift },
    };
  });
}

/** Distance from a point to a box (0 inside). */
function distToBox(px: number, py: number, b: Box) {
  const dx = Math.max(b.left - px, 0, px - b.right);
  const dy = Math.max(b.top - py, 0, py - b.bottom);
  return Math.hypot(dx, dy);
}

export function OpsMap({
  cities,
  techHomes,
  driveMatrix,
  driveLimitMin,
  labelLeft,
  startCity,
  customerCity,
  onSelectCity,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [failed, setFailed] = useState(false);
  /** Rendered width / image width. */
  const [scale, setScale] = useState(0.5);
  const [hovered, setHovered] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / MAP_WIDTH || 0.5));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const placed = useMemo(() => placeCities(cities, techHomes, labelLeft), [cities, techHomes, labelLeft]);
  const byName = useMemo(() => new Map(placed.map((p) => [p.name, p])), [placed]);
  const cityNames = useMemo(() => cities.map((c) => c.name), [cities]);
  const drive = (from: string, to: string) => driveMinutes({ cityNames, driveMatrix }, from, to);

  // Half of a 44 px tap target, in image pixels at the current size.
  const hitR = Math.max(MIN_HIT_PX / 2 / scale, 24);

  /** Hit area: the dot and the label, each at least 44 x 44 px on screen. */
  function hitBox(p: PlacedCity): Box {
    const midY = (p.label.top + p.label.bottom) / 2;
    const halfH = Math.max((p.label.bottom - p.label.top) / 2, hitR);
    return {
      left: Math.min(p.x - hitR, p.label.left - 6),
      right: Math.max(p.x + hitR, p.label.right + 6),
      top: Math.min(p.y - hitR, midY - halfH),
      bottom: Math.max(p.y + hitR, midY + halfH),
    };
  }

  /**
   * Hit areas overlap where cities are close (Murrieta and Temecula, San
   * Marcos and Escondido), so a tap picks the city nearest the finger.
   */
  function nearestCity(e: React.PointerEvent | React.MouseEvent, fallback: string): string {
    const svg = svgRef.current;
    const ctm = svg?.getScreenCTM();
    if (!svg || !ctm) return fallback;
    const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
    let best = fallback;
    let bestD = Infinity;
    for (const p of placed) {
      const d = Math.min(Math.hypot(pt.x - p.x, pt.y - p.y), distToBox(pt.x, pt.y, p.label));
      if (d < bestD) {
        bestD = d;
        best = p.name;
      }
    }
    return best;
  }

  const start = startCity ? byName.get(startCity) : undefined;
  const customer = customerCity ? byName.get(customerCity) : undefined;
  const lineDrive = start && customer && start !== customer ? drive(start.name, customer.name) : null;
  const lineColor = lineDrive !== null && lineDrive <= driveLimitMin ? GREEN : GRAY;

  // Tooltip: the hovered city, or the focused one for keyboard users.
  const tipCity = hovered ?? focused;
  const tip = tipCity ? byName.get(tipCity) : undefined;
  const tipText = !tip
    ? ""
    : !startCity
      ? `${tip.name}: pick a tech and start point to see the drive time`
      : tip.name === startCity
        ? `${tip.name}: start city`
        : `${tip.name}: ${drive(startCity, tip.name)} min from ${startCity}`;

  if (failed) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl bg-slate-200 p-6 text-center font-semibold text-ops-ink">
        Map could not load. The checker still works.
      </div>
    );
  }

  // Labels and dots the drive pill must not cover.
  const obstacles: Box[] = placed.flatMap((p) => {
    const r = (p.home ? PIN_R : DOT_R) + 6;
    return [p.label, { left: p.x - r, right: p.x + r, top: p.y - r, bottom: p.y + r }];
  });
  const homes = placed.filter((p) => p.home);
  const dots = placed.filter((p) => !p.home);

  return (
    <div ref={wrapRef} className="relative overflow-hidden rounded-2xl">
      <Image
        src="/ops/ops-map-base.webp"
        alt="Map of the service area with each tech's usual zone in blue"
        width={MAP_WIDTH}
        height={MAP_HEIGHT}
        // Straight from /ops (behind the password), not the image optimizer.
        unoptimized
        onError={() => setFailed(true)}
        className="block h-auto w-full select-none"
        draggable={false}
      />
      <svg
        ref={svgRef}
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full"
        role="group"
        aria-label="Cities on the map. Pick a city to make it the customer city."
        style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
      >
        {/* 1. Drive line */}
        {start && customer && lineDrive !== null && (
          <DriveLine
            from={start}
            to={customer}
            minutes={lineDrive}
            color={lineColor}
            over={lineColor === GRAY}
            obstacles={obstacles}
          />
        )}

        {/* 2. City dots, then 3. home pins on top */}
        {[...dots, ...homes].map((p) => {
          const selected = p.name === customerCity;
          const hit = hitBox(p);
          const select = (e: React.MouseEvent) => onSelectCity(nearestCity(e, p.name));
          return (
            <g
              key={p.name}
              className="ops-map-city cursor-pointer"
              role="button"
              tabIndex={0}
              aria-label={`Select ${p.name}`}
              aria-pressed={selected}
              onClick={select}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectCity(p.name);
                }
              }}
              onPointerMove={(e) => setHovered(nearestCity(e, p.name))}
              onPointerLeave={() => setHovered(null)}
              // Ring and tooltip for keyboard focus only, not after a mouse click.
              onFocus={(e) => e.currentTarget.matches(":focus-visible") && setFocused(p.name)}
              onBlur={() => setFocused(null)}
            >
              <rect
                x={hit.left}
                y={hit.top}
                width={hit.right - hit.left}
                height={hit.bottom - hit.top}
                fill="transparent"
              />
              {focused === p.name && (
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={(p.home ? PIN_R : DOT_R) + 16}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth={5}
                  strokeDasharray="8 6"
                />
              )}
              {p.home ? <HomePin p={p} selected={selected} /> : <CityDot p={p} selected={selected} />}
            </g>
          );
        })}
      </svg>

      {tip && (
        <div
          role="status"
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg bg-ops-ink px-3 py-1.5 text-sm font-semibold text-white shadow-lg"
          style={{
            left: `${clamp((tip.x / MAP_WIDTH) * 100, 18, 82)}%`,
            top: `calc(${(tip.y / MAP_HEIGHT) * 100}% - 14px)`,
          }}
        >
          {tipText}
        </div>
      )}
    </div>
  );
}

/** White text with a dark stroke behind it, readable on any part of the map. */
const LABEL_TEXT = {
  fill: "#ffffff",
  stroke: OUTLINE,
  strokeWidth: 6,
  strokeLinejoin: "round" as const,
  paintOrder: "stroke" as const,
  dominantBaseline: "central" as const,
};

function CityDot({ p, selected }: { p: PlacedCity; selected: boolean }) {
  return (
    <>
      {selected ? (
        <>
          <circle cx={p.x} cy={p.y} r={14} fill={OUTLINE} />
          <circle cx={p.x} cy={p.y} r={11} fill="#ffffff" stroke={BLUE} strokeWidth={5} />
        </>
      ) : (
        <circle cx={p.x} cy={p.y} r={DOT_R} fill="#ffffff" stroke={OUTLINE} strokeWidth={3} />
      )}
      <text x={p.labelX} y={p.nameY} textAnchor={p.anchor} fontSize={FONT} fontWeight={600} {...LABEL_TEXT}>
        {p.name}
      </text>
    </>
  );
}

function HomePin({ p, selected }: { p: PlacedCity; selected: boolean }) {
  return (
    <>
      {selected && <circle cx={p.x} cy={p.y} r={PIN_R + 9} fill="none" stroke="#ffffff" strokeWidth={4} />}
      <circle cx={p.x} cy={p.y} r={PIN_R} fill="#ffffff" stroke={BLUE} strokeWidth={7} />
      <circle cx={p.x} cy={p.y} r={5} fill={BLUE} />
      <text x={p.labelX} y={p.nameY} textAnchor={p.anchor} fontSize={FONT} fontWeight={700} {...LABEL_TEXT}>
        {p.name}
      </text>
      <text
        x={p.labelX}
        y={p.homeY}
        textAnchor={p.anchor}
        fontSize={HOME_FONT}
        fontWeight={700}
        letterSpacing={1}
        {...LABEL_TEXT}
        fill={LIGHT_BLUE}
        strokeWidth={5}
      >
        {p.homeLabel}
      </text>
    </>
  );
}

/**
 * Where the minutes pill goes: the midpoint if it is clear, otherwise the
 * nearest spot beside the line that covers no city label or dot. Short trips
 * (Murrieta to Temecula) need this; long ones keep the midpoint.
 */
function pillSpot(from: PlacedCity, to: PlacedCity, w: number, h: number, obstacles: Box[]): [number, number] {
  const len = Math.hypot(to.x - from.x, to.y - from.y) || 1;
  // Unit normal to the line.
  const nx = -(to.y - from.y) / len;
  const ny = (to.x - from.x) / len;
  const fits = (cx: number, cy: number) => {
    const b = { left: cx - w / 2 - 6, right: cx + w / 2 + 6, top: cy - h / 2 - 6, bottom: cy + h / 2 + 6 };
    const inside = b.left >= EDGE && b.right <= MAP_WIDTH - EDGE && b.top >= EDGE && b.bottom <= MAP_HEIGHT - EDGE;
    return (
      inside && !obstacles.some((o) => b.left < o.right && b.right > o.left && b.top < o.bottom && b.bottom > o.top)
    );
  };
  for (const off of [0, 50, -50, 90, -90, 130, -130, 180, -180]) {
    for (const t of [0.5, 0.4, 0.6]) {
      const cx = from.x + (to.x - from.x) * t + nx * off;
      const cy = from.y + (to.y - from.y) * t + ny * off;
      if (fits(cx, cy)) return [cx, cy];
    }
  }
  return [
    clamp((from.x + to.x) / 2, EDGE + w / 2, MAP_WIDTH - EDGE - w / 2),
    clamp((from.y + to.y) / 2, EDGE + h / 2, MAP_HEIGHT - EDGE - h / 2),
  ];
}

function DriveLine({
  from,
  to,
  minutes,
  color,
  over,
  obstacles,
}: {
  from: PlacedCity;
  to: PlacedCity;
  minutes: number;
  color: string;
  over: boolean;
  obstacles: Box[];
}) {
  const label = `${minutes} min`;
  const w = textWidth(label, 30) + 34;
  const h = 48;
  const [mx, my] = pillSpot(from, to, w, h, obstacles);
  return (
    <g aria-hidden="true" pointerEvents="none">
      {/* Dark halo so the line reads on the blue zones and on the land. */}
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke={OUTLINE}
        strokeWidth={11}
        strokeLinecap="round"
        opacity={0.55}
      />
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke={color}
        strokeWidth={6}
        strokeLinecap="round"
        strokeDasharray={over ? "20 14" : undefined}
      />
      <rect
        x={mx - w / 2}
        y={my - h / 2}
        width={w}
        height={h}
        rx={h / 2}
        fill={color}
        stroke={OUTLINE}
        strokeWidth={3}
      />
      <text x={mx} y={my} textAnchor="middle" fontSize={30} fontWeight={700} {...LABEL_TEXT} strokeWidth={5}>
        {label}
      </text>
    </g>
  );
}
