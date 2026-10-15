import { FloralSpray, Heart, Medallion } from "./components/art";
import { Countdown } from "./components/countdown";
import { EnvelopeIntro } from "./components/envelope";
import { Hero } from "./components/hero";
import { Reveal } from "./components/reveal";
import { Rsvp } from "./components/rsvp";
import { wedding } from "./wedding";

export default function Home() {
  return (
    <>
      <EnvelopeIntro />

      {/* Linen backdrop with florals, seen around the card on larger screens */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 hidden md:block">
        <FloralSpray seed={3} stems={9} className="absolute -bottom-16 -left-16 w-[420px] opacity-80" />
        <FloralSpray seed={57} stems={8} className="absolute -right-16 -top-16 w-[380px] -scale-100 opacity-70" />
      </div>

      <main className="relative mx-auto w-full max-w-[480px] overflow-hidden bg-paper md:my-12 md:rounded-[28px] md:shadow-[0_40px_90px_-40px_rgba(70,52,25,.55),0_0_0_1px_rgba(176,136,72,.18)]">
        <Hero />
        <Countdown />
        <Rsvp />

        <footer className="paper border-t border-line/70 px-8 pb-14 pt-12 text-center">
          <Reveal>
            <Medallion className="mx-auto h-7 w-7" />
            <p className="mx-auto mt-5 max-w-[18rem] font-serif text-[19px] italic leading-snug text-ink-soft">
              Your presence is our joy, and your duas our most cherished gift.
            </p>
            <p className="mt-6 font-script text-[34px] leading-tight text-ink">
              {wedding.partnerOne} <span className="font-serif text-[0.62em] italic">&amp;</span> {wedding.partnerTwo}
            </p>
            <p className="mt-2 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.4em] text-ink-soft">
              {wedding.dateShort}
            </p>
            <Heart className="mx-auto mt-5 h-4 w-4 text-gold" />
          </Reveal>
        </footer>
      </main>
    </>
  );
}
