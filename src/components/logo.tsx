import { Link } from "@/i18n/navigation";
import FlameEmblem from "./flame-emblem";

export default function Logo({
  variant = "dark",
  showTagline = true,
}: {
  variant?: "dark" | "light";
  showTagline?: boolean;
}) {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <FlameEmblem className="h-10 w-auto md:h-11" />
      <span className="leading-none">
        <span
          className={`block text-xl md:text-2xl font-black tracking-tight ${
            variant === "light" ? "text-white" : "text-brand"
          }`}
        >
          NNVC
        </span>
        {showTagline && (
          <span
            className={`mt-1 block text-[8px] md:text-[9px] font-semibold uppercase tracking-[0.18em] ${
              variant === "light" ? "text-white/70" : "text-flame"
            }`}
          >
            Nanaimo Native Victory Church
          </span>
        )}
      </span>
    </Link>
  );
}
