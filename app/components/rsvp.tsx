"use client";

import { useState, useSyncExternalStore, useTransition } from "react";
import { submitRsvp, type RsvpInput } from "../actions";
import { wedding } from "../wedding";
import { Divider, FloralSpray, Heart, Medallion, MosqueSilhouette } from "./art";
import { Couple } from "./couple";

const STORAGE_KEY = "ali-afroz-rsvp";
const CHANGE_EVENT = "rsvp-change";

function readSaved(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}
function writeSaved(value: RsvpInput | null) {
  try {
    if (value) localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    else localStorage.removeItem(STORAGE_KEY);
  } catch {}
  window.dispatchEvent(new Event(CHANGE_EVENT));
}
function subscribe(cb: () => void) {
  window.addEventListener(CHANGE_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(CHANGE_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

const inputClass =
  "w-full rounded-md border border-line bg-white/75 px-4 py-3 text-[15px] text-ink placeholder:text-[#a69f92] outline-none transition focus:border-olive/60 focus:bg-white focus:ring-4 focus:ring-olive/10";
const labelClass = "mb-2 block text-left text-[14px] font-medium text-ink";
const primaryButton =
  "group flex w-full items-center justify-center gap-3 rounded-md bg-olive px-6 py-4 text-[12px] font-medium uppercase tracking-[0.32em] text-cream shadow-[0_12px_26px_-14px_rgba(58,68,38,.9)] transition enabled:hover:bg-olive-deep enabled:active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-sage disabled:shadow-none";

export function Rsvp() {
  const savedRaw = useSyncExternalStore(subscribe, readSaved, () => null);
  const saved = savedRaw ? (JSON.parse(savedRaw) as RsvpInput) : null;

  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState<RsvpInput>({ name: "", attending: "yes", guests: 1, guestNames: "", dietary: "" });
  const [answered, setAnswered] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  const set = <K extends keyof RsvpInput>(key: K, value: RsvpInput[K]) => setForm((f) => ({ ...f, [key]: value }));
  const canContinue = form.name.trim().length >= 2 && answered;

  const send = () => {
    setError("");
    startTransition(async () => {
      const res = await submitRsvp(form).catch(() => ({ ok: false as const, error: "" }));
      if (res.ok) {
        writeSaved(form);
        document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        setError(res.error || "Something went wrong — please try again in a moment.");
      }
    });
  };

  const goTo = (s: 1 | 2) => {
    setStep(s);
    document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const next = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canContinue) return;
    if (form.attending === "no") send();
    else goTo(2);
  };

  const edit = () => {
    if (saved) {
      setForm(saved);
      setAnswered(true);
    }
    setStep(1);
    writeSaved(null);
  };

  return (
    <section id="rsvp" className="paper relative isolate flex min-h-svh scroll-mt-0 flex-col overflow-hidden">
      <FloralSpray seed={73} stems={6} className="pointer-events-none absolute -left-10 -top-8 w-[56%] -scale-y-100" />
      <FloralSpray seed={88} stems={6} className="pointer-events-none absolute -bottom-8 -right-10 w-[54%] -scale-x-100" />

      <div className="relative z-10 mx-auto flex w-full max-w-[400px] flex-1 flex-col justify-center px-7 py-20">
        {saved ? (
          <ThankYou rsvp={saved} onEdit={edit} />
        ) : (
          <div key={step} className="rise text-center">
            <Medallion className="mx-auto h-8 w-8" />
            <p className="mt-5 text-[12px] font-medium uppercase tracking-[0.5em] text-ink">RSVP</p>

            {step === 1 ? (
              <form onSubmit={next} noValidate>
                <h2 className="mt-4 font-serif text-[34px] font-medium leading-[1.1] text-ink">
                  We&rsquo;d love to have you there
                </h2>
                <Heart className="mx-auto mt-3 h-5 w-5 text-ink" />
                <p className="mx-auto mt-3 max-w-[17rem] text-[14.5px] leading-relaxed text-ink-soft">
                  Please let us know if you&rsquo;ll be joining us for our special day.
                </p>

                <div className="mt-9">
                  <label htmlFor="name" className={labelClass}>
                    Your Name <span className="text-[#c0574b]">*</span>
                  </label>
                  <input
                    id="name"
                    autoComplete="name"
                    placeholder="First and Last Name"
                    className={inputClass}
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                  />
                </div>

                <fieldset className="mt-7 text-left">
                  <legend className={labelClass}>
                    Will you be joining us? <span className="text-[#c0574b]">*</span>
                  </legend>
                  {(
                    [
                      ["yes", "Yes, I’ll be there"],
                      ["no", "Sadly, I can’t make it"],
                    ] as const
                  ).map(([value, text]) => {
                    const checked = answered && form.attending === value;
                    return (
                      <label
                        key={value}
                        className={`mt-2 flex cursor-pointer items-center gap-3.5 rounded-md border px-3.5 py-3 transition ${
                          checked ? "border-olive/40 bg-olive/[0.06]" : "border-transparent hover:bg-black/[0.02]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="attending"
                          value={value}
                          checked={checked}
                          onChange={() => {
                            set("attending", value);
                            setAnswered(true);
                          }}
                          className="peer sr-only"
                        />
                        <span
                          className={`grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full border transition peer-focus-visible:ring-4 peer-focus-visible:ring-olive/15 ${
                            checked ? "border-olive" : "border-[#b9b2a4] bg-white/70"
                          }`}
                        >
                          <span className={`h-2.5 w-2.5 rounded-full bg-olive transition ${checked ? "scale-100" : "scale-0"}`} />
                        </span>
                        <span className="text-[15px] text-ink">{text}</span>
                      </label>
                    );
                  })}
                </fieldset>

                {error && <p className="mt-5 text-[14px] text-[#b24c40]">{error}</p>}

                <button type="submit" disabled={!canContinue || pending} className={`${primaryButton} mt-9`}>
                  {pending ? "Sending…" : answered && form.attending === "no" ? "Send RSVP" : "Next"}
                  {!pending && <span className="transition-transform group-enabled:group-hover:translate-x-1">&rarr;</span>}
                </button>
              </form>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send();
                }}
              >
                <h2 className="mt-4 font-serif text-[38px] font-medium leading-[1.1] text-ink">Almost there!</h2>
                <p className="mt-2 text-[15px] text-ink-soft">Just a few more details&hellip;</p>

                <div className="mt-9">
                  <label htmlFor="guests" className={labelClass}>
                    Number of guests attending <span className="text-[#c0574b]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="guests"
                      className={`${inputClass} appearance-none pr-10`}
                      value={form.guests}
                      onChange={(e) => set("guests", Number(e.target.value))}
                    >
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                    <svg
                      viewBox="0 0 24 24"
                      className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="guestNames" className={labelClass}>
                    Guest name(s) <span className="font-normal text-ink-soft">(if applicable)</span>
                  </label>
                  <input
                    id="guestNames"
                    placeholder="e.g. Spouse, Children, etc."
                    className={inputClass}
                    value={form.guestNames}
                    onChange={(e) => set("guestNames", e.target.value)}
                  />
                </div>

                <div className="mt-6">
                  <label htmlFor="dietary" className={labelClass}>
                    Any dietary restrictions or allergies?
                  </label>
                  <textarea
                    id="dietary"
                    rows={3}
                    placeholder="e.g. Vegetarian, Nut allergy, etc."
                    className={`${inputClass} resize-none`}
                    value={form.dietary}
                    onChange={(e) => set("dietary", e.target.value)}
                  />
                </div>

                {error && <p className="mt-5 text-[14px] text-[#b24c40]">{error}</p>}

                <button type="submit" disabled={pending} className={`${primaryButton} mt-9`}>
                  {pending ? "Sending…" : "Confirm RSVP"}
                  {!pending && <span className="transition-transform group-hover:translate-x-1">&rarr;</span>}
                </button>
                <button
                  type="button"
                  onClick={() => goTo(1)}
                  className="mt-5 text-[14px] text-ink underline decoration-ink/40 underline-offset-4 hover:decoration-ink"
                >
                  Back
                </button>
              </form>
            )}

            <Divider className="mt-12" tone="soft" />
          </div>
        )}
      </div>
    </section>
  );
}

const CUSPED_ARCH =
  "M1 140 V104 C1 90 10 84 22 84 C28 66 44 58 62 58 C74 36 102 24 126 20 C139 18 146 12 150 2 C154 12 161 18 174 20 C198 24 226 36 238 58 C256 58 272 66 278 84 C290 84 299 90 299 104 V140";

function ThankYou({ rsvp, onEdit }: { rsvp: RsvpInput; onEdit: () => void }) {
  const firstName = rsvp.name.trim().split(/\s+/)[0];
  const coming = rsvp.attending === "yes";

  return (
    <div className="rise relative mx-auto w-full">
      {/* Mughal arch outline */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex flex-col">
        <svg viewBox="0 0 300 140" className="block w-full shrink-0" preserveAspectRatio="none">
          <path d={CUSPED_ARCH} fill="#f8f2e6" stroke="url(#gold)" strokeWidth="1.3" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="-mt-px flex-1 rounded-b-md border-x border-b border-gold/80 bg-[#f8f2e6]" />
      </div>
      <MosqueSilhouette className="pointer-events-none absolute bottom-1 right-2 w-[52%] text-[#ebe0ca]" />
      <FloralSpray seed={5} stems={6} className="pointer-events-none absolute -bottom-8 -left-10 w-[60%]" />

      <div className="relative px-6 pb-40 pt-[26%] text-center">
        <Medallion className="mx-auto h-8 w-8" />
        <h2 className="mt-5 font-serif text-[44px] font-medium leading-none text-ink">Thank you{firstName ? "," : ""}</h2>
        {firstName && <p className="mt-1 font-serif text-[30px] italic text-ink">{firstName}</p>}
        <Heart className="breathe mx-auto mt-3 h-5 w-5 text-ink" />
        <p className="mx-auto mt-3 max-w-[15rem] font-serif text-[20px] leading-snug text-ink-soft">
          {coming
            ? "We can’t wait to celebrate with you!"
            : "You’ll be dearly missed. Please keep us in your duas."}
        </p>
        <p className="mt-6 font-script text-[min(8.5vw,38px)] leading-tight text-ink">
          <Couple />
        </p>
        <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.42em] text-ink">{wedding.dateLabel}</p>
        <Divider className="mt-6" />
        <p className="mt-5 font-serif text-[20px] text-ink">{coming ? "See you there!" : "With love & gratitude"}</p>
        <button
          type="button"
          onClick={onEdit}
          className="relative z-10 mt-6 text-[13px] text-ink-soft underline decoration-ink/30 underline-offset-4 hover:text-ink"
        >
          Need to change your RSVP?
        </button>
      </div>
    </div>
  );
}
