import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/page-hero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  return { title: t("title") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("About");

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} image="/media/hero-1.jpg" />

      {/* ===== INTRO ===== */}
      <section className="bg-cream">
        <div className="container-x py-20">
          <div className="grid gap-10 md:grid-cols-[220px_1fr]">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-brand md:text-4xl">
              {t("introLabel")}
            </h2>
            <p className="text-lg leading-relaxed text-ink/80">
              {t("introBody")}
            </p>
          </div>
        </div>
      </section>

      {/* ===== VISION ===== */}
      <section className="bg-brand text-white">
        <div className="container-x py-20">
          <div className="grid gap-10 md:grid-cols-[220px_1fr]">
            <h2 className="font-serif text-3xl font-bold tracking-tight md:text-4xl">
              {t("visionLabel")}
            </h2>
            <p className="text-lg leading-relaxed text-white/90">
              {t("visionBody")}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
