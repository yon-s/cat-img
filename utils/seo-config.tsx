import { Metadata } from "next";

const siteName = "猫判定アプリ";
const description = "画像から猫かどうかを判定します";
const url = "https://web.judging-cats.com/";

export const SEO_DEFAULT: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description,
  openGraph: {
    title: siteName,
    description,
    url,
    siteName,
    locale: "ja_JP",
    type: "website",
    images: "/default-og-image.jpg",
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description,
    creator: '@azarashitokkari',
  }
};
