import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import FlameEmblem from "./flame-emblem";

const links = [
  { href: "/about", key: "intro" },
  { href: "/leadership", key: "people" },
  { href: "/events", key: "events" },
  { href: "/media", key: "media" },
  { href: "/visit", key: "directions" },
  { href: "/give", key: "give" },
] as const;

export default function Footer() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Nav");
  const contact = useTranslations("Contact");

  return (
    <footer className="mt-auto bg-brand-dark text-white/80">
      <div className="container-x grid gap-10 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <FlameEmblem className="h-12 w-auto" />
            <span className="text-lg font-bold leading-tight text-white">
              Nanaimo Native
              <br />
              Victory Church
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            {t("tagline")}
          </p>
          <p className="mt-4 text-xs text-white/50">{t("charity")}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
            {t("quickLinks")}
          </h3>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-white">
                  {nav(l.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
            {t("contactTitle")}
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>{contact("address")}</li>
            <li>
              <a
                href={`tel:${contact("phone").replace(/[^\d+]/g, "")}`}
                className="transition hover:text-white"
              >
                {contact("phone")}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contact("email")}`}
                className="transition hover:text-white"
              >
                {contact("email")}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-5 text-center text-xs text-white/50">
          {t("rights")}
        </div>
      </div>
    </footer>
  );
}
