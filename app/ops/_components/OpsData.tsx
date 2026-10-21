"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { RulesData } from "@/lib/ops/engine";

/**
 * Loads the rules and prices once from the password-protected
 * /ops/api/data and shares them with every tool on the page. They are never
 * in the JS bundle.
 */
interface OpsDataState {
  data: RulesData | null;
  failed: boolean;
}

const OpsDataContext = createContext<OpsDataState>({ data: null, failed: false });

export function OpsDataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OpsDataState>({ data: null, failed: false });

  useEffect(() => {
    let live = true;
    fetch("/ops/api/data", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json() as Promise<RulesData>;
      })
      .then((data) => live && setState({ data, failed: false }))
      .catch(() => live && setState({ data: null, failed: true }));
    return () => {
      live = false;
    };
  }, []);

  return <OpsDataContext.Provider value={state}>{children}</OpsDataContext.Provider>;
}

export function useOpsData() {
  return useContext(OpsDataContext);
}

const CARD = "rounded-2xl border border-ops-line bg-white p-5 shadow-sm sm:p-6";

/** Shows "Loading..." or an error until the data is here, then the tool. */
export function WithOpsData({ children }: { children: (data: RulesData) => ReactNode }) {
  const { data, failed } = useOpsData();
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
  return <>{children(data)}</>;
}
