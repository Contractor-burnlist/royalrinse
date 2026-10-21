import Image from "next/image";
import { Checker } from "./_components/Checker";
import { NearbyTools } from "./_components/NearbyTools";
import { OpsDataProvider } from "./_components/OpsData";
import { OpsTabs } from "./_components/OpsTabs";
import { InvoicingSop } from "./_sop/InvoicingSop";
import { FollowupExample, FollowupSop, NearbyGoal } from "./_sop/NearbySop";
import { RulesSop } from "./_sop/RulesSop";

export default function OpsPage() {
  return (
    <>
      <header className="bg-black text-white">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <Image
            src="/royal-logo.jpeg"
            alt="Royal Rinse"
            width={64}
            height={64}
            priority
            className="h-14 w-14 rounded-lg sm:h-16 sm:w-16"
          />
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Booking Checker</h1>
            <p className="mt-0.5 text-sm text-slate-300">All dates and times are California time (Pacific Time).</p>
          </div>
        </div>
      </header>

      {/* Client tools get the rules from /ops/api/data; the SOP text is
          rendered here on the server and passed in. */}
      <OpsDataProvider>
        <OpsTabs
          tabs={[
            { id: "checker", label: "Booking Checker", panel: <Checker /> },
            {
              id: "nearby",
              label: "Nearby Jobs + Follow-up",
              panel: (
                <>
                  <NearbyGoal />
                  <NearbyTools followupSop={<FollowupSop />} />
                  <FollowupExample />
                </>
              ),
            },
            { id: "invoicing", label: "Invoicing", panel: <InvoicingSop /> },
            { id: "rules", label: "Scheduling Rules", panel: <RulesSop /> },
          ]}
        />
      </OpsDataProvider>

      <footer className="fixed inset-x-0 bottom-0 z-[1000] border-t border-black bg-ops-ink text-white">
        <p className="mx-auto max-w-7xl px-4 py-3 text-center text-lg font-semibold sm:px-6">
          Not sure? Do not book. Ask Tim.
        </p>
      </footer>
    </>
  );
}
