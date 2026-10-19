// All the invitation details live here — edit once, updates everywhere.
export const wedding = {
  partnerOne: "Ali Akbar Sorangwala",
  partnerTwo: "Afroz Surti",
  dateLabel: "November 1, 2026",
  dateShort: "11.01.2026",
  timeLabel: "1:00 PM – 5:00 PM",
  // Afternoon in New York (EST, UTC−5 — daylight saving ends early on Nov 1).
  // Used by the countdown and "Save the date".
  startsAt: "2026-11-01T13:00:00-05:00",
  endsAt: "2026-11-01T17:00:00-05:00",
  venue: "Red Chilli Restaurant",
  address: "76-05 37th Ave, Jackson Heights, NY 11372",
  city: "New York",
  // WhatsApp number that receives RSVPs — full international format, digits only (e.g. "19175551234").
  whatsapp: "19179160413",
  tagline: "Together is a beautiful place to be",
};

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${wedding.venue}, ${wedding.address}`,
)}`;
