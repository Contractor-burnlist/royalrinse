"use client";

import { useEffect, useRef, useState } from "react";

const ALERT_TITLE = "Send the follow-up text now";

/** Three short beeps. Silent if the browser blocks sound. */
function beep(ctx: AudioContext | null) {
  if (!ctx) return;
  try {
    for (let i = 0; i < 3; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = 880;
      gain.gain.value = 0.15;
      osc.connect(gain).connect(ctx.destination);
      const t = ctx.currentTime + i * 0.35;
      osc.start(t);
      osc.stop(t + 0.2);
    }
  } catch {
    // No sound. The on-screen alert still shows.
  }
}

/**
 * Countdown for the wait before the follow-up text. Counts to a fixed end
 * time, so it stays right even when the browser slows a background tab.
 */
export function FollowupTimer({ minutes, discountPercent }: { minutes: number; discountPercent: number }) {
  const [endAt, setEndAt] = useState<number | null>(null);
  const [now, setNow] = useState(0);
  const [done, setDone] = useState(false);
  const audio = useRef<AudioContext | null>(null);
  const savedTitle = useRef("");

  useEffect(() => {
    if (endAt === null) return;
    const id = setInterval(() => {
      const t = Date.now();
      setNow(t);
      if (t >= endAt) {
        setEndAt(null);
        setDone(true);
        beep(audio.current);
        // Also visible on the browser tab if the VA is in another tab.
        savedTitle.current = document.title;
        document.title = ALERT_TITLE;
      }
    }, 250);
    return () => clearInterval(id);
  }, [endAt]);

  function start() {
    // Sound must be unlocked by a click, so set it up here, not at zero.
    try {
      const Ctx =
        window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (Ctx) {
        audio.current ??= new Ctx();
        void audio.current.resume();
      }
    } catch {
      // No sound available.
    }
    dismiss();
    const t = Date.now();
    setNow(t);
    setEndAt(t + minutes * 60_000);
  }

  function dismiss() {
    setDone(false);
    if (savedTitle.current) {
      document.title = savedTitle.current;
      savedTitle.current = "";
    }
  }

  const secondsLeft = endAt === null ? minutes * 60 : Math.max(0, Math.ceil((endAt - now) / 1000));
  const clock = `${String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:${String(secondsLeft % 60).padStart(2, "0")}`;

  return (
    <div className="mt-6 rounded-xl border border-ops-line bg-ops-surface p-4">
      <div className="flex flex-wrap items-center gap-4">
        {endAt === null ? (
          <button
            type="button"
            onClick={start}
            className="rounded-xl bg-ops-primary px-5 py-3 font-bold text-white hover:bg-ops-primary-dark"
          >
            Start {minutes} minute timer
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setEndAt(null)}
            className="rounded-xl border-2 border-ops-ink bg-white px-5 py-3 font-bold text-ops-ink hover:bg-ops-surface"
          >
            Stop timer
          </button>
        )}
        <p className="text-4xl font-black tabular-nums" role="timer" aria-label="Time left before the follow-up">
          {clock}
        </p>
      </div>

      {done && (
        <div
          role="alert"
          className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border-2 border-ops-go bg-ops-go-soft p-4"
        >
          <p className="text-2xl font-black text-ops-go">{ALERT_TITLE}</p>
          <button
            type="button"
            onClick={dismiss}
            className="rounded-lg bg-ops-go px-4 py-2 font-bold text-white hover:bg-green-800"
          >
            OK
          </button>
        </div>
      )}

      <p className="mt-4 text-sm text-ops-muted">
        When they book with the {discountPercent}% off, check the job in the Booking Checker using the price AFTER the
        discount.
      </p>
    </div>
  );
}
