export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-center text-white">
      <p className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-sky-400">
        Now serving all of San Diego County
      </p>

      <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">
        Royal Rinse
      </h1>

      <p className="mt-5 max-w-xl text-lg text-slate-300 sm:text-xl">
        Mobile Auto Detailing — San Diego
      </p>

      <a
        href="tel:+19513389117"
        className="mt-10 inline-flex items-center justify-center rounded-full bg-sky-500 px-8 py-4 text-base font-semibold text-slate-950 transition-colors hover:bg-sky-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
      >
        Call (951) 338-9117
      </a>

      <p className="mt-6 text-sm text-slate-500">
        We come to you — home, office, anywhere you park.
      </p>
    </main>
  );
}
