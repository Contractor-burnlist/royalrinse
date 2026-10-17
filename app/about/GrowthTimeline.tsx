"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./timeline.module.css";

/**
 * Growth timeline: horizontal from lg up, a vertical stack on phones and tablets. The
 * reveal (line drawing in, entries rising left to right) is armed on mount and
 * fires once the section scrolls into view; without JS, or under reduced
 * motion, everything is simply shown.
 */

const milestones = [
  {
    n: "01",
    month: "April",
    year: "2026",
    title: "The first van",
    sub: "Where it started",
    detail:
      "Andre had spent years detailing other people's cars for someone else's name on the door. He borrowed from his grandfather, bought one van, and started knocking on driveways in Menifee.",
  },
  {
    n: "02",
    month: "August",
    year: "2026",
    title: "The second van",
    sub: "Demand outgrew one rig",
    detail:
      "Luna came on to run the second rig. Two vans meant quicker turnaround on scheduling and more openings across the week.",
  },
  {
    n: "03",
    month: "October",
    year: "2026",
    title: "The third van",
    sub: "Three rigs on the road",
    detail:
      "Kevin joined as the third van tech. Three vans means we cover more of Riverside County and reach further into San Diego on the same day.",
  },
];

export function GrowthTimeline({ goldClass }: { goldClass: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    setArmed(true);
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0.1 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.timeline} ${armed ? styles.armed : ""} ${shown ? styles.shown : ""}`}
    >
      <span aria-hidden="true" className={styles.line} />
      <ol className={styles.entries}>
        {milestones.map((m, i) => (
          <li key={m.n} className={styles.entry} style={{ "--i": i } as CSSProperties}>
            <p className={`${styles.date} font-display`}>
              <span className={styles.number}>{m.n}</span>
              <span className={`${styles.month} ${goldClass}`}>{m.month}</span>
              <span className={styles.year}>{m.year}</span>
            </p>
            <span aria-hidden="true" className={styles.nodeRow}>
              <span className={styles.node} />
            </span>
            <p className={styles.desc}>
              <span className={styles.title}>{m.title}</span>
              <span className={styles.sub}>{m.sub}</span>
              <span className={styles.detail}>{m.detail}</span>
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
