/**
 * Config for the header nav dropdowns (Services, Packages, Service Area),
 * consumed by components/NavDropdown.tsx. Links are derived from the services
 * and service-area data so they stay in sync with the actual pages.
 */

import {
  ceramicCoating,
  maintenancePlan,
  rvDetailing,
  tiers,
} from "@/lib/services";
import { counties, featuredCities } from "@/lib/serviceAreas";

export type NavMenuLink = { label: string; href: string };

export type NavMenuGroup = {
  /** Optional small uppercase subheader above the group. */
  label?: string;
  links: NavMenuLink[];
  /** 2 renders a two-column grid; otherwise a single column. */
  columns?: 1 | 2;
};

export type NavMenuConfig = {
  /** Unique — used for the panel/submenu element ids. */
  id: string;
  /** The clickable label; also links to `href`. */
  label: string;
  ariaLabel: string;
  /** Overview page the label navigates to. */
  href: string;
  /**
   * Panel width. Semantic, not a Tailwind class — Tailwind doesn't scan /lib,
   * so the actual class is a literal in components/NavDropdown.tsx. "wide" fits
   * a two-column grid; "narrow" suits single-column lists.
   */
  panelWidth: "wide" | "narrow";
  groups: NavMenuGroup[];
  /** The highlighted "view all / compare" link at the bottom. */
  footer: NavMenuLink;
};

/** The five tiers plus ceramic coating — shared by Services and Packages. */
const tierLinks: NavMenuLink[] = [
  ...tiers.map((tier) => ({ label: tier.name, href: `/services/${tier.slug}` })),
  { label: ceramicCoating.name, href: `/services/${ceramicCoating.slug}` },
];

export const servicesMenu: NavMenuConfig = {
  id: "services",
  label: "Services",
  ariaLabel: "Services",
  href: "/services",
  panelWidth: "wide",
  groups: [
    { label: "Packages", links: tierLinks, columns: 2 },
    {
      label: "More",
      links: [
        // Add-Ons has no detail page — it links to the section on /services.
        { label: "Add-Ons", href: "/services#add-ons" },
        { label: maintenancePlan.name, href: `/services/${maintenancePlan.slug}` },
        { label: rvDetailing.name, href: `/services/${rvDetailing.slug}` },
      ],
    },
  ],
  footer: { label: "View all services →", href: "/services" },
};

export const packagesMenu: NavMenuConfig = {
  id: "packages",
  label: "Packages",
  ariaLabel: "Packages",
  href: "/packages",
  panelWidth: "wide",
  groups: [{ links: tierLinks, columns: 2 }],
  footer: { label: "Compare all packages →", href: "/packages" },
};

export const serviceAreaMenu: NavMenuConfig = {
  id: "service-area",
  label: "Service Area",
  ariaLabel: "Service Area",
  href: "/service-area",
  panelWidth: "narrow",
  // Group the six featured cities by county (Riverside, then San Diego).
  groups: counties.map((county) => ({
    label: `${county} County`,
    links: featuredCities
      .filter((city) => city.county === county)
      .map((city) => ({ label: city.name, href: `/service-area/${city.slug}` })),
  })),
  footer: { label: "View all areas →", href: "/service-area" },
};
