import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import PageHero from "@/components/page-hero";

// 언어 불변 데이터: 함께하는 교회 사진 (messages의 churches와 index로 매칭)
const CHURCH_IMAGES = [
  "/media/church-nanaimo.jpg",
  "/media/church-glad-tidings.jpg",
  "/media/church-fort-rupert.jpg",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Ministry" });
  return { title: t("title") };
}

export default async function MinistryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Ministry");
  const ministries = t.raw("ministries") as string[];
  const churches = t.raw("churches") as { name: string; location: string }[];

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} image="/media/baptism-1.jpg" />

      <section className="bg-cream">
        <div className="container-x py-20">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-brand md:text-4xl">
            {t("ministriesLabel")}
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ministries.map((m, i) => (
              <div
                key={i}
                className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <span className="text-2xl font-black text-flame">
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-lg font-bold leading-snug text-brand">
                  {m}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 우리의 비전 — 밴쿠버 아일랜드 53개 부족 지도 ===== */}
      <section className="bg-white">
        <div className="container-x py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-flame">
              {t("visionLabel")}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink/75">
              {t("visionCaption")}
            </p>
          </div>
          <figure className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-3xl border border-black/5 bg-brand-light shadow-lg">
            <div className="relative aspect-square w-full">
              <Image
                src="/media/vision-map.jpg"
                alt={t("visionCaption")}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-contain"
              />
            </div>
          </figure>
        </div>
      </section>

      {/* ===== 함께하는 교회 ===== */}
      <section className="bg-cream">
        <div className="container-x py-20">
          <h2 className="text-center font-serif text-3xl font-bold tracking-tight text-brand md:text-4xl">
            {t("churchesLabel")}
          </h2>
          <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
            {churches.map((c, i) => (
              <figure
                key={c.name}
                className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={CHURCH_IMAGES[i]}
                    alt={c.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 340px"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <figcaption className="p-5">
                  <h3 className="font-serif text-lg font-bold text-brand">
                    {c.name}
                  </h3>
                  <p className="mt-1 text-sm text-ink/60">{c.location}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-14 text-center">
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
