"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./timeline.module.css";

/**
 * Growth timeline: horizontal from md up, a vertical stack on phones. The
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
    detail: "Andre on the road with one rig, built on a loan from his grandfather.",
  },
  {
    n: "02",
    month: "August",
    year: "2026",
    title: "The second van",
    sub: "Demand outgrew one rig",
    detail: "Luna joined to run the second van.",
  },
  {
    n: "03",
    month: "October",
    year: "2026",
    title: "The third van",
    sub: "Serving more of Riverside and San Diego County",
    detail: "Kevin joined as the third van tech.",
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
