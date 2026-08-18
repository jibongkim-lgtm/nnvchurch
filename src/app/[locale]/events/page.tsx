import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import PageHero from "@/components/page-hero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Events" });
  return { title: t("title") };
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Events");
  const recurring = t.raw("recurring") as { name: string; time: string }[];
  const upcoming = t.raw("upcoming") as {
    date: string;
    title: string;
    time: string;
    location: string;
    desc: string;
  }[];

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} image="/media/hero-3.jpg" />

      {/* ===== RECURRING ===== */}
      <section className="bg-cream">
        <div className="container-x py-20">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-brand md:text-4xl">
            {t("recurringLabel")}
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {recurring.map((r, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div
                  aria-hidden
                  className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-flame/10 transition group-hover:bg-flame/20"
                />
                <p className="relative text-lg font-bold leading-snug text-brand">
                  {r.name}
                </p>
                <p className="relative mt-2 text-sm font-semibold text-flame">
                  {r.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== UPCOMING ===== */}
      <section className="bg-white">
        <div className="container-x py-20">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-brand md:text-4xl">
            {t("upcomingLabel")}
          </h2>

          {upcoming.length === 0 ? (
            <p className="mt-8 text-ink/60">{t("empty")}</p>
          ) : (
            <ol className="mt-12 space-y-6 border-l-2 border-flame/25 pl-6 md:pl-8">
              {upcoming.map((e, i) => (
                <li key={i} className="relative">
                  <span
                    aria-hidden
                    className="absolute -left-[calc(1.5rem+7px)] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-flame bg-cream md:-left-[calc(2rem+7px)]"
                  />
                  <div className="rounded-2xl border border-black/5 bg-cream p-6 shadow-sm transition hover:shadow-md md:p-7">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="text-sm font-semibold uppercase tracking-[0.12em] text-flame">
                        {e.date}
                      </span>
                      <span className="text-xs text-ink/50">· {e.time}</span>
                    </div>
                    <h3 className="mt-2 font-serif text-2xl font-bold text-brand">
                      {e.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-ink/60">
                      {e.location}
                    </p>
                    <p className="mt-3 leading-relaxed text-ink/80">{e.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          )}

          <div className="mt-12">
            <Link
              href="/visit"
              className="liquid-btn inline-flex rounded-full bg-flame px-7 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-flame/90"
            >
              {t("cta")}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
