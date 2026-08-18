"use client";

import { useEffect } from "react";
import { useTransitionRouter } from "next-view-transitions";

/**
 * 사이트 내부 링크 클릭을 가로채, 브라우저 네이티브 View Transitions
 * (부드러운 크로스페이드)로 페이지를 넘긴다.
 */
export default function ViewTransitionNav() {
  const router = useTransitionRouter();

  useEffect(() => {
    if (
      typeof document === "undefined" ||
      !("startViewTransition" in document)
    ) {
      return;
    }

    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      const anchor = (e.target as Element | null)?.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search
      ) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      router.push(url.pathname + url.search + url.hash);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return null;
}
