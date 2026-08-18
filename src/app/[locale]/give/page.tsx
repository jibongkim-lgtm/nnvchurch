import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/page-hero";
import FlameEmblem from "@/components/flame-emblem";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Give" });
  return { title: t("title") };
}

export default async function GivePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Give");
  const body = t.raw("body") as string[];

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} image="/media/baptism-2.jpg" />

      <section className="bg-cream">
        <div className="container-x py-20">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            {/* ===== MESSAGE ===== */}
            <div>
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-light">
                <FlameEmblem className="h-9 w-auto" />
              </span>
              <h2 className="mt-6 font-serif text-3xl font-bold leading-tight text-brand md:text-4xl">
                {t("supportTitle")}
              </h2>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink/80">
                {body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <p className="mt-6 text-sm font-semibold text-ink/60">
                {t("charity")}
              </p>
            </div>

            {/* ===== E-TRANSFER 안내 카드 ===== */}
            <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-lg md:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-ember">
                {t("methodEyebrow")}
              </p>
              <h3 className="mt-3 font-serif text-2xl font-bold text-brand md:text-3xl">
                {t("methodTitle")}
              </h3>
              <p className="mt-4 leading-relaxed text-ink/70">
                {t("methodDesc")}
              </p>
              <a
                href={`mailto:${t("email")}`}
                className="mt-6 inline-flex rounded-xl bg-brand-light px-6 py-3 text-base font-bold text-brand transition hover:bg-flame hover:text-white"
              >
                {t("email")}
              </a>
              <p className="mt-8 border-t border-black/5 pt-6 text-sm leading-relaxed text-ink/60">
                {t("thanks")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
