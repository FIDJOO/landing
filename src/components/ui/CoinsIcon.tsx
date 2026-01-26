interface CoinsIconProps {
  size?: number;
  className?: string;
}

export function CoinsIcon({ size = 26, className }: CoinsIconProps) {
  const height = (size * 17) / 26;
  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 26 17"
      fill="none"
      className={className}
    >
      {/* Stacked coins (back to front) */}
      {/* Bottom coin (3rd) */}
      <ellipse cx={17} cy={14} rx={8} ry={3} fill="#CC8F00" />
      <ellipse cx={17} cy={13} rx={8} ry={3} fill="#FFD500" />

      {/* Middle coin (2nd) */}
      <ellipse cx={17} cy={10} rx={8} ry={3} fill="#CC8F00" />
      <ellipse cx={17} cy={9} rx={8} ry={3} fill="#FFD500" />

      {/* Top coin (1st) */}
      <ellipse cx={17} cy={6} rx={8} ry={3} fill="#CC8F00" />
      <ellipse cx={17} cy={5} rx={8} ry={3} fill="#FFD500" />

      {/* Side coin with F */}
      <ellipse cx={8} cy={10} rx={7} ry={7} fill="#ffb71c" />
      <ellipse cx={8} cy={10} rx={5.5} ry={5.5} fill="#FFD500" />

      {/* F letter on coin */}
      <path
        d="M5.5 6.5V13.5M5.5 6.5H10.5M5.5 9.5H9"
        stroke="#CC8F00"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
