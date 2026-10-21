"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { circle, featureCollection, union } from "@turf/turf";
import type { Feature, MultiPolygon, Polygon } from "geojson";
import { CircleMarker, GeoJSON, MapContainer, Marker, Polyline, TileLayer, Tooltip } from "react-leaflet";
import { useMemo } from "react";
import type { RulesData } from "@/lib/ops/engine";

const ZONE_STYLE: L.PathOptions = {
  color: "#8ab8ff",
  weight: 2,
  dashArray: "6 6",
  fillColor: "#3b82f6",
  fillOpacity: 0.18,
};
const LINE_OK = "#4ade80";
// CARTO needs a free key on every tile request (carto.com/basemaps/apikey).
// Without it the map still works but the tiles show a watermark.
const CARTO_KEY = process.env.NEXT_PUBLIC_CARTO_KEY;
const TILE_URL = `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png${
  CARTO_KEY ? `?key=${encodeURIComponent(CARTO_KEY)}` : ""
}`;
const LINE_FAR = "#cbd5e1";

/** One smooth zone per tech: every coverage circle joined with turf. */
function zonesFor(data: RulesData) {
  return data.techs
    .filter((t) => t.coverage.length > 0)
    .map((tech) => {
      const circles = tech.coverage.map((c) =>
        // turf takes [lng, lat].
        circle([c.center[1], c.center[0]], c.radiusMiles, { steps: 160, units: "miles" }),
      );
      const zone: Feature<Polygon | MultiPolygon> | null =
        circles.length > 1 ? union(featureCollection(circles)) : circles[0];
      return { tech, zone };
    });
}

function homeIcon(name: string, above: boolean) {
  return L.divIcon({
    className: above ? "home-pin home-pin--above" : "home-pin",
    html: `<span class="home-pin__dot"></span><span class="home-pin__label">${name}</span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

interface Props {
  /** Rules from /ops/api/data: cities, coordinates, techs, limits. */
  data: RulesData;
  startCity: string | null;
  customerCity: string | null;
  drive: number | null;
  onPickCity: (city: string) => void;
}

export default function CoverageMap({ data, startCity, customerCity, drive, onPickCity }: Props) {
  const zones = useMemo(() => zonesFor(data), [data]);
  const bounds = useMemo(() => L.latLngBounds(data.cityNames.map((c) => data.cityCoords[c])), [data]);
  const labelLeft = new Set(data.mapLabelLeft);
  const showLine = startCity && customerCity && startCity !== customerCity && drive !== null;
  const lineColor = drive !== null && drive <= data.driveLimitMin ? LINE_OK : LINE_FAR;

  return (
    <MapContainer
      bounds={bounds}
      boundsOptions={{ padding: [24, 24] }}
      zoomSnap={0.25}
      zoomDelta={0.5}
      scrollWheelZoom={false}
      className="h-[420px] w-full lg:h-[560px]"
    >
      <TileLayer
        url={TILE_URL}
        subdomains="abcd"
        maxZoom={20}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />

      {zones.map(({ tech, zone }) =>
        zone ? <GeoJSON key={tech.id} data={zone} style={ZONE_STYLE} interactive={false} /> : null,
      )}

      {showLine && (
        <Polyline
          key={`${startCity}-${customerCity}`}
          positions={[data.cityCoords[startCity], data.cityCoords[customerCity]]}
          pathOptions={{ color: lineColor, weight: 5, opacity: 0.95 }}
          interactive={false}
        >
          <Tooltip permanent direction="center" className="drive-label">
            <span style={{ color: lineColor }}>{drive} min</span>
          </Tooltip>
        </Polyline>
      )}

      {data.cityNames.map((city) => {
        const picked = city === customerCity;
        const start = city === startCity;
        return (
          <CircleMarker
            key={`${city}-${picked}-${start}`}
            center={data.cityCoords[city]}
            radius={picked || start ? 8 : 6}
            pathOptions={{
              color: "#0f172a",
              weight: 2,
              fillColor: picked ? "#facc15" : start ? LINE_OK : "#e2e8f0",
              fillOpacity: 1,
            }}
            eventHandlers={{ click: () => onPickCity(city) }}
          >
            <Tooltip
              permanent
              direction={labelLeft.has(city) ? "left" : "right"}
              offset={labelLeft.has(city) ? [-6, 0] : [6, 0]}
              className="city-label"
            >
              {city}
            </Tooltip>
          </CircleMarker>
        );
      })}

      {data.techs.map((tech) =>
        tech.homeCity ? (
          <Marker
            key={tech.id}
            position={data.cityCoords[tech.homeCity]}
            icon={homeIcon(`${tech.name} (home)`, !!tech.mapLabelAbove)}
            interactive={false}
            keyboard={false}
          />
        ) : null,
      )}
    </MapContainer>
  );
}
