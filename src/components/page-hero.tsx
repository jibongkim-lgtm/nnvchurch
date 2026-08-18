export default function PageHero({
  eyebrow,
  title,
  intro,
  image = "/media/hero-1.jpg",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-brand-dark text-white">
      {/* 원주민 사역 사진 — 은은한 배경 */}
      {image && (
        <>
          <div
            aria-hidden
            className="absolute inset-0 bg-cover bg-center opacity-[0.18]"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/85 to-brand-dark/55"
          />
        </>
      )}
      {/* 불꽃 그라데이션 오라 */}
      <div
        aria-hidden
        className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-flame/25 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-ember/20 blur-3xl"
      />
      <div className="container-x relative py-16 md:py-20">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-flame">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-4 font-serif text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
