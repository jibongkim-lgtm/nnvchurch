/**
 * NNVC 엠블럼 — 오순절 "불꽃"과 십자가를 결합한 마크.
 * 왼쪽 charcoal 불꽃 + 안쪽 flame-orange 불꽃 + 흰 십자가.
 * 153mission 연어 엠블럼과는 완전히 다른, "빅토리/성령의 불" 느낌.
 */
export default function FlameEmblem({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 72"
      className={className}
      role="img"
      aria-label="Nanaimo Native Victory Church"
    >
      {/* 바깥 불꽃 (charcoal) */}
      <path
        fill="var(--color-brand)"
        d="M30 1c2 8-6 13-12 20C11 29 8 37 9 45c1.5 12 11 23 22 25-7-6-10-13-9-20 1-6 5-9 5-9s-1 8 3 13c3 3.6 8 5 8 11 0 2-.6 4-1.8 5.6C50 66 57 55 57 43c0-10-6-16-11-22-4-5-7-9-7-14 0 0-5 3-6 9-.6 3.4.3 6 .3 6S27 24 27 16c0-6 3-11 3-15z"
      />
      {/* 안쪽 불꽃 (flame orange) */}
      <path
        fill="var(--color-flame)"
        d="M35 22c1 5-3 8-6 12-2.6 3.4-4 8-3 12 1 6 5 11 10 13-2.6-3-3.6-6.4-3-10 .6-3.4 3-6 3-6s0 4 2 6.6c1.6 2 4 3 4 6.4 0 1.4-.4 2.6-1 3.6 5-3 8-9 8-15 0-6-3-10-6-13.6-2.6-3-4.6-5.6-4.6-9z"
      />
      {/* 십자가 (cream) */}
      <g fill="var(--color-cream)">
        <rect x="30" y="36" width="4" height="20" rx="1.4" />
        <rect x="25" y="43" width="14" height="4" rx="1.4" />
      </g>
    </svg>
  );
}
