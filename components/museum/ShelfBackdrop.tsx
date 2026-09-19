"use client";

/** CSS/SVG bookshelf silhouette for mobile & section overlays */
export function ShelfBackdrop({
  density = 12,
  className = "",
}: {
  density?: number;
  className?: string;
}) {
  const spines = Array.from({ length: density }, (_, i) => {
    const hues = ["#3B2A1F", "#2F4A3C", "#5C4A32", "#8C2F2F", "#A8925A", "#4A3F2E"];
    return {
      x: 4 + i * (96 / density),
      w: 3.2 + (i % 4) * 1.1,
      h: 18 + (i % 5) * 4,
      y: 72 - ((i % 5) * 4),
      fill: hues[i % hues.length],
      opacity: 0.35 + (i % 3) * 0.08,
    };
  });

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="shelf-wood" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1A1612" />
            <stop offset="100%" stopColor="#0C0A08" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="100" height="100" fill="url(#shelf-wood)" opacity="0.55" />
        {[28, 55, 82].map((y) => (
          <g key={y}>
            <rect x="2" y={y} width="96" height="1.2" fill="#2A2420" opacity="0.7" />
            {spines.map((s, i) => (
              <rect
                key={`${y}-${i}`}
                x={s.x}
                y={y - s.h * 0.35}
                width={s.w}
                height={s.h * 0.35}
                fill={s.fill}
                opacity={s.opacity}
              />
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}
