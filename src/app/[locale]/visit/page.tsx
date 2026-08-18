import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/page-hero";

const MAP_QUERY = "471 Irwin Street, Nanaimo, BC V9R 4X9";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Visit" });
  return { title: t("title") };
}

export default async function VisitPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Visit");
  const services = t.raw("services") as string[];

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} image="/media/church-nanaimo.jpg" />

      <section className="bg-cream">
        <div className="container-x py-20">
          <div className="grid items-start gap-10 lg:grid-cols-2">
            {/* ===== 교회 사진 ===== */}
            <figure className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-lg">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/media/church-nanaimo.jpg"
                  alt={t("address")}
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover"
                  priority
                />
              </div>
            </figure>

            {/* ===== 정보 카드 ===== */}
            <div className="space-y-6">
              <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-flame">
                  {t("addressLabel")}
                </h2>
                <p className="mt-3 text-lg font-semibold leading-relaxed text-brand">
                  {t("address")}
                </p>
                <p className="mt-2 text-sm text-ink/60">{t("charity")}</p>
              </div>

              <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-flame">
                  {t("serviceLabel")}
                </h2>
                <ul className="mt-4 space-y-3">
                  {services.map((s, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 border-b border-black/5 pb-3 last:border-0 last:pb-0"
                    >
                      <span
                        aria-hidden
                        className="h-2 w-2 shrink-0 rounded-full bg-flame"
                      />
                      <span className="text-ink/80">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-flame">
                    {t("phoneLabel")}
                  </h2>
                  <a
                    href={`tel:${t("phone").replace(/[^0-9+]/g, "")}`}
                    className="mt-3 block text-lg font-semibold text-brand hover:text-flame"
                  >
                    {t("phone")}
                  </a>
                </div>
                <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
                  <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-flame">
                    {t("emailLabel")}
                  </h2>
                  <a
                    href={`mailto:${t("email")}`}
                    className="mt-3 block break-all text-lg font-semibold text-brand hover:text-flame"
                  >
                    {t("email")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 지도 ===== */}
      <section className="bg-white">
        <div className="container-x pb-20">
          <div className="overflow-hidden rounded-3xl border border-black/5 shadow-sm">
            <iframe
              title={t("address")}
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                MAP_QUERY
              )}&output=embed`}
              className="h-[420px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
