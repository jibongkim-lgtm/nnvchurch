"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Logo from "./logo";
import LanguageSwitcher from "./language-switcher";

type NavChild = { href: string; key: string };
type NavItem = { key: string; href?: string; children?: NavChild[] };

const NAV: NavItem[] = [
  {
    key: "churchInfo",
    children: [
      { href: "/about", key: "intro" },
      { href: "/about/history", key: "history" },
      { href: "/about/greeting", key: "greeting" },
      { href: "/leadership", key: "people" },
      { href: "/visit", key: "directions" },
    ],
  },
  { key: "worship", href: "/events" },
  { key: "ministry", href: "/ministry" },
  { key: "media", href: "/media" },
];

export default function Header() {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);
  // 데스크톱 드롭다운: 현재 열린 그룹 key (hover/focus)
  const [hovered, setHovered] = useState<string | null>(null);
  // 모바일 아코디언: 펼쳐진 그룹 key
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-cream/95 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <Logo />

        {/* ===== 데스크톱 내비 ===== */}
        <nav className="hidden items-center gap-7 text-sm font-medium text-ink lg:flex">
          {NAV.map((item) =>
            item.children ? (
              <div
                key={item.key}
                className="relative"
                onMouseEnter={() => setHovered(item.key)}
                onMouseLeave={() => setHovered(null)}
              >
                <button
                  type="button"
                  className="nav-link inline-flex items-center gap-1 transition hover:text-flame"
                  aria-expanded={hovered === item.key}
                >
                  {t(item.key)}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform ${
                      hovered === item.key ? "rotate-180" : ""
                    }`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {/* 드롭다운 패널 */}
                <div
                  className={`absolute left-1/2 top-full w-60 -translate-x-1/2 pt-3 transition ${
                    hovered === item.key
                      ? "pointer-events-auto opacity-100"
                      : "pointer-events-none opacity-0"
                  }`}
                >
                  <div className="overflow-hidden rounded-2xl border border-black/5 bg-brand-dark py-2 shadow-xl">
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="block px-5 py-2.5 text-sm text-white/75 transition hover:bg-white/5 hover:text-flame"
                      >
                        {t(c.key)}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.key}
                href={item.href!}
                className="nav-link transition hover:text-flame"
              >
                {t(item.key)}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher />
          <Link
            href="/give"
            className="liquid-btn rounded-full bg-gold px-5 py-2 text-sm font-semibold text-white transition hover:bg-gold/90"
          >
            {t("giving")}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-md p-2 text-brand lg:hidden"
          aria-label="Menu"
          aria-expanded={open}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* ===== 모바일 내비 (아코디언) ===== */}
      {open && (
        <div className="border-t border-black/5 bg-cream lg:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            {NAV.map((item) =>
              item.children ? (
                <div key={item.key}>
                  <button
                    type="button"
                    onClick={() =>
                      setExpanded((v) => (v === item.key ? null : item.key))
                    }
                    className="flex w-full items-center justify-between rounded-md px-2 py-2 text-base font-medium text-ink hover:bg-brand-light"
                    aria-expanded={expanded === item.key}
                  >
                    {t(item.key)}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transition-transform ${
                        expanded === item.key ? "rotate-180" : ""
                      }`}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  {expanded === item.key && (
                    <div className="ml-2 flex flex-col border-l-2 border-flame/25 pl-3">
                      {item.children.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          onClick={() => setOpen(false)}
                          className="rounded-md px-2 py-2 text-sm text-ink/80 hover:bg-brand-light hover:text-flame"
                        >
                          {t(c.key)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.key}
                  href={item.href!}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-2 py-2 text-base font-medium text-ink hover:bg-brand-light"
                >
                  {t(item.key)}
                </Link>
              )
            )}
            <Link
              href="/give"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-gold px-5 py-2.5 text-center text-sm font-semibold text-white"
            >
              {t("giving")}
            </Link>
            <div className="mt-3 px-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
