"use server";

export type RsvpInput = {
  name: string;
  attending: "yes" | "no";
  guests: number;
  guestNames: string;
  dietary: string;
};

export type RsvpResult = { ok: true } | { ok: false; error: string };

const clean = (s: unknown, max: number) => (typeof s === "string" ? s.trim().slice(0, max) : "");

export async function submitRsvp(input: RsvpInput): Promise<RsvpResult> {
  const name = clean(input?.name, 120);
  const attending = input?.attending;
  if (name.length < 2) return { ok: false, error: "Please share your name with us." };
  if (attending !== "yes" && attending !== "no") return { ok: false, error: "Please let us know if you can join." };

  const guests = attending === "yes" ? Math.min(10, Math.max(1, Math.floor(Number(input.guests) || 1))) : 0;
  const rsvp = {
    name,
    attending,
    guests,
    guestNames: attending === "yes" ? clean(input.guestNames, 300) : "",
    dietary: attending === "yes" ? clean(input.dietary, 300) : "",
    receivedAt: new Date().toISOString(),
  };

  // TODO: save somewhere you can read later (Google Sheet, database, or email).
  console.log("[RSVP]", JSON.stringify(rsvp));

  return { ok: true };
}
