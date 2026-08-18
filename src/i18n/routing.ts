import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // 영어 기본(교회 사역 현장이 영어권). 나머지는 언어 선택 버튼으로 제공.
  // en=영어, ko=한국어, zh=중국어 간체(만다린), yue=광둥어, pa=펀자브어,
  // es=스페인어, tl=타갈로그(필리핀), ar=아랍어, fr=프랑스어
  locales: ["en", "ko", "zh", "yue", "pa", "es", "tl", "ar", "fr"],
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];

// 오른쪽→왼쪽(RTL) 표기 언어
export const RTL_LOCALES: readonly string[] = ["ar"];

// 언어 선택 버튼에 표시할 이름 (각 언어의 자국어 표기)
export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  ko: "한국어",
  zh: "简体中文",
  yue: "廣東話",
  pa: "ਪੰਜਾਬੀ",
  es: "Español",
  tl: "Tagalog",
  ar: "العربية",
  fr: "Français",
};
