/**
 * Projection for the /ops base map image (public/ops/ops-map-base.webp).
 *
 * The image is a plain linear lat/lng projection, 1144 x 1917 px, with the
 * bounds below. The blue zones baked into the image were drawn with this same
 * projection, so a point placed here lines up with them exactly. Pure math:
 * no data, safe for the browser. Do not change these numbers unless the image
 * is replaced.
 */
export const MAP_WIDTH = 1144;
export const MAP_HEIGHT = 1917;

const WEST = -117.7;
const EAST = -116.74;
const NORTH = 34.27;
const SOUTH = 32.93;

/** [lat, lng] -> pixel position on the 1144 x 1917 image. */
export function toXY(lat: number, lng: number): { x: number; y: number } {
  return {
    x: ((lng - WEST) / (EAST - WEST)) * MAP_WIDTH,
    y: ((NORTH - lat) / (NORTH - SOUTH)) * MAP_HEIGHT,
  };
}
