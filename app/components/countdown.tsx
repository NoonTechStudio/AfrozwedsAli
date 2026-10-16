import { wedding } from "../wedding";
import { Divider, FloralSpray, Heart, Medallion } from "./art";
import { CountdownTimer, SaveTheDate } from "./countdown-timer";
import { Couple } from "./couple";
import { Reveal } from "./reveal";
import { Scene } from "./scene";

export function Countdown() {
  return (
    <section id="countdown" className="relative isolate flex min-h-svh flex-col overflow-hidden">
      <Scene variant="dawn" horizon="27%" />

      <FloralSpray seed={3} stems={7} className="pointer-events-none absolute -bottom-10 -left-10 w-[58%]" />
      <FloralSpray seed={29} stems={7} className="pointer-events-none absolute -bottom-10 -right-10 w-[54%] -scale-x-100" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-[30svh] pt-16 text-center">
        <Reveal>
          <Medallion className="mx-auto h-9 w-9" />
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.42em] text-ink">Counting down to our celebration</p>
        </Reveal>
        <Reveal delay={240} className="mt-8 w-full max-w-sm">
          <CountdownTimer />
        </Reveal>
        <Reveal delay={360}>
          <Divider className="mt-9" />
        </Reveal>
        <Reveal delay={460}>
          <p className="mt-5 font-script text-[min(7.5vw,36px)] leading-tight text-ink">
            <Couple />
          </p>
          <p className="mt-2 text-[12px] font-medium uppercase tracking-[0.42em] text-ink">{wedding.dateLabel}</p>
          <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.3em] text-ink-soft">{wedding.timeLabel}</p>
          <p className="mt-2 font-serif text-[17px] italic text-ink-soft">{wedding.venue}</p>
          <p className="font-serif text-[14px] text-ink-soft">{wedding.address}</p>
        </Reveal>
        <Reveal delay={600}>
          <p className="mt-10 font-script text-[26px] text-ink-soft">{wedding.tagline}</p>
          <Heart className="breathe mx-auto mt-3 h-5 w-5 text-ink-soft" />
        </Reveal>
        <Reveal delay={720} className="mt-8">
          <SaveTheDate />
        </Reveal>
      </div>
    </section>
  );
}
