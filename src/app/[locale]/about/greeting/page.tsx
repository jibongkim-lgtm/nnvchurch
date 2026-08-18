import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/page-hero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Greeting" });
  return { title: t("title") };
}

export default async function GreetingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Greeting");
  const body = t.raw("body") as string[];

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} image="/media/hero-2.jpg" />

      <section className="bg-cream">
        <div className="container-x py-20">
          <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[300px_1fr] md:items-start">
            {/* 담임목사 사진 */}
            <figure className="mx-auto w-full max-w-[300px]">
              <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-lg">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src="/media/pastor.jpg"
                    alt={t("signName")}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </div>
              <figcaption className="mt-4 text-center">
                <p className="font-serif text-lg font-bold text-brand">
                  {t("signName")}
                </p>
                <p className="mt-0.5 text-sm text-ink/60">{t("signRole")}</p>
              </figcaption>
            </figure>

            {/* 인사말 */}
            <div>
              <div className="space-y-5 text-lg leading-relaxed text-ink/80">
                {body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <p className="mt-10 font-serif text-2xl font-bold text-brand">
                {t("signName")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
