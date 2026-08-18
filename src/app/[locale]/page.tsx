import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import FlameEmblem from "@/components/flame-emblem";
import HeroSlideshow from "@/components/hero-slideshow";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Home");
  const events = t.raw("events") as { name: string; time: string }[];

  return (
    <>
      {/* ===== HERO ===== */}
      <HeroSlideshow
        tagline={t("heroTagline")}
        title={t("heroTitle")}
        sub={t("heroSub")}
        messages={t.raw("heroMessages") as string[]}
        cta1={t("heroCta1")}
        cta2={t("heroCta2")}
      />

      {/* ===== LEAD PASTOR ===== */}
      <section className="bg-cream">
        <div className="container-x flex flex-col items-center gap-8 py-16 text-center md:flex-row md:justify-between md:text-left">
          <div className="flex items-center gap-5">
            <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-brand-light">
              <FlameEmblem className="h-12 w-auto" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-flame">
                {t("pastorLabel")}
              </p>
              <p className="mt-1 font-serif text-2xl font-bold text-brand md:text-3xl">
                {t("pastorName")}
              </p>
            </div>
          </div>
          <Link
            href="/leadership"
            className="text-sm font-semibold text-brand hover:text-flame"
          >
            {t("pastorLink")} →
          </Link>
        </div>
      </section>

      {/* ===== UPCOMING EVENTS ===== */}
      <section className="bg-white">
        <div className="container-x py-20">
          <h2 className="text-center font-serif text-3xl font-bold tracking-tight text-brand md:text-4xl">
            {t("eventsTitle")}
          </h2>
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((e, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-black/5 bg-cream p-7 shadow-sm transition hover:shadow-md"
              >
                <div
                  aria-hidden
                  className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-flame/10 transition group-hover:bg-flame/20"
                />
                <p className="relative text-lg font-bold text-brand">
                  {e.name}
                </p>
                <p className="relative mt-2 text-2xl font-black text-flame">
                  {e.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-brand-dark text-white">
        <div className="container-x py-20 text-center">
          <h2 className="mx-auto max-w-2xl font-serif text-3xl font-bold tracking-tight md:text-4xl">
            {t("ctaTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">{t("ctaBody")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/visit"
              className="liquid-btn rounded-full bg-flame px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-flame/90"
            >
              {t("ctaVisit")}
            </Link>
            <Link
              href="/give"
              className="liquid-btn rounded-full bg-gold px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-gold/90"
            >
              {t("ctaGive")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
