"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const EMAIL = "office.nnvc@gmail.com";

export default function PrayerForm() {
  const t = useTranslations("Visit");
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const first = String(f.get("first") || "");
    const last = String(f.get("last") || "");
    const email = String(f.get("email") || "");
    const phone = String(f.get("phone") || "");
    const message = String(f.get("message") || "");

    const subject = encodeURIComponent(
      `${t("formTitle")} — ${first} ${last}`.trim()
    );
    const body = encodeURIComponent(
      `${t("firstName")}: ${first}\n${t("lastName")}: ${last}\n${t(
        "emailLabel"
      )}: ${email}\n${t("phoneField")}: ${phone}\n\n${t(
        "message"
      )}:\n${message}`
    );
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const input =
    "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-flame focus:ring-2 focus:ring-flame/20";

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-ink/70">
            {t("firstName")} *
          </label>
          <input name="first" required className={input} />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-ink/70">
            {t("lastName")} *
          </label>
          <input name="last" required className={input} />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-ink/70">
          {t("emailLabel")} *
        </label>
        <input name="email" type="email" required className={input} />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-ink/70">
          {t("phoneField")}
        </label>
        <input name="phone" type="tel" className={input} />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-semibold text-ink/70">
          {t("message")}
        </label>
        <textarea name="message" rows={4} className={input} />
      </div>
      <button
        type="submit"
        className="liquid-btn w-full rounded-full bg-flame px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-flame/90"
      >
        {t("submit")}
      </button>
      {sent && (
        <p className="text-center text-sm text-brand">{t("formThanks")}</p>
      )}
    </form>
  );
}
