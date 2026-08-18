"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import FlameEmblem from "./flame-emblem";

const IMAGES = ["/media/hero-1.jpg", "/media/hero-2.jpg", "/media/hero-3.jpg"];

const EMBERS = [
  { left: "8%", delay: "0s", dur: "9s" },
  { left: "22%", delay: "2.4s", dur: "11s" },
  { left: "37%", delay: "5s", dur: "8.5s" },
  { left: "54%", delay: "1.2s", dur: "10.5s" },
  { left: "68%", delay: "3.6s", dur: "9.5s" },
  { left: "81%", delay: "6s", dur: "12s" },
  { left: "93%", delay: "4.2s", dur: "10s" },
];

export default function HeroSlideshow({
  tagline,
  title,
  sub,
  messages,
  cta1,
  cta2,
}: {
  tagline: string;
  title: string;
  sub: string;
  messages: string[];
  cta1: string;
  cta2: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((v) => (v + 1) % IMAGES.length),
      3000
    );
    return () => clearInterval(id);
  }, []);

  const message = messages[index % messages.length];

  return (
    <section className="relative overflow-hidden bg-brand-dark text-white">
      {/* 배경: 세 장의 교회 사진이 3초 간격으로 서서히 전환 (희미하게) */}
      <div aria-hidden className="absolute inset-0">
        {IMAGES.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-cover transition-opacity duration-[1500ms] ${
              i === index ? "opacity-30" : "opacity-0"
            }`}
          />
        ))}
        {/* 가독성을 위한 어두운 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/85 via-brand-dark/55 to-brand-dark/70" />
      </div>

      {/* 불꽃 그라데이션 배경 */}
      <div
        aria-hidden
        className="aura-drift absolute inset-0 bg-[radial-gradient(120%_120%_at_85%_0%,rgba(224,122,47,0.28),transparent_55%),radial-gradient(90%_90%_at_0%_100%,rgba(193,74,27,0.2),transparent_50%)]"
      />

      {/* 부유하는 엠블럼 */}
      <div
        aria-hidden
        className="float-slow pointer-events-none absolute -right-10 top-8 opacity-[0.07]"
      >
        <FlameEmblem className="h-[26rem] w-auto" />
      </div>

      {/* 아래에서 위로 떠오르는 불씨 입자 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {EMBERS.map((p, i) => (
          <span
            key={i}
            className="ember"
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.dur,
            }}
          />
        ))}
      </div>

      <div className="container-x relative py-24 md:py-36">
        <p className="rise-in text-xs font-semibold uppercase tracking-[0.24em] text-flame">
          {tagline}
        </p>
        <h1 className="rise-in mt-5 max-w-3xl font-serif text-4xl font-bold leading-[1.08] tracking-tight md:text-6xl">
          {title}
        </h1>
        <p className="rise-in mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
          {sub}
        </p>

        {/* 사진과 함께 전환되는 선교의 마음을 담은 문구 */}
        <p
          key={index}
          className="rise-in mt-7 max-w-2xl border-l-2 border-flame/70 pl-4 font-serif text-lg italic leading-relaxed text-flame/95 md:text-xl"
        >
          {message}
        </p>

        <div className="rise-in mt-9 flex flex-wrap gap-4">
          <Link
            href="/visit"
            className="liquid-btn rounded-full bg-flame px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-flame/90"
          >
            {cta1}
          </Link>
          <Link
            href="/leadership"
            className="liquid-btn rounded-full border border-white/40 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            {cta2}
          </Link>
        </div>

        {/* 슬라이드 인디케이터 */}
        <div aria-hidden className="mt-10 flex gap-2">
          {IMAGES.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index ? "w-8 bg-flame" : "w-3 bg-white/30"
              }`}
            />
          ))}
        </div>

        {/* 스크롤 유도 화살표 */}
        <div
          aria-hidden
          className="scroll-bob mt-12 hidden text-white/60 md:block"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
