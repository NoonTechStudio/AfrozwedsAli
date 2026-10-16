import { mapsUrl, wedding } from "../wedding";
import { ArchTop, Divider, FloralSpray, Lantern, Medallion } from "./art";
import { Couple } from "./couple";
import { Petals, Scene } from "./scene";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export function Hero() {
  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden">
      <Scene variant="sunset" horizon="32%" />

      {/* Sandstone arch framing the sky */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex flex-col">
        <ArchTop className="block w-full shrink-0" />
        <div className="relative flex-1">
          <div className="pillar absolute inset-y-0 left-0 w-[9.5%] shadow-[inset_-3px_0_0_#f3dcae,inset_-4px_0_0_#9c7445]" />
          <div className="pillar absolute inset-y-0 right-0 w-[9.5%] shadow-[inset_3px_0_0_#f3dcae,inset_4px_0_0_#9c7445]" />
          {/* carved capitals where the arch meets the pillars */}
          <div className="absolute -top-px left-0 h-3 w-[12.5%] rounded-r-sm bg-[linear-gradient(180deg,#f0d6a6,#c49a66_60%,#9c7445)] shadow-[0_3px_5px_-2px_rgba(80,55,25,.45)]" />
          <div className="absolute -top-px right-0 h-3 w-[12.5%] rounded-l-sm bg-[linear-gradient(180deg,#f0d6a6,#c49a66_60%,#9c7445)] shadow-[0_3px_5px_-2px_rgba(80,55,25,.45)]" />
        </div>
      </div>

      <div aria-hidden className="pointer-events-none absolute right-[19%] top-[3%] w-[12%] max-w-[58px]">
        <Lantern className="sway w-full" />
      </div>

      <FloralSpray seed={11} stems={6} className="pointer-events-none absolute -left-8 -top-6 w-[52%] -scale-y-100" />
      <FloralSpray seed={3} stems={8} className="pointer-events-none absolute -bottom-8 -left-10 w-[74%]" />
      <FloralSpray seed={29} stems={6} className="pointer-events-none absolute -bottom-6 -right-8 w-[50%] -scale-x-100" />

      <Petals />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-[11%] pt-[min(22vw,104px)] pb-[25svh] text-center">
        <p
          lang="ar"
          dir="rtl"
          className="hero-in font-arabic text-[19px] leading-loose text-[#7a5a2a] text-glow"
          style={d(100)}
        >
          بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </p>

        <p className="hero-in mt-4 text-[11px] font-medium uppercase tracking-[0.5em] text-ink" style={d(350)}>
          Our Celebration
        </p>
        <div className="hero-in" style={d(500)}>
          <Divider className="mt-3" />
        </div>

        <h1
          className="hero-in mt-3 font-script text-[min(8vw,40px)] leading-[1.2] text-ink text-glow"
          style={d(700)}
        >
          <Couple />
        </h1>

        <p className="hero-in mt-3 max-w-[16rem] font-serif text-[19px] leading-snug text-ink-soft text-glow" style={d(1000)}>
          We&rsquo;d love to celebrate this beautiful beginning with you.
        </p>

        <p className="hero-in mt-7 text-[13px] font-medium uppercase tracking-[0.42em] text-ink" style={d(1250)}>
          {wedding.dateLabel}
        </p>
        <p className="hero-in mt-2 text-[12px] font-medium uppercase tracking-[0.3em] text-ink" style={d(1300)}>
          {wedding.timeLabel}
        </p>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hero-in mt-3 font-serif text-ink-soft text-glow transition hover:text-ink"
          style={d(1350)}
        >
          <span className="block text-[19px] italic">{wedding.venue}</span>
          <span className="block text-[14px] leading-snug">{wedding.address}</span>
        </a>

        <a
          href="#rsvp"
          className="hero-in group mt-8 inline-flex items-center gap-3 rounded-[4px] bg-olive px-9 py-3.5 text-[12px] font-medium uppercase tracking-[0.35em] text-cream shadow-[0_10px_24px_-10px_rgba(58,68,38,.7)] transition hover:bg-olive-deep active:scale-[0.98]"
          style={d(1500)}
        >
          RSVP
          <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
        </a>

        <div className="hero-in" style={d(1750)}>
          <Medallion className="mt-7 h-8 w-8" />
        </div>
      </div>

      <a
        href="#countdown"
        aria-label="Scroll to the countdown"
        className="nudge absolute bottom-5 left-1/2 z-30 -translate-x-1/2 text-white drop-shadow"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </a>
    </section>
  );
}
