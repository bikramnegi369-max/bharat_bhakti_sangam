let _counter = 0;

interface AttendanceRingProps {
  percent: number; // 0-100
  size?: number; // px, default 64
  strokeWidth?: number;
  trackColor?: string;
  gradientStart?: string;
  gradientEnd?: string;
}

export function AttendanceRing({
  percent,
  size = 64,
  strokeWidth = 7,
  trackColor = "#E5E0D5",
  gradientStart = "#FF6A00",
  gradientEnd = "#FCAD33",
}: AttendanceRingProps) {
  // Stable ID per component instance (SSR-safe: generated once at module level)
  const id = `ar-${++_counter}`;
  const gradId = `${id}-grad`;
  const maskId = `${id}-mask`;

  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const dash = (percent / 100) * circumference;
  const gap = circumference - dash;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      aria-hidden="true"
      role="img"
      overflow="visible"
    >
      <defs>
        {/* Gradient runs top-right → bottom-left for a natural arc feel */}
        <linearGradient id={gradId} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={gradientStart} />
          <stop offset="100%" stopColor={gradientEnd} />
        </linearGradient>

        {/* Mask: only the dashed arc is white (visible), rest is black (hidden) */}
        <mask id={maskId}>
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="white"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={circumference / 4}
            style={{ transition: "stroke-dasharray 0.6s ease" }}
          />
        </mask>
      </defs>

      {/* Track ring */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={trackColor}
        strokeWidth={strokeWidth}
      />

      {/* Gradient rect clipped to the arc shape via the mask */}
      <rect
        x={0}
        y={0}
        width={size}
        height={size}
        fill={`url(#${gradId})`}
        mask={`url(#${maskId})`}
      />
    </svg>
  );
}
