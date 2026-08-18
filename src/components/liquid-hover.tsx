"use client";

import { useEffect } from "react";

/**
 * `.liquid-btn` 요소 위로 커서가 움직이면 커서 위치를 CSS 변수(--mx/--my)로
 * 전달해, 투명한 물방울 하이라이트가 커서를 부드럽게 따라 움직이도록 한다.
 */
export default function LiquidHover() {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest(".liquid-btn");
      if (!(target instanceof HTMLElement)) return;
      const rect = target.getBoundingClientRect();
      target.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      target.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  return null;
}
