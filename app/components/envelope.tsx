"use client";

import { useEffect, useState } from "react";
import { wedding } from "../wedding";
import { FloralSpray, Medallion } from "./art";

type Stage = "sealed" | "opening" | "leaving" | "gone";

/** A sealed envelope greets the guest; tapping it reveals the invitation. */
export function EnvelopeIntro() {
  const [stage, setStage] = useState<Stage>("sealed");

  useEffect(() => {
    const root = document.documentElement;
    if (stage === "gone") {
      root.style.overflow = "";
      return;
    }
    root.style.overflow = "hidden";
    if (stage === "leaving") root.dataset.opened = "";
  }, [stage]);

  if (stage === "gone") return null;

  const open = () => {
    if (stage !== "sealed") return;
    const quick = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setStage("opening");
    setTimeout(() => setStage("leaving"), quick ? 100 : 1700);
    setTimeout(() => setStage("gone"), quick ? 400 : 2600);
  };

  return (
    <div
      className={`paper fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden px-6 transition-all duration-[900ms] ease-out ${
        stage === "leaving" ? "pointer-events-none scale-[1.04] opacity-0" : "opacity-100"
      }`}
    >
      <FloralSpray seed={3} stems={8} className="pointer-events-none absolute -bottom-10 -left-12 w-[min(70vw,360px)]" />
      <FloralSpray seed={11} stems={6} className="pointer-events-none absolute -right-10 -top-8 w-[min(55vw,300px)] -scale-100" />

      <p lang="ar" dir="rtl" className="rise font-arabic text-[20px] text-[#7a5a2a]">
        بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
      </p>
      <p className="rise mt-3 text-[11px] font-medium uppercase tracking-[0.45em] text-ink-soft [animation-delay:150ms]">
        You are invited
      </p>

      <button
        type="button"
        onClick={open}
        aria-label="Open the invitation"
        data-open={stage !== "sealed" ? "" : undefined}
        className="envelope rise relative mt-40 aspect-[3/2] w-[min(82vw,340px)] cursor-pointer [animation-delay:300ms]"
      >
        {/* inside of the envelope */}
        <span className="absolute inset-0 rounded-[6px] bg-[#e6d9bf] shadow-[0_24px_50px_-24px_rgba(70,52,25,.55)]" />

        {/* the card tucked inside */}
        <span className="letter absolute inset-x-[7%] top-[6%] z-[2] flex h-[88%] flex-col items-center justify-start rounded-[4px] border border-gold/40 bg-paper pt-[9%] shadow-sm">
          <Medallion className="h-6 w-6" />
          <span className="mt-2 font-script text-[min(9vw,38px)] leading-tight text-ink">
            {wedding.partnerOne} <span className="font-serif text-[0.62em] italic">&amp;</span> {wedding.partnerTwo}
          </span>
          <span className="mt-1 text-[9px] uppercase tracking-[0.4em] text-ink-soft">{wedding.dateLabel}</span>
        </span>

        {/* front pocket */}
        <span
          className="absolute inset-0 z-[3] rounded-[6px] bg-[linear-gradient(160deg,#f3eadb,#e8dcc4)]"
          style={{ clipPath: "polygon(0 0, 50% 56%, 100% 0, 100% 100%, 0 100%)" }}
        />
        <span
          className="absolute inset-0 z-[3] rounded-[6px] border border-[#d6c6a6]"
          style={{ clipPath: "polygon(0 0, 50% 56%, 100% 0, 100% 100%, 0 100%)" }}
        />

        {/* top flap */}
        <span
          className="flap absolute inset-x-0 top-0 h-[60%] bg-[linear-gradient(180deg,#efe4cf,#e2d3b5)]"
          style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
        />

        {/* wax seal */}
        <span className="seal absolute left-1/2 top-[58%] z-[5] grid h-[68px] w-[68px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#d9bb84,#a67d3e_55%,#7c5826)] shadow-[0_6px_14px_-4px_rgba(60,40,10,.6),inset_0_2px_3px_rgba(255,235,190,.5),inset_0_-3px_6px_rgba(60,35,5,.4)]">
          <span className="grid h-[52px] w-[52px] place-items-center rounded-full border border-[#f0d9a8]/50">
            <span className="font-script text-[24px] leading-none text-[#fff2d6] [text-shadow:0_1px_1px_rgba(60,35,5,.6)]">
              {wedding.partnerOne[0]}<span className="font-serif text-[15px] italic">&amp;</span>{wedding.partnerTwo[0]}
            </span>
          </span>
        </span>
      </button>

      <p
        className={`mt-10 text-[12px] uppercase tracking-[0.4em] text-ink-soft transition-opacity duration-300 ${
          stage === "sealed" ? "nudge" : "opacity-0"
        }`}
      >
        Tap to open
      </p>
    </div>
  );
}
