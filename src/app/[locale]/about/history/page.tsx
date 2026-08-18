import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/page-hero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "History" });
  return { title: t("title") };
}

export default async function HistoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("History");
  const body = t.raw("body") as string[];
  const milestones = t.raw("milestones") as {
    year: string;
    title: string;
    desc: string;
  }[];

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} image="/media/fortrupert-work-1.jpg" />

      {/* ===== NARRATIVE ===== */}
      <section className="bg-cream">
        <div className="container-x py-20">
          <div className="mx-auto max-w-3xl space-y-5">
            {body.map((p, i) => (
              <p key={i} className="leading-relaxed text-ink/80">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MILESTONES ===== */}
      <section className="bg-white">
        <div className="container-x py-20">
          <ol className="mx-auto max-w-3xl space-y-6 border-l-2 border-flame/25 pl-6 md:pl-8">
            {milestones.map((m, i) => (
              <li key={i} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[calc(1.5rem+7px)] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-flame bg-white md:-left-[calc(2rem+7px)]"
                />
                <div className="rounded-2xl border border-black/5 bg-cream p-6 shadow-sm md:p-7">
                  <span className="text-sm font-semibold uppercase tracking-[0.12em] text-flame">
                    {m.year}
                  </span>
                  <h3 className="mt-2 font-serif text-2xl font-bold text-brand">
                    {m.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-ink/80">{m.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
