import type { Metadata } from "next";
import { Playfair_Display, Noto_Sans_KR } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ViewTransitions } from "next-view-transitions";
import { routing, RTL_LOCALES } from "@/i18n/routing";
import Header from "@/components/header";
import Footer from "@/components/footer";
import LiquidHover from "@/components/liquid-hover";
import ViewTransitionNav from "@/components/view-transition-nav";
import "../globals.css";

const notoKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nnvchurch.com"),
  title: {
    default: "Nanaimo Native Victory Church",
    template: "%s · Nanaimo Native Victory Church",
  },
  description:
    "A Christ-centered community on Vancouver Island, serving and walking alongside the First Nations peoples of this land. Nanaimo, BC, Canada.",
  openGraph: {
    type: "website",
    siteName: "Nanaimo Native Victory Church",
    title: "Nanaimo Native Victory Church",
    description:
      "A Christ-centered community on Vancouver Island, serving and walking alongside the First Nations peoples of this land. Nanaimo, BC, Canada.",
  },
  twitter: {
    card: "summary",
    title: "Nanaimo Native Victory Church",
    description:
      "A Christ-centered community on Vancouver Island, serving and walking alongside the First Nations peoples of this land.",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      dir={RTL_LOCALES.includes(locale) ? "rtl" : "ltr"}
      className={`${notoKr.variable} ${playfair.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink antialiased">
        <NextIntlClientProvider>
          <ViewTransitions>
            <ViewTransitionNav />
            <LiquidHover />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </ViewTransitions>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
