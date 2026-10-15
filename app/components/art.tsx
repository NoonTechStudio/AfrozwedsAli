// Hand-drawn SVG artwork for the invitation. Everything is generated with a
// seeded random so the server and browser always draw identical florals.

type Rand = () => number;

function seeded(seed: number): Rand {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r2 = (n: number) => Math.round(n * 100) / 100;

/* ------------------------------------------------------------------ */
/* Shared gradients, rendered once in the layout                       */
/* ------------------------------------------------------------------ */

export function SvgDefs() {
  return (
    <svg aria-hidden width="0" height="0" className="absolute">
      <defs>
        <linearGradient id="jas-a" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#e9dfc4" />
          <stop offset="0.45" stopColor="#fbf6ea" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
        <linearGradient id="jas-b" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#e2d6b8" />
          <stop offset="0.5" stopColor="#f6f0e1" />
          <stop offset="1" stopColor="#fffdf8" />
        </linearGradient>
        <linearGradient id="leaf-a" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7c8c55" />
          <stop offset="1" stopColor="#3f4a29" />
        </linearGradient>
        <linearGradient id="leaf-b" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#97a46c" />
          <stop offset="1" stopColor="#56643a" />
        </linearGradient>
        <linearGradient id="bud" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#e8dcc0" />
          <stop offset="1" stopColor="#fffaf0" />
        </linearGradient>
        <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e3c78f" />
          <stop offset="0.5" stopColor="#b08848" />
          <stop offset="1" stopColor="#8a6631" />
        </linearGradient>
        <linearGradient id="sandstone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c49a66" />
          <stop offset="0.6" stopColor="#ddbb8a" />
          <stop offset="1" stopColor="#cfa673" />
        </linearGradient>
        <radialGradient id="lantern-glass" cx="0.5" cy="0.55" r="0.6">
          <stop offset="0" stopColor="#fff6d8" />
          <stop offset="0.55" stopColor="#ffd88e" />
          <stop offset="1" stopColor="#d48f3e" />
        </radialGradient>
        <radialGradient id="lantern-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffe7b0" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffd38a" stopOpacity="0" />
        </radialGradient>
        <pattern id="jali" width="14" height="14" patternUnits="userSpaceOnUse">
          <path
            d="M7 0 L14 7 L7 14 L0 7 Z M7 4 L10 7 L7 10 L4 7 Z"
            fill="none"
            stroke="#a07848"
            strokeWidth="0.7"
          />
        </pattern>
        <filter id="soft-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.6" floodColor="#3b2f1c" floodOpacity="0.22" />
        </filter>
      </defs>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Florals                                                             */
/* ------------------------------------------------------------------ */

const PETAL = "M0 0 C-7 -5 -9.5 -15 -4.5 -20.5 C-2 -23 2 -23 4.5 -20.5 C9.5 -15 7 -5 0 0Z";
const LEAF = "M0 0 C10 -8 27 -9 42 0 C27 9 10 8 0 0Z";

function Jasmine({ x, y, s, rot, alt }: { x: number; y: number; s: number; rot: number; alt: boolean }) {
  return (
    <g transform={`translate(${r2(x)} ${r2(y)}) rotate(${r2(rot)}) scale(${r2(s)})`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <path
          key={i}
          d={PETAL}
          transform={`rotate(${i * 72})`}
          fill={`url(#${(i + (alt ? 1 : 0)) % 2 ? "jas-b" : "jas-a"})`}
          stroke="#d3c5a4"
          strokeWidth="0.5"
        />
      ))}
      <circle r="3.4" fill="#d9c47c" />
      <circle r="1.6" fill="#a99447" />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={r2(Math.cos((i * 72 + 36) * (Math.PI / 180)) * 4.6)} cy={r2(Math.sin((i * 72 + 36) * (Math.PI / 180)) * 4.6)} r="0.7" fill="#b9a24f" />
      ))}
    </g>
  );
}

function Leaf({ x, y, s, rot, tone }: { x: number; y: number; s: number; rot: number; tone: "a" | "b" }) {
  return (
    <g transform={`translate(${r2(x)} ${r2(y)}) rotate(${r2(rot)}) scale(${r2(s)})`}>
      <path d={LEAF} fill={`url(#leaf-${tone})`} />
      <path d="M2 0 Q20 -1 38 0" stroke="#a9b67c" strokeWidth="0.6" fill="none" opacity="0.55" />
    </g>
  );
}

function Bud({ x, y, s, rot }: { x: number; y: number; s: number; rot: number }) {
  return (
    <g transform={`translate(${r2(x)} ${r2(y)}) rotate(${r2(rot)}) scale(${r2(s)})`}>
      <ellipse cx="10" cy="0" rx="9" ry="3.8" fill="url(#bud)" stroke="#d3c5a4" strokeWidth="0.5" />
      <path d="M0 0 C3 -4 7 -3.5 8 0 C7 3.5 3 4 0 0Z" fill="#5f6d3c" />
    </g>
  );
}

