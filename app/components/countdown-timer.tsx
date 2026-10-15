"use client";

import { useSyncExternalStore } from "react";
import { wedding } from "../wedding";

function subscribe(onTick: () => void) {
  const id = setInterval(onTick, 1000);
  return () => clearInterval(id);
}
const nowInSeconds = () => Math.floor(Date.now() / 1000);
const serverNow = () => null;

export function CountdownTimer() {
  const now = useSyncExternalStore(subscribe, nowInSeconds, serverNow);
  const target = Math.floor(new Date(wedding.startsAt).getTime() / 1000);
  const left = now === null ? null : Math.max(0, target - now);

  if (left === 0) {
    return (
      <p className="font-script text-4xl text-ink">Today, we celebrate! Alhamdulillah.</p>
    );
  }

  const units = [
    { label: "Days", value: left === null ? null : Math.floor(left / 86400) },
    { label: "Hours", value: left === null ? null : Math.floor((left % 86400) / 3600) },
    { label: "Minutes", value: left === null ? null : Math.floor((left % 3600) / 60) },
    { label: "Seconds", value: left === null ? null : left % 60 },
  ];

  return (
    <div className="grid grid-cols-4" role="timer" aria-live="off">
      {units.map((u, i) => (
        <div key={u.label} className={`flex flex-col items-center px-1 ${i ? "border-l border-gold/40" : ""}`}>
          <span
            key={u.value ?? "x"}
            className="tick font-serif text-[clamp(34px,11vw,48px)] font-medium leading-none tabular-nums text-ink"
          >
            {u.value === null ? "—" : i === 0 ? u.value : String(u.value).padStart(2, "0")}
          </span>
          <span className="mt-3 text-[10px] font-medium uppercase tracking-[0.22em] text-ink-soft">{u.label}</span>
        </div>
      ))}
    </div>
  );
}

const icsStamp = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

export function SaveTheDate() {
  const download = () => {
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Ali & Afroz//Wedding//EN",
      "BEGIN:VEVENT",
      `UID:ali-afroz-${icsStamp(wedding.startsAt)}@wedding`,
      `DTSTAMP:${icsStamp(new Date().toISOString())}`,
      `DTSTART:${icsStamp(wedding.startsAt)}`,
      `DTEND:${icsStamp(wedding.endsAt)}`,
      `SUMMARY:${wedding.partnerOne} & ${wedding.partnerTwo} — Our Evening`,
      `LOCATION:${wedding.city}`,
      "DESCRIPTION:We'd love to celebrate this beautiful beginning with you.",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "ali-and-afroz.ics";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <button
      type="button"
      onClick={download}
      className="inline-flex items-center gap-2.5 rounded-full border border-gold/60 bg-paper/50 px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.3em] text-ink backdrop-blur-sm transition hover:bg-paper/80 active:scale-[0.98]"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3.5" y="5" width="17" height="15" rx="2" />
        <path d="M3.5 10h17M8 3v4M16 3v4" />
      </svg>
      Save the date
    </button>
  );
}
