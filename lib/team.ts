/**
 * The technicians shown in "Meet the Team" on /about. Single source of truth:
 * the cards and the Person JSON-LD both read from this list.
 *
 * Optional fields. Add any of these to a person below and the card shows it;
 * leave it out and the card shows nothing in its place:
 *   yearsDetailing?: number    photo badge reads "{n}+ YEARS DETAILING";
 *                              unset, it reads "SEASONED PRO DETAILER"
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
  since: string; // start date at Royal Rinse; kept in the data, not shown on the card
  covers: string[]; // service areas, NOT home city
  bio: string;
  yearsDetailing?: number; // total years detailing professionally
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
    bio: "Andre has been detailing cars professionally for years. He perfected his craft working on vehicles for other shops before putting his own name on the door with Royal Rinse. Every detail that leaves our vans is held to the standard he built over all those years.",
    // yearsDetailing, specialties, certifications, favoriteJob, quote: leave out until Tim provides them
  },
  {
    slug: "luna",
    name: "Luna",
    role: "Detail Technician",
    photo: "/team/luna.png",
    photoFocus: "47% 45%",
    since: "August 2026",
    covers: ["Temecula", "Murrieta", "Menifee", "Fallbrook"],
    bio: "Luna is a seasoned detailer with years of hands-on experience behind her. She runs our second van and brings that same showroom standard to driveways across Southwest Riverside County and North San Diego County.",
  },
];
