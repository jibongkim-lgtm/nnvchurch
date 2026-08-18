"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const AMOUNTS = ["$50", "$100", "$200", "$1,000"];

export default function DonateWidget() {
  const t = useTranslations("Give");
  const frequencies = t.raw("frequencies") as string[];
  const [freq, setFreq] = useState(0);
  const [amount, setAmount] = useState(0);

  return (
    <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-xl">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-flame">
        {t("supportLabel")}
      </p>
      <h2 className="mt-2 font-serif text-2xl font-bold text-brand md:text-3xl">
        {t("supportTitle")}
      </h2>

      <div className="mt-7">
        <p className="mb-2 text-xs font-semibold text-ink/60">
          {t("frequency")}
        </p>
        <div className="grid grid-cols-3 gap-2">
          {frequencies.map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => setFreq(i)}
              className={`rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                freq === i
                  ? "bg-brand text-white"
                  : "bg-brand-light text-ink/70 hover:bg-brand-light/70"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <p className="mb-2 text-xs font-semibold text-ink/60">{t("amount")}</p>
        <div className="grid grid-cols-2 gap-2">
          {AMOUNTS.map((a, i) => (
            <button
              key={a}
              type="button"
              onClick={() => setAmount(i)}
              className={`rounded-xl border px-3 py-3 text-base font-bold transition ${
                amount === i
                  ? "border-flame bg-flame/10 text-ember"
                  : "border-black/10 bg-white text-ink hover:border-flame/40"
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      <a
        href="mailto:office.nnvc@gmail.com?subject=Donation%20Inquiry"
        className="liquid-btn mt-7 block rounded-full bg-gold px-6 py-3.5 text-center text-sm font-semibold text-white shadow-lg transition hover:bg-gold/90"
      >
        {t("donate")} {AMOUNTS[amount]}
      </a>
      <p className="mt-4 text-center text-xs text-ink/50">{t("charity")}</p>
    </div>
  );
}
