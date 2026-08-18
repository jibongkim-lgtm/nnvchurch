import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/page-hero";

// 언어 불변 데이터 — YouTube 영상 ID (제목/채널은 번역 메시지에서 가져옴)
const VIDEO_META = [
  { id: "ARkDWjs9mI8" },
  { id: "3rHYOtdfd1A" },
  { id: "bXZFb6tp0kI" },
  { id: "b2t--zYB2NA" },
] as const;

// 언어 불변 데이터 — 사진 (캡션은 번역 메시지에서 가져옴)
const PHOTO_META = [
  { src: "/media/baptism-1.jpg", tall: true },
  { src: "/media/baptism-2.jpg", tall: false },
  { src: "/media/fortrupert-work-1.jpg", tall: false },
  { src: "/media/fortrupert-work-2.jpg", tall: false },
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Media" });
  return { title: t("title") };
}

export default async function MediaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Media");
  const videos = t.raw("videos") as { title: string; channel: string }[];
  const photos = t.raw("photos") as { caption: string }[];

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} image="/media/fortrupert-work-2.jpg" />

      {/* ===== VIDEOS ===== */}
      <section className="bg-cream">
        <div className="container-x py-20">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-brand md:text-4xl">
            {t("videosLabel")}
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {VIDEO_META.map((v, i) => (
              <div
                key={v.id}
                className="group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-brand-dark">
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${v.id}`}
                    title={videos[i]?.title ?? ""}
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-flame">
                    {videos[i]?.channel}
                  </p>
                  <p className="mt-2 font-semibold leading-snug text-brand">
                    {videos[i]?.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PHOTOS ===== */}
      <section className="bg-white">
        <div className="container-x py-20">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-brand md:text-4xl">
            {t("photosLabel")}
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PHOTO_META.map((p, i) => (
              <figure
                key={p.src}
                className={`group overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition hover:shadow-md ${
                  p.tall ? "sm:row-span-2" : ""
                }`}
              >
                <div
                  className={`relative w-full overflow-hidden ${
                    p.tall ? "aspect-[3/4]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={p.src}
                    alt={photos[i]?.caption ?? ""}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <figcaption className="p-5 text-sm leading-relaxed text-ink/70">
                  {photos[i]?.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
