import { Skyline } from "./art";

const palettes = {
  sunset: {
    haze: "rgba(249,210,165,.55)",
    sky: "linear-gradient(180deg,#d9c3c4 0%,#e8c6b9 26%,#f1c6a4 52%,#f6bf8e 66%,#f9d6a8 74%)",
    sun: "radial-gradient(circle,#fff6dc 0%,#ffe0ad 28%,rgba(255,206,150,.45) 52%,transparent 72%)",
    back: "#c4a8a6",
    front: "#9c8290",
    water: "linear-gradient(180deg,#e9b791 0%,#c79b8d 38%,#9f8392 100%)",
    lights: true,
  },
  dawn: {
    haze: "rgba(243,220,198,.6)",
    sky: "linear-gradient(180deg,#d7dde4 0%,#e5e3e2 30%,#efe1d3 56%,#f3d6bf 72%,#f4dcc6 80%)",
    sun: "radial-gradient(circle,#fff8ea 0%,#fbe6cc 34%,rgba(248,222,196,.4) 56%,transparent 74%)",
    back: "#b9bfcb",
    front: "#959cae",
    water: "linear-gradient(180deg,#e6d6c8 0%,#c9c5c9 45%,#adb2bf 100%)",
    lights: false,
  },
} as const;

/** Sky, glowing sun, drifting clouds, city skyline and shimmering water. */
export function Scene({ variant, horizon = "34%" }: { variant: keyof typeof palettes; horizon?: string }) {
  const p = palettes[variant];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0" style={{ background: p.sky }} />

      <div className="drift absolute inset-x-[-10%] top-[14%] h-[30%]">
        <div className="absolute left-[4%] top-[10%] h-10 w-56 rounded-full bg-white/45 blur-xl" />
        <div className="absolute right-[2%] top-[34%] h-8 w-64 rounded-full bg-white/40 blur-xl" />
        <div className="absolute left-[30%] top-[62%] h-6 w-48 rounded-full bg-white/35 blur-lg" />
      </div>

      <div
        className="absolute left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 translate-y-1/2 rounded-full"
        style={{ background: p.sun, bottom: horizon }}
      />

      <div className="absolute inset-x-0 bottom-0" style={{ height: horizon }}>
        <div className="relative h-[36%]">
          <Skyline className="absolute inset-0 h-full w-full opacity-90" back={p.back} front={p.front} lights={p.lights} />
          <div className="absolute inset-0" style={{ background: `linear-gradient(0deg, ${p.haze}, transparent 70%)` }} />
        </div>
        <div className="relative h-[64%] overflow-hidden" style={{ background: p.water }}>
          <Skyline
            className="absolute inset-x-0 top-0 h-[66%] w-full -scale-y-100 opacity-25 blur-[1.5px]"
            back={p.back}
            front={p.front}
          />
          <div
            className="shimmer absolute inset-0"
            style={{
              background:
                "repeating-linear-gradient(180deg,transparent 0 7px,rgba(255,240,215,.35) 7px 8px,transparent 8px 15px)",
              maskImage: "linear-gradient(180deg,#000,transparent 85%)",
              WebkitMaskImage: "linear-gradient(180deg,#000,transparent 85%)",
            }}
          />
          <div className="absolute left-1/2 top-0 h-full w-24 -translate-x-1/2 bg-gradient-to-b from-[#fff1d2]/70 to-transparent blur-md" />
        </div>
      </div>
    </div>
  );
}

const PETALS = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 37 + 11) % 100}%`,
  delay: `${-((i * 2.3) % 14)}s`,
  duration: `${12 + ((i * 5) % 9)}s`,
  drift: `${((i % 5) - 2) * 22}px`,
  size: 7 + ((i * 3) % 6),
  opacity: 0.55 + ((i * 7) % 4) * 0.1,
}));

/** A gentle fall of jasmine petals. */
export function Petals() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {PETALS.map((p, i) => (
        <svg
          key={i}
          viewBox="-6 -10 12 20"
          className="petal absolute top-0"
          width={p.size}
          height={p.size * 1.6}
          style={
            {
              left: p.left,
              "--petal-delay": p.delay,
              "--petal-duration": p.duration,
              "--petal-drift": p.drift,
              "--petal-opacity": p.opacity,
            } as React.CSSProperties
          }
        >
          <path d="M0 9 C-6 4 -6 -5 0 -9 C6 -5 6 4 0 9Z" fill="#fffaf0" stroke="#e1d4b6" strokeWidth="0.6" />
        </svg>
      ))}
    </div>
  );
}
