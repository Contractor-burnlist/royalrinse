/**
 * The technicians shown in "Meet the Team" on /about. Single source of truth:
 * the cards and the Person JSON-LD both read from this list.
 *
 * Optional fields. Add any of these to a person below and the card shows it;
 * leave it out and the card shows nothing in its place:
 *   specialties?:    string[]  gold-outline chips
 *   certifications?: string[]  chips with a badge icon
 *   favoriteJob?:    string    one short labeled line
 *   quote?:          string    pull quote, no quote marks needed
 *
 * `covers` lists the areas a technician serves, never where they live.
 * `photoFocus` is the CSS object-position for the 4:5 crop of their photo.
 */

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  photo: string;
  photoFocus: string; // CSS object-position, e.g. "50% 25%"
  since: string; // shown as "With Royal Rinse since ..."
  covers: string[]; // service areas, NOT home city
  bio: string;
  specialties?: string[]; // optional, render only if present
  certifications?: string[]; // optional, render only if present
  favoriteJob?: string; // optional, render only if present
  quote?: string; // optional, render only if present
};

export const team: TeamMember[] = [
  {
    slug: "andre",
    name: "Andre",
    role: "Founder and Lead Technician",
    photo: "/team/andre.png",
    // Wide shot: Andre stands at the right edge, beside the van. The 4:5 crop
    // keeps the full width, so only the vertical value moves the frame; the
    // horizontal value marks where he stands and anchors the hover zoom.
    photoFocus: "86% 62%",
    since: "April 2026",
    covers: ["Riverside", "Corona", "Moreno Valley", "Perris"],
    bio: "Andre spent years detailing cars for someone else's name on the door. In April 2026 he borrowed from his grandfather, bought one van, and started Royal Rinse. Every detail that leaves our vans is held to the standard he set on day one.",
    // specialties, certifications, favoriteJob, quote: leave out until Tim provides them
  },
  {
    slug: "luna",
    name: "Luna",
    role: "Detail Technician",
    photo: "/team/luna.png",
    photoFocus: "47% 45%",
    since: "August 2026",
    covers: ["Temecula", "Murrieta", "Menifee", "Fallbrook"],
    bio: "Luna joined Royal Rinse in August 2026 to run our second van. She brings the same showroom standard to driveways across Southwest Riverside County and North San Diego County.",
  },
];