type FloralProps = { seed?: number; stems?: number; className?: string; style?: React.CSSProperties };

/** A spray of jasmine growing from the bottom-left corner. Flip with CSS for other corners. */
export function FloralSpray({ seed = 7, stems = 7, className, style }: FloralProps) {
  const rand = seeded(seed);
  const ox = 6;
  const oy = 314;
  const stemPaths: string[] = [];
  const leaves: React.ReactNode[] = [];
  const flowers: React.ReactNode[] = [];

  for (let i = 0; i < stems; i++) {
    const a = ((-84 + (78 * i) / (stems - 1) + (rand() - 0.5) * 10) * Math.PI) / 180;
    const len = 130 + rand() * 160;
    const bend = (rand() - 0.5) * 70;
    const x2 = ox + Math.cos(a) * len;
    const y2 = oy + Math.sin(a) * len;
    const cx = (ox + x2) / 2 - Math.sin(a) * bend;
    const cy = (oy + y2) / 2 + Math.cos(a) * bend;
    stemPaths.push(`M${ox} ${oy} Q${r2(cx)} ${r2(cy)} ${r2(x2)} ${r2(y2)}`);

    const at = (t: number) => {
      const u = 1 - t;
      return {
        x: u * u * ox + 2 * u * t * cx + t * t * x2,
        y: u * u * oy + 2 * u * t * cy + t * t * y2,
        deg: (Math.atan2(2 * u * (cy - oy) + 2 * t * (y2 - cy), 2 * u * (cx - ox) + 2 * t * (x2 - cx)) * 180) / Math.PI,
      };
    };

    let side = rand() > 0.5 ? 1 : -1;
    for (let t = 0.2 + rand() * 0.08; t < 0.9; t += 0.13 + rand() * 0.06) {
      const p = at(t);
      leaves.push(
        <Leaf
          key={`l${i}-${t}`}
          x={p.x}
          y={p.y}
          s={(0.62 + rand() * 0.45) * (1.25 - t * 0.55)}
          rot={p.deg + side * (42 + rand() * 22)}
          tone={rand() > 0.55 ? "b" : "a"}
        />,
      );
      side *= -1;
    }

    const tip = at(1);
    if (rand() > 0.28) {
      flowers.push(<Jasmine key={`f${i}`} x={tip.x} y={tip.y} s={0.95 + rand() * 0.6} rot={rand() * 72} alt={rand() > 0.5} />);
    } else {
      flowers.push(<Bud key={`b${i}`} x={tip.x} y={tip.y} s={1 + rand() * 0.3} rot={tip.deg} />);
    }
    if (rand() > 0.35) {
      const p = at(0.52 + rand() * 0.2);
      const off = (rand() - 0.5) * 22;
      flowers.push(<Jasmine key={`m${i}`} x={p.x + off} y={p.y - Math.abs(off) * 0.4} s={0.7 + rand() * 0.45} rot={rand() * 72} alt={rand() > 0.5} />);
    }
    if (rand() > 0.55) {
      const p = at(0.82);
      flowers.push(<Bud key={`bb${i}`} x={p.x} y={p.y} s={0.75} rot={p.deg - 35} />);
    }
  }

  // A dense little bouquet near the root
  for (let k = 0; k < 4; k++) {
    flowers.push(
      <Jasmine key={`r${k}`} x={ox + 18 + rand() * 52} y={oy - 16 - rand() * 52} s={1.05 + rand() * 0.5} rot={rand() * 72} alt={k % 2 === 0} />,
    );
  }

  return (
    <svg viewBox="0 0 320 320" aria-hidden className={className} style={style}>
      <g filter="url(#soft-shadow)">
        <path d={stemPaths.join(" ")} stroke="#556236" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {leaves}
        {flowers}
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Ornaments                                                           */
/* ------------------------------------------------------------------ */

export function Medallion({ className }: { className?: string }) {
  return (
    <svg viewBox="-50 -50 100 100" aria-hidden className={className}>
      <g fill="none" stroke="url(#gold)" strokeWidth="2.4" strokeLinejoin="round">
        {Array.from({ length: 8 }, (_, i) => (
          <path key={`p${i}`} d="M0 -11 C9 -21 9 -35 0 -45 C-9 -35 -9 -21 0 -11Z" transform={`rotate(${i * 45})`} />
        ))}
        {Array.from({ length: 8 }, (_, i) => (
          <path key={`q${i}`} d="M0 -12 C5 -19 5 -26 0 -32 C-5 -26 -5 -19 0 -12Z" transform={`rotate(${i * 45 + 22.5})`} />
        ))}
        <circle r="10.5" />
      </g>
      <circle r="4.5" fill="url(#gold)" />
      {Array.from({ length: 8 }, (_, i) => (
        <circle key={`d${i}`} cx="0" cy="-39" r="2.2" fill="url(#gold)" transform={`rotate(${i * 45 + 22.5})`} />
      ))}
    </svg>
  );
}

export function Divider({ className = "", tone = "gold" }: { className?: string; tone?: "gold" | "soft" }) {
  const line = tone === "gold" ? "from-transparent via-gold/70 to-gold/70" : "from-transparent via-gold-soft to-gold-soft";
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden>
      <span className={`h-px w-16 bg-gradient-to-r ${line}`} />
      <svg viewBox="-10 -10 20 20" className="h-3.5 w-3.5">
        <path d="M0 -8 L8 0 L0 8 L-8 0Z" fill="none" stroke="url(#gold)" strokeWidth="1.6" />
        <circle r="2.2" fill="url(#gold)" />
      </svg>
      <span className={`h-px w-16 bg-gradient-to-l ${line}`} />
    </div>
  );
}

export function Heart({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path
        d="M12 20.5s-7.5-4.6-9.3-9.4C1.5 7.8 3.6 4.5 7 4.5c2.1 0 3.6 1.2 5 3 1.4-1.8 2.9-3 5-3 3.4 0 5.5 3.3 4.3 6.6-1.8 4.8-9.3 9.4-9.3 9.4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Architecture                                                        */
/* ------------------------------------------------------------------ */

const ARCH_EDGE =
  "M38 401 L38 214 C38 140 104 96 156 70 C180 58 194 46 200 26 C206 46 220 58 244 70 C296 96 362 140 362 214 L362 401";
const ARCH_OPENING = `${ARCH_EDGE} Z`;

/** Top of a Mughal sandstone arch — fixed aspect, sits at the top of the hero. */
export function ArchTop({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" aria-hidden className={className} preserveAspectRatio="xMidYMin meet">
      <path d={`M0 0 H400 V400 H0 Z ${ARCH_OPENING}`} fill="url(#sandstone)" fillRule="evenodd" />
      <path d={`M0 0 H400 V400 H0 Z ${ARCH_OPENING}`} fill="url(#jali)" fillRule="evenodd" opacity="0.4" />
      {/* carved border around the opening */}
      <path d={ARCH_EDGE} fill="none" stroke="#f3dcae" strokeWidth="7" />
      <path d={ARCH_EDGE} fill="none" stroke="#9c7445" strokeWidth="1.4" />
      <path
        d="M24 400 L24 210 C24 128 96 84 150 56 C176 42 192 28 200 8 C208 28 224 42 250 56 C304 84 376 128 376 210 L376 400"
        fill="none"
        stroke="#a57d4c"
        strokeWidth="1"
        opacity="0.7"
      />
      {/* little rosettes on the spandrels */}
      <g transform="translate(70 52) scale(0.32)" opacity="0.75">
        <Rosette />
      </g>
      <g transform="translate(330 52) scale(0.32)" opacity="0.75">
        <Rosette />
      </g>
    </svg>
  );
}

function Rosette() {
  return (
    <g fill="none" stroke="#8f6a3c" strokeWidth="3">
      {Array.from({ length: 8 }, (_, i) => (
        <path key={i} d="M0 -8 C10 -18 10 -32 0 -42 C-10 -32 -10 -18 0 -8Z" transform={`rotate(${i * 45})`} />
      ))}
      <circle r="8" />
    </g>
  );
}

export function Lantern({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 180" aria-hidden className={className}>
      <circle cx="30" cy="100" r="38" fill="url(#lantern-glow)" className="flicker" />
      <line x1="30" y1="0" x2="30" y2="44" stroke="#7d5f33" strokeWidth="1.6" strokeDasharray="3.5 2" />
      <circle cx="30" cy="46" r="3.2" fill="none" stroke="#7d5f33" strokeWidth="1.4" />
      <path d="M14 66 C14 54 24 50 30 49 C36 50 46 54 46 66 Z" fill="url(#gold)" />
      <path d="M11 66 H49 V70 H11 Z" fill="#8a6631" />
      <path d="M13 70 H47 L52 92 L47 126 H13 L8 92 Z" fill="url(#lantern-glass)" stroke="#7d5f33" strokeWidth="1.3" />
      <g stroke="#7d5f33" strokeWidth="0.9" opacity="0.75" fill="none">
        <path d="M22 70 L20 92 L22 126 M30 70 V126 M38 70 L40 92 L38 126 M8 92 H52" />
        <path d="M13 81 Q30 76 47 81 M13 110 Q30 115 47 110" />
      </g>
      <path d="M12 126 H48 L41 137 H19 Z" fill="url(#gold)" />
      <path d="M27 137 L30 152 L33 137 Z" fill="#8a6631" />
      <circle cx="30" cy="154" r="2.4" fill="#8a6631" />
    </svg>
  );
}

export function MosqueSilhouette({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 170" aria-hidden className={className}>
      <g fill="currentColor">
        {/* minarets */}
        <path d="M24 170 V58 h10 V170 Z M21 58 h16 v-4 h-16 Z M22 54 C22 44 29 40 29 34 C29 40 36 44 36 54 Z M28 34 v-8 h2 v8 Z" />
        <path d="M186 170 V58 h10 V170 Z M183 58 h16 v-4 h-16 Z M184 54 C184 44 191 40 191 34 C191 40 198 44 198 54 Z M190 34 v-8 h2 v8 Z" />
        <path d="M21 96 h16 v3 h-16 Z M183 96 h16 v3 h-16 Z M21 130 h16 v3 h-16 Z M183 130 h16 v3 h-16 Z" />
        {/* main hall */}
        <path d="M52 170 V96 H168 V170 Z" />
        {/* great dome */}
        <path d="M70 96 C64 70 86 58 100 48 C106 44 109 38 110 30 C111 38 114 44 120 48 C134 58 156 70 150 96 Z" />
        <path d="M109 30 v-12 h2 v12 Z M106 16 a4 4 0 1 0 8 0 a3 3 0 1 1 -8 0Z" />
        {/* side domes */}
        <path d="M54 96 C52 84 60 78 66 74 C68 72 69 70 69 66 C69 70 70 72 72 74 C78 78 86 84 84 96 Z" />
        <path d="M136 96 C134 84 142 78 148 74 C150 72 151 70 151 66 C151 70 152 72 154 74 C160 78 168 84 166 96 Z" />
      </g>
      {/* doorway cut */}
      <path d="M98 170 V138 C98 128 104 124 110 120 C116 124 122 128 122 138 V170 Z" fill="#fbf7ef" opacity="0.55" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Skyline                                                             */
/* ------------------------------------------------------------------ */

type SkylineProps = {
  className?: string;
  back: string;
  front: string;
  lights?: boolean;
  seed?: number;
};

export function Skyline({ className, back, front, lights = false, seed = 21 }: SkylineProps) {
  const rand = seeded(seed);
  const H = 180;
  const rect = (x: number, w: number, h: number) => `M${r2(x)} ${H} V${r2(H - h)} H${r2(x + w)} V${H} Z`;

  const backParts: string[] = [];
  for (let x = -10; x < 810; ) {
    const w = 16 + rand() * 30;
    const h = 34 + rand() * 62 + (rand() > 0.85 ? 34 : 0);
    backParts.push(rect(x, w, h));
    if (rand() > 0.82) backParts.push(`M${r2(x + w / 2 - 1)} ${r2(H - h)} V${r2(H - h - 18)} H${r2(x + w / 2 + 1)} V${r2(H - h)} Z`);
    x += w + rand() * 4;
  }

  const frontParts: string[] = [];
  const windows: React.ReactNode[] = [];
  const addBuilding = (x: number, w: number, h: number) => {
    frontParts.push(rect(x, w, h));
    if (!lights) return;
    for (let wy = H - h + 6; wy < H - 4; wy += 7) {
      for (let wx = x + 3; wx < x + w - 3; wx += 5) {
        if (rand() > 0.86) windows.push(<rect key={`${wx}-${wy}`} x={r2(wx)} y={r2(wy)} width="1.6" height="2.4" />);
      }
    }
  };
  for (let x = -6; x < 806; ) {
    const w = 14 + rand() * 26;
    const h = 14 + rand() * 40;
    addBuilding(x, w, h);
    x += w + rand() * 3;
  }
  // Landmark towers
  addBuilding(150, 22, 104);
  frontParts.push("M159 76 V58 H163 V76 Z");
  addBuilding(480, 26, 128);
  frontParts.push("M488 52 L493 18 L498 52 Z");
  addBuilding(560, 34, 96);
  addBuilding(566, 22, 116);
  addBuilding(572, 10, 130);
  frontParts.push("M576 50 V22 H578 V50 Z");
  addBuilding(670, 24, 86);
  frontParts.push("M670 94 Q682 74 694 94 Z");
  addBuilding(330, 18, 78);
  frontParts.push("M330 102 L339 90 L348 102 Z");

  return (
    <svg viewBox={`0 0 800 ${H}`} preserveAspectRatio="xMidYMax slice" aria-hidden className={className}>
      <path d={backParts.join(" ")} fill={back} />
      <path d={frontParts.join(" ")} fill={front} />
      {lights && (
        <g fill="#ffe0a3" opacity="0.75">
          {windows}
        </g>
      )}
    </svg>
  );
}
