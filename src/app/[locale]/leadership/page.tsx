import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PageHero from "@/components/page-hero";
import FlameEmblem from "@/components/flame-emblem";

// 언어 불변 데이터 — 이름(영문 표기)과 소속. 직책은 번역 메시지 members 배열과 index로 매칭.
const TEAM_META = [
  { name: "Rev. Joon Cho", org: "Nanaimo Native Victory Church" },
  { name: "Rev. Phillip Chung", org: "Nanaimo Native Victory Church" },
  { name: "Pastor Sullivan Yang", org: "Nanaimo Native Victory Church" },
  { name: "Rev. Chris Kim", org: "Port Hardy" },
  { name: "Rev. Sam Suh", org: "Vancouver Island" },
  { name: "Rev. Per & Chris Knudson", org: "" },
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Leadership" });
  return { title: t("title") };
}

export default async function LeadershipPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("Leadership");
  const roles = t.raw("members") as string[];

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} image="/media/pastor.jpg" />

      <section className="bg-cream">
        <div className="container-x py-20">
          <h3 className="text-center font-serif text-2xl font-bold text-brand md:text-3xl">
            {t("teamLabel")}
          </h3>
          <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM_META.map((m, i) => (
              <div
                key={m.name}
                className="flex flex-col items-center rounded-2xl border border-black/5 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-light">
                  <FlameEmblem className="h-9 w-auto" />
                </span>
                <p className="mt-5 font-serif text-xl font-bold text-brand">
                  {m.name}
                </p>
                <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-flame">
                  {roles[i]}
                </p>
                {m.org && <p className="mt-1 text-sm text-ink/70">{m.org}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
