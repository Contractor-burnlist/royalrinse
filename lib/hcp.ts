/**
 * Housecall Pro online booking: the one third-party script on the site.
 *
 * It is NOT loaded with the page. It is injected the first time a visitor
 * shows intent to book (hover, focus or tap on a "Book Now" button), so a page
 * view that never touches booking runs no third-party code at all, and the
 * widget's hidden iframe is never added to those pages.
 *
 * No Subresource Integrity hash: the file is unversioned (Housecall Pro
 * updates it in place) and is served without CORS headers, so an `integrity`
 * attribute would make the browser refuse it. The Content-Security-Policy in
 * next.config.mjs limits scripts to this one external host instead.
 */

const HCP_TOKEN = "16c0ab2b61894f3d9a901c7ca8af8226";
const HCP_ORG = "Royal-Rinse-Mobile-Detailing";

/** Direct booking page: iframed on /book, and the no-script fallback. */
export const HCP_BOOKING_URL = `https://book.housecallpro.com/book/${HCP_ORG}/${HCP_TOKEN}?v2=true`;

const HCP_SCRIPT_URL = `https://online-booking.housecallpro.com/script.js?token=${HCP_TOKEN}&orgName=${HCP_ORG}`;

let pending: Promise<void> | null = null;

/** Resolves once window.HCPWidget is ready. Safe to call repeatedly. */
export function loadHcpWidget(): Promise<void> {
  if (window.HCPWidget?.openModal) return Promise.resolve();

  if (!pending) {
    pending = new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = HCP_SCRIPT_URL;
      script.async = true;
      script.onload = () =>
        window.HCPWidget?.openModal
          ? resolve()
          : reject(new Error("HCP widget did not initialize"));
      script.onerror = () => {
        script.remove();
        reject(new Error("HCP widget failed to load"));
      };
      document.head.appendChild(script);
    }).catch((error) => {
      // Let the next click try again.
      pending = null;
      throw error;
    });
  }

  return pending;
}
